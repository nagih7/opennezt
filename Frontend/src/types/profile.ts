// Types for ProfileDetails component

export interface Industry {
   _id: string
   name: string
}

export interface ExperienceLevel {
   _id: string
   name: string
}

export interface Education {
   _id: string
   school?: string
   degree?: string
   field_of_study?: string
   start_date?: string
   end_date?: string
   grade?: string
   activities?: string
   is_lifetime?: boolean
   organization_id?: string | string[]
}

export interface Certification {
   _id: string
   name?: string
   organization_name?: string
   issue_date?: string
   expiration_date?: string
   verification_url?: string
   organization_id?: string | string[]
}

export interface Category {
   _id: string
   name: string
}

export interface Skill {
   _id: string
   name: string
   category: Category
   category_id: string
}

export interface ProfileAdditionalInfo {
   _id: string
   title?: string
   description?: string
   [key: string]: any
}

export interface Profile {
   _id: string
   name?: string
   email?: string
   avatar?: string
   background?: string
   industries?: Industry[]
   experience_level?: ExperienceLevel
   educations?: Education[]
   certifications?: Certification[]
   skills?: Skill[]
   additional_infos?: ProfileAdditionalInfo[]
   [key: string]: any
}

export interface GroupedSkills {
   [categoryName: string]: {
      category: Category
      skills: Skill[]
   }
}

export interface OpenExpertiseRequest {
   [categoryName: string]: boolean
}

export type ActiveFormType =
   | 'education'
   | 'certification'
   | 'expertise'
   | 'background'
   | 'additional'
   | 'professionalBackground'
   | 'additionalInfos'
   | ''

export interface Friend {
   user: {
      _id: string
      name: string
      email: string
      avatar: string
   }
   created_at: string
}

export type OrderByType = 'Newest' | 'Oldest' | 'Active'
