import {
    User,
    Profile,
    Project,
    ObjectId,
    NotificationFeed,
    Conversation,
    Industry,
    ExperienceLevel,
    Skill,
    Category,
    Stage,
} from '@/models'
import {FileUpload} from '@/utils/classes'
import {LINK_STATIC_URL} from '@/configs'

// =========== GET [Recruit Talents] =========== //
export async function recruitTalents(currentUser, query) {
    const {
        q,
        page,
        per_page,
        field,
        order,
        industry_id,
        experience_level_id,
        category_id,
        subcategory_id,
        skill_id,
    } = query

    await console.log('query', query)
}
