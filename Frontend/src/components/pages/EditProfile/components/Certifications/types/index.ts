interface Certification {
   _id: string
   name?: string
   organization?: string
   issue_date?: string
   expiration_date?: string | null
   credential_id?: string
   credential_url?: string
   is_lifetime?: boolean
   [key: string]: any
}

interface FormData {
   name?: string
   organization?: string
   issue_date?: string
   expiration_date?: string | null
   credential_id?: string
   credential_url?: string
   is_lifetime?: boolean
   organization_id?: string | string[]
   [key: string]: any
}

interface SelectEvent {
   value: string[]
   items?: { value: string; label: string }[]
}

type AppDispatch = any // Tạm thời dùng any, nên thay bằng kiểu từ Redux store thực tế

type categoryFramework = {
   items: { label: string; value: string }[]
}

export type { Certification, FormData, SelectEvent, AppDispatch, categoryFramework }