import React from 'react'
import icon_opennezt_img from 'assets/images/logo/opennezt_black.png'
import { useDispatch, useSelector } from 'react-redux'
import { startInterview } from 'api/interview'
import { useParams } from 'react-router-dom'
import { AppDispatch } from '~/store/configureStore'

interface InterviewJoinSectionProps {
   handleTechnicalIssues: () => void
}

interface InterviewState {
   hasJoined: boolean
   isLoadingStartInterview: boolean
   // Add other interview state properties as needed
}

const InterviewJoinSection: React.FC<InterviewJoinSectionProps> = ({ handleTechnicalIssues }) => {
   const dispatch = useDispatch<AppDispatch>()
   const params = useParams<{ projectId: string }>()
   const { projectId } = params

   // STATE FROM REDUX STORE
   const { hasJoined, isLoadingStartInterview } = useSelector((state: { interview: InterviewState }) => state.interview)

   // HANDLERS
   const handleStartInterview = () => {
      if (projectId) {
         dispatch(startInterview(projectId))
      }
   }

   // RENDERING
   return (
      <div className="flex flex-col items-center justify-center gap-3 mt-[30px] md:mt-[120px] 2xl:mt-[150px]">
         <span className="text-xl font-semibold 2xl:text-2xl">Ready to join?</span>
         <img className="w-10 h-10 bg-center rounded-full" src={icon_opennezt_img} alt="OpenNezt Logo" />
         <span className="text-[#6f7f92] font-semibold">OpenNezt AI is in the call</span>
         <button
            className={`px-20 2xl:py-3 py-2 rounded-full text-[#ffffff] font-semibold ${
               isLoadingStartInterview
                  ? 'bg-[#7299d1] cursor-not-allowed'
                  : 'bg-[#4374c0] hover:bg-[#3a65a9] transition-colors'
            }`}
            onClick={handleStartInterview}
            disabled={isLoadingStartInterview || hasJoined}
         >
            {isLoadingStartInterview ? 'Connecting...' : hasJoined ? 'Interview Started' : 'Start Interview'}
         </button>
         <button
            className="bg-[#ffffff] px-6 font-semibold py-2 rounded-full border hover:bg-gray-50 transition-colors"
            onClick={handleTechnicalIssues}
         >
            I{`'`}m having issues
         </button>
         <span className="text-[#6f7f92] font-semibold text-center px-4">
            OpenNezt uses generative AI to conduct the AI interview
         </span>
      </div>
   )
}

export default InterviewJoinSection
