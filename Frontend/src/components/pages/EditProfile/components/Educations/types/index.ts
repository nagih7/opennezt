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
   [key: string]: any
}

export interface FormData {
   school?: string
   degree?: string
   field_of_study?: string
   start_date?: string
   end_date?: string
   grade?: string
   activities?: string
   is_lifetime?: boolean
   organization_id?: string | string[]
   expiration_date?: string | null
   [key: string]: any
}

export type ActionType = 'create' | 'update' | ''

export type AppDispatch = any // Tạm thời dùng any, nên thay bằng kiểu từ Redux store thực tế