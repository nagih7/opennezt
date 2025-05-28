export interface Skill {
   _id: string
   name: string
   category_id: string
}

export interface Profile {
   skills: Skill[]
   [key: string]: any
}

export interface FormData {
   categories: string[]
   subcategories: string[]
   skills: string[]
   skillFormat: Skill[]
}

export interface SelectEvent {
   value: string[]
   items?: { value: string; label: string }[]
}