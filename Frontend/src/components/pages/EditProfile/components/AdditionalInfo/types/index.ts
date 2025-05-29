// Định nghĩa các interfaces
interface Field {
   id: string
   name: string
   placeholder: string
   backgroundColor: string
}

interface AdditionalInfo {
   _id: string
   name: string
   content?: string
   [key: string]: any
}

interface FormData {
   [key: string]: string
}

interface ExistingData {
   [key: string]: AdditionalInfo | null
}

type AppDispatch = any // Tạm thời dùng any, nên thay bằng kiểu từ Redux store thực tế

export type {
    Field,
    AdditionalInfo,
    FormData,
    ExistingData,
    AppDispatch
}