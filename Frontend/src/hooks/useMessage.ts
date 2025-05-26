import { useNavigate } from 'react-router-dom'
import { ROUTE_CONFIG } from '~/config/constants'
import { RootState, useAppSelector } from '~/store'

const useMessage = () => {
   const navigate = useNavigate()

   // Store
   const { conversations } = useAppSelector((state: RootState) => state.chat)

   // Function
   const handleNavigateChat = (id: string) => {
      navigate(ROUTE_CONFIG.USER.CONVERSATION.PREFIX + id)
   }

   return {
      conversations,
      handleNavigateChat,
   }
}

export default useMessage
