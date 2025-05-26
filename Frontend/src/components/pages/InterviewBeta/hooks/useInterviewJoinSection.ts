import { useParams } from 'react-router-dom'
import { startInterview } from '~/api/interview'
import { useAppDispatch, useAppSelector } from '~/store'

export const useInterviewJoinSection = () => {
   const dispatch = useAppDispatch()
   const { projectId } = useParams()

   // STATE FROM REDUX STORE
   const { hasJoined, isLoadingStartInterview } = useAppSelector((state) => state.interview)

   // HANDLERS
   const handleStartInterview = () => {
      dispatch(startInterview(projectId))
   }

   return {
      hasJoined,
      isLoadingStartInterview,
      handleStartInterview,
   }
}
