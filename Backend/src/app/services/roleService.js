import { CONVERSATION_MEMBER_ROLE } from '@/configs/roleConstants'
import { Role } from '@/models'
import { getTypeOfDirectConversation } from './typeService'

// Lấy member role của cuộc hội thoại
export async function getMemberRoleOfDirectConversation() {
    const directConversation = await getTypeOfDirectConversation()
    const role = await Role.findOne({
        name: CONVERSATION_MEMBER_ROLE,
        type_id: directConversation._id,
    })
    return role
}
