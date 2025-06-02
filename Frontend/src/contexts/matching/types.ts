import { MatchingProjectProps } from '~/types'

export interface MatchingContextType {
   matches: MatchingProjectProps[]
   loading: boolean
   openModalConfirm: boolean
   showMatches: boolean
   openModalScrapLinkedin: boolean
   linkedinUsername: string
   confirmed: boolean
   hideNotification: boolean
   matchSelected: MatchingProjectProps | null
   showProject: boolean

   setMatches: (newProjects: any[]) => void
   setOpenModalConfirm: (value: boolean) => void
   setOpenModalScrapLinkedin: (value: boolean) => void
   setShowMatches: (value: boolean) => void
   setShowProject: (value: boolean) => void

   handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
   handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
   handleConfirmationChange: (e: React.ChangeEvent<HTMLInputElement>) => void
   handleHideNotificationChange: (e: React.ChangeEvent<HTMLInputElement>) => void
   handleSubmit: () => Promise<void>
   handleSkip: () => void
   handleShowProject: (project: MatchingProjectProps) => void

   // Matching projects
   handleComfirmMatchingProjects: () => Promise<void>
}

export interface MatchingProviderProps {
   children: React.ReactNode
   initialValue?: string
   onValueChange?: (value: string) => void
}
