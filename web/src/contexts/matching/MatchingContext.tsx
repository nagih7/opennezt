import { createContext, useContext } from 'react'
import { MatchingContextType } from './types'

export const useMatching = (): MatchingContextType => {
   return useContext(MatchingContext)
}

export const MatchingContext = createContext<MatchingContextType>({
   matches: [],
   loading: false,
   openModalConfirm: false,
   showMatches: false,
   openModalScrapLinkedin: false,
   linkedinUsername: '',
   confirmed: false,
   hideNotification: false,
   matchSelected: null,
   showProject: false,
   setMatches: () => {},
   setOpenModalConfirm: () => {},
   setOpenModalScrapLinkedin: () => {},
   setShowMatches: () => {},
   setShowProject: () => {},

   // LinkedIn scrap
   handleUsernameChange: () => {},
   handleKeyDown: () => {},
   handleConfirmationChange: () => {},
   handleHideNotificationChange: () => {},
   handleSubmit: async () => {},
   handleSkip: () => {},
   handleShowProject: () => {},

   // Matching projects
   handleComfirmMatchingProjects: async () => {},
})
