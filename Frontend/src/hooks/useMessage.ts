import { useNavigate } from 'react-router-dom'
import { RootState, useAppSelector } from '~/store'

const useMessage = () => {
   const navigate = useNavigate()

   // Store
   const { conversations } = useAppSelector((state: RootState) => state.chat)

   // Function
   const handleNavigateChat = (id: string) => {
      navigate(`/conversation/${id}`)
   }

   return {
      conversations,
      handleNavigateChat,
   }
}

export default useMessage
