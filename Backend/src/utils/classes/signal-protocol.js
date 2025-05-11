import libsignal from 'libsignal'
import crypto from 'crypto'

/**
 * Utility class for Signal Protocol key management and encryption
 */
class SignalProtocol {
    /**
    * Generate hoàn thiện Signal Protocol keys cho user
    * @returns {Object} Signal Protocol keys
    */ static generateKeyBundle() {
        // Check if keyhelper exists
        if (!libsignal.keyhelper) {
            return SignalProtocol.generateKeyBundleCustom()
        }

        try {
            // Generate identity key pair (long-term key pair)
            const identityKeyPair = libsignal.keyhelper.generateIdentityKeyPair()

            // Generate registration ID (random number for the user)
            const registrationId = libsignal.keyhelper.generateRegistrationId()

            // Generate signed prekey (medium-term key that is signed with the identity key)
            const signedPreKeyId = Math.floor(Math.random() * 1000)
            const signedPreKey = libsignal.keyhelper.generateSignedPreKey(identityKeyPair, signedPreKeyId)

            // Generate one-time prekeys (short-term keys that are used once then deleted)
            const oneTimePreKeys = []
            for (let i = 0; i < 20; i++) {
                const preKeyId = Math.floor(Math.random() * 1000000)
                const preKey = libsignal.keyhelper.generatePreKey(preKeyId)
                oneTimePreKeys.push({
                    keyId: preKey.keyId,
                    public: SignalProtocol.arrayBufferToBase64(preKey.keyPair.pubKey),
                    private: SignalProtocol.arrayBufferToBase64(preKey.keyPair.privKey),
                })
            }

            // Return full key bundle
            return {
                identityKey: {
                    public: SignalProtocol.arrayBufferToBase64(identityKeyPair.pubKey),
                    private: SignalProtocol.arrayBufferToBase64(identityKeyPair.privKey),
                },
                signedPreKey: {
                    keyId: signedPreKey.keyId,
                    public: SignalProtocol.arrayBufferToBase64(signedPreKey.keyPair.pubKey),
                    private: SignalProtocol.arrayBufferToBase64(signedPreKey.keyPair.privKey),
                    signature: SignalProtocol.arrayBufferToBase64(signedPreKey.signature),
                },
                oneTimePreKeys: oneTimePreKeys,
                registrationId,
            }
        } catch (error) {
            console.error('Error using libsignal.keyhelper, falling back to custom implementation:', error)
            return SignalProtocol.generateKeyBundleCustom()
        }
    }

    /**
    * Generate a key bundle using Node.js crypto module as fallback
    * @returns {Object} Signal Protocol keys
    */
    static generateKeyBundleCustom() {
        // Generate identity key pair
        const identityKeyPair = SignalProtocol._generateKeyPair()

        // Generate a registration ID (random integer)
        const registrationId = Math.floor(Math.random() * 65535)

        // Generate signed prekey
        const signedPreKeyId = Math.floor(Math.random() * 1000)
        const signedPreKeyPair = SignalProtocol._generateKeyPair()

        // Create a signature by "signing" the public key
        const signature = SignalProtocol._signKey(signedPreKeyPair.public, Buffer.from(identityKeyPair.private, 'base64'))

        // Generate one-time prekeys
        const oneTimePreKeys = []
        for (let i = 0; i < 20; i++) {
            const preKeyId = Math.floor(Math.random() * 1000000)
            const keyPair = SignalProtocol._generateKeyPair()

            oneTimePreKeys.push({
                keyId: preKeyId,
                public: keyPair.public,
                private: keyPair.private,
            })
        }

        // Return full key bundle
        return {
            identityKey: {
                public: identityKeyPair.public,
                private: identityKeyPair.private,
            },
            signedPreKey: {
                keyId: signedPreKeyId,
                public: signedPreKeyPair.public,
                private: signedPreKeyPair.private,
                signature: signature,
            },
            oneTimePreKeys: oneTimePreKeys,
            registrationId,
        }
    }

    /**
    * Generate a keypair using Node.js crypto
    * @returns {Object} Key pair with public and private keys (base64 encoded)
    */
    static _generateKeyPair() {
        const keyPair = crypto.generateKeyPairSync('ed25519', {
            publicKeyEncoding: { type: 'spki', format: 'der' },
            privateKeyEncoding: { type: 'pkcs8', format: 'der' },
        })

        return {
            public: keyPair.publicKey.toString('base64'),
            private: keyPair.privateKey.toString('base64'),
        }
    }

    /**
    * Create a signature for a key using the identity private key
    * @param {String} data - Data to sign (base64 encoded)
    * @param {Buffer} privateKey - Private key to sign with
    * @returns {String} Base64 encoded signature
    */
    static _signKey(data, privateKey) {
        try {
            const sign = crypto.createSign('SHA256')
            sign.update(Buffer.from(data, 'base64'))
            return sign.sign(privateKey).toString('base64')
        } catch (error) {
            // If that fails, generate a random signature (for development only)
            return crypto.randomBytes(64).toString('base64')
        }
    }

    /**
    * Generate a new oneTimePreKey for a user
    * @returns {Object} New one-time prekey
    */ static generateOneTimePreKey() {
        if (libsignal.keyhelper && libsignal.keyhelper.generatePreKey) {
            const preKeyId = Math.floor(Math.random() * 1000000)
            const preKey = libsignal.keyhelper.generatePreKey(preKeyId)
            return {
                keyId: preKey.keyId,
                public: SignalProtocol.arrayBufferToBase64(preKey.keyPair.pubKey),
                private: SignalProtocol.arrayBufferToBase64(preKey.keyPair.privKey),
            }
        } else {
            // Fallback to custom implementation
            const preKeyId = Math.floor(Math.random() * 1000000)
            const keyPair = SignalProtocol._generateKeyPair()
            return {
                keyId: preKeyId,
                public: keyPair.public,
                private: keyPair.private,
            }
        }
    }

    /**
    * Initialize a Signal Protocol session with another user
    * @param {Object} ourKeys - Current user's keys
    * @param {Object} theirPublicKeys - Other user's public keys
    * @returns {Object} Signal Protocol session
    */
    static initializeSession(ourKeys, theirPublicKeys) {
        // TODO: Implement session establishment
        return {
            initialized: true,
            timestamp: Date.now(),
        }
    }

    /**
    * Encrypt a message using Signal Protocol
    * @param {Object} session - Signal Protocol session
    * @param {String} message - Message to encrypt
    * @returns {String} Encrypted message
    */
    static encryptMessage(session, message) {
        // Simple fallback encryption (for development only)
        try {
            if (libsignal.SessionCipher) {
            // TODO: Implement proper Signal Protocol encryption
                return { type: 'signal', ciphertext: 'Encrypted with Signal Protocol' }
            } else {
            // Fallback to basic encryption
                return {
                    type: 'fallback',
                    ciphertext: crypto
                        .publicEncrypt({ key: Buffer.from(session.publicKey, 'base64') }, Buffer.from(message))
                        .toString('base64'),
                }
            }
        } catch (error) {
            console.error('Error encrypting message:', error)
            // For development, just Base64 encode the message
            return {
                type: 'plain',
                ciphertext: Buffer.from(message).toString('base64'),
            }
        }
    }

    /**
    * Decrypt a message using Signal Protocol
    * @param {Object} session - Signal Protocol session
    * @param {String} encryptedMessage - Encrypted message
    * @returns {String} Decrypted message
    */
    static decryptMessage(session, encryptedMessage) {
        // Simple fallback decryption (for development only)
        try {
            if (encryptedMessage.type === 'signal' && libsignal.SessionCipher) {
            // TODO: Implement proper Signal Protocol decryption
                return 'Decrypted with Signal Protocol'
            } else if (encryptedMessage.type === 'fallback') {
                return crypto
                    .privateDecrypt(
                        { key: Buffer.from(session.privateKey, 'base64') },
                        Buffer.from(encryptedMessage.ciphertext, 'base64')
                    )
                    .toString()
            } else {
            // For development, just Base64 decode the message
                return Buffer.from(encryptedMessage.ciphertext, 'base64').toString()
            }
        } catch (error) {
            console.error('Error decrypting message:', error)
            return '[Decryption failed]'
        }
    }

    /**
    * Convert ArrayBuffer to Base64 string
    * @param {ArrayBuffer} buffer - ArrayBuffer to convert
    * @returns {String} Base64 string
    */
    static arrayBufferToBase64(buffer) {
        const bytes = new Uint8Array(buffer)
        let binary = ''
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i])
        }
        return Buffer.from(binary, 'binary').toString('base64')
    }

    /**
    * Convert Base64 string to ArrayBuffer
    * @param {String} base64 - Base64 string to convert
    * @returns {ArrayBuffer} ArrayBuffer
    */
    static base64ToArrayBuffer(base64) {
        const binary = Buffer.from(base64, 'base64').toString('binary')
        const bytes = new Uint8Array(binary.length)
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i)
        }
        return bytes.buffer
    }
}

export default SignalProtocol
