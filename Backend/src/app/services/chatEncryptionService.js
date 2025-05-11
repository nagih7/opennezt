import { Message, Conversation, User } from '@/models'
import { generateUserSignalKeys, getUserPublicKeys } from './signalService'

// Cache for checking encryption capabilities (TTL: 5 minutes)
const encryptionCapabilityCache = new Map()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes in milliseconds

/**
 * Process a message that might be encrypted
 * @param {Object} user - Current user
 * @param {String} conversationId - Conversation ID
 * @param {Object} messageData - Message data including content and encryption info
 * @returns {Promise<Object>} Saved message object
 */
export async function processMessage(user, conversationId, messageData) {
    const { content, isEncrypted, encryptionMetadata } = messageData

    // Validate encryption requirements
    if (isEncrypted && !encryptionMetadata) {
        throw new Error('Encryption metadata is required for encrypted messages')
    }

    // Batch query conversation to check encryption status
    const conversation = await Conversation.findById(conversationId)
    if (isEncrypted && !conversation?.encryption_enabled) {
        throw new Error('Cannot send encrypted message in a non-encrypted conversation')
    }

    // Create message in one operation
    return await Message.create({
        conversation_id: conversationId,
        user_id: user._id,
        content,
        is_encrypted: isEncrypted || false,
        encryption_metadata: encryptionMetadata || null,
        read_by: [user._id],
        status: 'sent',
        timestamp: new Date(),
    })
}

/**
 * Check if encryption is possible between two users with caching
 * @param {String} userId1 - First user ID
 * @param {String} userId2 - Second user ID
 * @returns {Promise<Boolean>} True if encryption is possible
 */
export async function isEncryptionPossible(userId1, userId2) {
    try {
        // Create a unique cache key for this user pair
        const cacheKey = [userId1, userId2].sort().join('-')
        const now = Date.now()

        // Check cache first
        if (encryptionCapabilityCache.has(cacheKey)) {
            const cached = encryptionCapabilityCache.get(cacheKey)
            if (now - cached.timestamp < CACHE_TTL) {
                return cached.value
            }
        }

        // Get both users in parallel
        const [user1, user2] = await Promise.all([
            User.findById(userId1).select('signal_keys.identityKey.public').lean(),
            User.findById(userId2).select('signal_keys.identityKey.public').lean(),
        ])

        // Check if both users have Signal Protocol keys
        const user1HasKeys = Boolean(user1?.signal_keys?.identityKey?.public)
        const user2HasKeys = Boolean(user2?.signal_keys?.identityKey?.public)
        const result = user1HasKeys && user2HasKeys

        // Cache the result
        encryptionCapabilityCache.set(cacheKey, {
            value: result,
            timestamp: now,
        })

        return result
    } catch (error) {
        console.error('Error checking encryption possibility:', error)
        return false
    }
}

/**
 * Setup encryption for a conversation
 * @param {String} conversationId - Conversation ID
 * @returns {Promise<Boolean>} Success status
 */
export async function setupConversationEncryption(conversationId) {
    try {
        // Get the conversation
        const conversation = await Conversation.findById(conversationId)
        // Check if conversation is between exactly two users
        if (conversation.members.length !== 2) {
            throw new Error('Encryption is only supported for one-on-one conversations')
        }

        // Get user IDs
        const userId1 = conversation.members[0].user_id
        const userId2 = conversation.members[1].user_id

        // Get users in parallel
        const [user1, user2] = await Promise.all([User.findById(userId1), User.findById(userId2)])

        // Tạo khóa Signal Protocol cho người dùng nếu chưa có
        const keysPromises = []

        if (!user1.signal_keys?.identityKey) keysPromises.push(generateUserSignalKeys(user1))
        if (!user2.signal_keys?.identityKey) keysPromises.push(generateUserSignalKeys(user2))

        if (keysPromises.length > 0) await Promise.all(keysPromises)

        // Enable encryption in the conversation
        conversation.encryption_enabled = true
        await conversation.save()

        // Update cache
        const cacheKey = [userId1.toString(), userId2.toString()].sort().join('-')
        encryptionCapabilityCache.set(cacheKey, {
            value: true,
            timestamp: Date.now(),
        })

        return true
    } catch (error) {
        console.error('Error setting up conversation encryption:', error)
        return false
    }
}

/**
 * Toggle encryption for a conversation
 * @param {String} conversationId - Conversation ID
 * @param {Boolean} enabled - Whether to enable or disable encryption
 * @returns {Promise<Boolean>} Success status
 */
export async function toggleConversationEncryption(conversationId, enabled) {
    try {
        // Get the conversation
        const conversation = await Conversation.findById(conversationId)
        if (!conversation) {
            throw new Error('Conversation not found')
        }

        // If enabling encryption, make sure it's a 1-on-1 conversation and generate keys if needed
        if (enabled) {
            // Check if conversation is between exactly two users
            if (conversation.members.length !== 2) {
                throw new Error('Encryption is only supported for one-on-one conversations')
            }

            // Get user IDs
            const userId1 = conversation.members[0].user_id
            const userId2 = conversation.members[1].user_id

            // Get users in parallel
            const [user1, user2] = await Promise.all([User.findById(userId1), User.findById(userId2)])

            // Generate Signal Protocol keys for users if they don't have them
            const keysPromises = []

            if (!user1.signal_keys?.identityKey) keysPromises.push(generateUserSignalKeys(user1))
            if (!user2.signal_keys?.identityKey) keysPromises.push(generateUserSignalKeys(user2))

            if (keysPromises.length > 0) await Promise.all(keysPromises)

            // Update cache to indicate encryption is possible
            const cacheKey = [userId1.toString(), userId2.toString()].sort().join('-')
            encryptionCapabilityCache.set(cacheKey, {
                value: true,
                timestamp: Date.now(),
            })
        }

        // Update the encryption status based on the enabled parameter
        conversation.encryption_enabled = enabled
        await conversation.save()

        return true
    } catch (error) {
        console.error(`Error ${enabled ? 'enabling' : 'disabling'} conversation encryption:`, error)
        return false
    }
}

/**
 * Get public keys for all members of a conversation
 * @param {String} conversationId - ID of the conversation
 * @param {String} currentUserId - ID of the current user (to exclude)
 * @returns {Promise<Object>} Object mapping user IDs to their public keys
 */
export async function getConversationMemberKeys(conversationId, currentUserId) {
    try {
        const conversation = await Conversation.findById(conversationId)

        if (!conversation) {
            throw new Error('Conversation not found')
        }

        // Check encryption status
        if (!conversation.encryption_enabled) {
            throw new Error('Encryption is not enabled for this conversation')
        }

        // Get all member IDs except the current user
        const memberIds = conversation.members
            .map((member) => member.user_id.toString())
            .filter((id) => id !== currentUserId)

        // Get public keys for all members in parallel
        const memberKeysPromises = memberIds.map(async (memberId) => {
            try {
                const keys = await getUserPublicKeys(memberId)
                return { memberId, keys }
            } catch (error) {
                console.error(`Error getting keys for user ${memberId}:`, error)
                return { memberId, keys: null }
            }
        })

        const memberKeysResults = await Promise.all(memberKeysPromises)

        // Convert array of results to an object
        const memberKeys = {}
        memberKeysResults.forEach((result) => {
            if (result.keys) {
                memberKeys[result.memberId] = result.keys
            }
        })

        return memberKeys
    } catch (error) {
        console.error('Error getting conversation member keys:', error)
        throw error
    }
}
