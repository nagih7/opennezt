export interface BaseProjectProps {
   _id: string
   name: string
   description?: string
   logo?: string | null
   background?: string | null
   created_at?: string
   createdAt?: string
}

export interface MemberProps {
   _id: string
   name: string
   role: string
   team_role: string
   avatar?: string | null
}

export interface ProjectDetailsProps extends BaseProjectProps {
   stage: string
   industries: string[]
   members: MemberProps[]
   additional_infos?: any[]
   requirement?: any
}

export interface BreakdownProps {
   availability: number
   career_goals: number
   experience_level: number
   industry_alignment: number
   skills_fit: number
   vision_alignment: number
   vision_and_culture: number
   work_expectations: number
}

export interface MatchingProjectProps {
   id: string
   percent_match: number
   project: ProjectDetailsProps
   breakdown: BreakdownProps
}
