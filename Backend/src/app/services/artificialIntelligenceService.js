import {FounderProfile, Project} from '@/models'
import callOpenAI from '@/configs/openAI'
import {MATCHING_PROJECTS_PROMPT} from '@/configs/constants'

export async function matchingProjects(user) {
    const founderProfile = await FounderProfile.findOne({user_id: user._id}).lean()
    const projects = await Project.find({
        user_id: {$ne: user._id},
    })

    // Get user skills and project requirements
    const userSkills = {
        industry: founderProfile.industry,
        skills: founderProfile.areas_of_expertise,
    }
    const skillRequirements = projects.map((project) => ({
        _id: project._id,
        related_industries: project.related_industries,
        problem_solving: project.problem,
    }))

    // Generate prompt for OpenAI API
    const prompt = MATCHING_PROJECTS_PROMPT(userSkills, skillRequirements)

    // Call OpenAI API to get matching projects
    try {
        const response = await callOpenAI(prompt)
        const cleanResponse = response.replace(/```json\n|```/g, '')
        const projectsByMatching = JSON.parse(cleanResponse)

        // Filter projects with projectsByMatching
        const result = projects.map((project) => {
            const match = projectsByMatching.find((p) => p.projectId === project._id.toString())
            if (match) {
                return {
                    ...project,
                    matchScore: match.matchScore,
                }
            } else {
                return null
            }
        })
        return result.filter((project) => project !== null)
    } catch (error) {
        console.error(error)
        throw error
    }
}
