import getSkillsForProfile from '@/utils/classes/linkedin-crawl'
import { getLinkinProfile, getProfileDetail } from './profileService'
import { getProjectMatching } from './interviewService'
import delay from '@/utils/classes/delay'
import { LinkedInProfile } from '@/models'

export async function scrapLinkedIn(user, linkedInUsername) {
    const skills = await getSkillsForProfile(linkedInUsername)
    if (skills.length > 0) {
        // Kiểm tra xem người dùng đã có profile LinkedIn chưa
        let profile = await LinkedInProfile.findOne({ userId: user._id })
        if (!profile) {
            profile = new LinkedInProfile({
                userId: user._id,
                username: linkedInUsername,
                skills: skills,
            })
        } else {
            // Cập nhật thông tin LinkedIn nếu đã tồn tại
            profile.username = linkedInUsername
            profile.skills = skills
        }
        await profile.save()
    }

    return linkedInUsername
}

// Tìm kiếm dự án phù hợp với người dùng
export async function matchingProjects(user, linkedInUsername) {
    // Lấy chi tiết thông tin cá nhân
    const profile = await getProfileDetail(user._id)
    if (linkedInUsername) {
        // Lấy thông tin người dùng từ LinkedIn
        const linkedInProfile = await getLinkinProfile(user._id)
        profile.skills ? profile.skills?.push(...linkedInProfile.skills) : (profile.skills = linkedInProfile.skills)
    }

    // Call API tới AI interview để lấy danh sách projects
    const projects = await getProjectMatching(user._id, profile)
    return projects || []
}
