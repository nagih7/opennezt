import { useNavigate } from 'react-router-dom'
import { ROUTE_CONFIG } from '~/config/constants'

export interface UseActivateHeaderProps {
   isBottom: boolean
   setIsBottom: (value: boolean) => void
   onTabChange?: (tab: string) => void
   activeTab?: string
   setIsActive?: (tab: string) => void
}

export const useActivateHeader = ({
   onTabChange,
   activeTab = 'my-projects',
   isBottom,
   setIsBottom,
}: UseActivateHeaderProps) => {
   const navigate = useNavigate()

   const handleCreateProject = () => {
      navigate(ROUTE_CONFIG.USER.PROJECT.CREATE.PREFIX)
   }

   return {
      activeTab,
      setActive: (tab: string) => {
         if (onTabChange) {
            onTabChange(tab)
         }
      },
      isBottom,
      setIsBottom,
      handleCreateProject,
   }
}
