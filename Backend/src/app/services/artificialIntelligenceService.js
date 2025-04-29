import getSkillsForProfile from '@/utils/classes/linkedin-crawl'
import { getProfileDetail } from './profileService'
import { getProjectMatching } from './interviewService'

// Tìm kiếm dự án phù hợp với người dùng
export async function matchingProjects(user, linkedInUsername) {
    // Lấy chi tiết thông tin cá nhân
    const profile = await getProfileDetail(user._id)
    if (linkedInUsername) {
        // Lấy thông tin người dùng từ LinkedIn
        const skills = await getSkillsForProfile(linkedInUsername)

        // Thêm kỹ năng vào thông tin cá nhân
        profile.skills ? profile.skills?.push(...skills) : (profile.skills = skills)
    }

    // Call API tới AI interview để lấy danh sách projects
    const projects = await getProjectMatching(user._id, profile)
    return projects || []
}
