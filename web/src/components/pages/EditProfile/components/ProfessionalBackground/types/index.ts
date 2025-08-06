export interface Industry {
   _id: string
   name?: string
   [key: string]: any
}

export interface ExperienceLevel {
   _id: string
   name?: string
   [key: string]: any
}

export interface Profile {
   industries?: Industry[]
   experience_level?: ExperienceLevel
   [key: string]: any
}

export interface FormData {
   industries: string[]
   experience_level: string[]
}

export interface SelectEvent {
   value: string[]
   items?: { value: string; label: string }[]
}