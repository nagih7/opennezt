import { Button, Image } from '@chakra-ui/react'
import {
   IconlyIndustry,
   IconlyInfoSquare,
   IconlyTickSquare,
   IconlyEarlyStage,
   IconlyFundingSource,
   IconlyParticipants,
   IconlyRevenue,
} from 'components/UI/Iconly'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { OPENNEZT_BG_BLACK } from 'utils/constants'
import { RootState } from 'store/types'
import { AppDispatch } from '~/store'

interface Industry {
   id: string
   name: string
}

interface Stage {
   name: string
}

interface FundingSource {
   name: string
   amount: string
   currency: string
}

interface Revenue {
   amount: string
   currency: string
}

interface Member {
   user: {
      name: string
      avatar: string
   }
   role: string
}

interface ProjectDetails {
   _id: string
   name: string
   background?: string
   applied?: boolean
   industries?: Industry[]
   stage?: Stage
   funding_sources?: FundingSource[]
   revenues?: Revenue[]
   members?: Member[]
}

const ProjectMoreInfo: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()
   const navigate = useNavigate()
   // ========== STATE FROM REDUX STORE ========== //
   const { projectDetails, isLoadingGetProjectDetails } = useSelector((state: RootState) => state.project)

   const [imageError, setImageError] = useState<boolean>(false)

   // ========== HANDLE FUNCTION ========== //
   const handleStartInterview = (projectId: string) => {
      navigate(`/interview/${projectId}`)
   }

   // ========== RENDER ========== //
   return (
      <div className="bg-white relative left-[-5.5rem] top-[-14.75rem] h-[41.5rem] 2xl:w-[24rem]">
         {!imageError ? (
            <Image
               src={projectDetails?.background}
               alt={projectDetails?.name}
               onError={() => setImageError(true)}
               aspectRatio={5 / 3}
               width="100%"
            />
         ) : (
            <Image aspectRatio={5 / 3} src={OPENNEZT_BG_BLACK} alt={projectDetails?.name} width="100%" />
         )}

         <div className="bg-[#EAEFF8] h-[7.5rem]">
            {projectDetails?.applied ? (
               <p className="bg-[#E3F5F1] flex relative top-[1.75rem] p-6 w-[21rem] right-[-1.5rem] border-l-[3px] border-[#00C792] text-[#00C792] items-center gap-1">
                  <IconlyTickSquare size={20} color={'#00C792'} />
                  Applied
               </p>
            ) : (
               <p className="bg-[#ffffff] flex relative top-[1.75rem] p-6 w-[21rem] right-[-1.5rem] border-l-[3px] border-[#ffe41b] text-[#ffe41b] items-center gap-1">
                  <IconlyInfoSquare size={20} color={'#ffe41b'} />
                  Not Applied
               </p>
            )}
         </div>
         <div className="p-[2rem]">
            <h4 className="font-bold">The Project Includes:</h4>
            <p className="mt-7 text-[#6F7F92] flex">
               <IconlyIndustry color={'#2F65B9'} />
               {projectDetails?.industries?.length} Main Industries
            </p>
            <p className="text-[#6F7F92] flex">
               <IconlyEarlyStage color={'#2F65B9'} />
               {projectDetails?.stage?.name}
            </p>
            {projectDetails?.fundingSources?.length > 0 && (
               <p className="text-[#6F7F92] flex">
                  <IconlyFundingSource color={'#2F65B9'} />
                  {projectDetails?.funding_sources?.length} Funding Sources
               </p>
            )}
            <p className="text-[#6F7F92] flex">
               <IconlyParticipants color={'#2F65B9'} />
               {projectDetails?.members?.length} Participants in the Project
            </p>

            {projectDetails?.revenue && projectDetails?.revenue?.length > 0 && (
               <p className="text-[#6F7F92] flex">
                  <IconlyRevenue color={'#2F65B9'} />
                  Revenue {projectDetails?.revenues?.slice(-1)[0].amount} (
                  {projectDetails?.revenues?.slice(-1)[0].currency})
               </p>
            )}
         </div>
         {projectDetails && projectDetails?.applied === false && isLoadingGetProjectDetails === false && (
            <Button
               className="px-4 py-2 mt-4 text-white rounded-sm"
               onClick={() => {
                  if (projectDetails?._id) {
                     handleStartInterview(projectDetails._id)
                  }
               }}
               width={'100%'}
               height={'3rem'}
               borderRadius={4}
               loadingText="Loading..."
               spinnerPlacement="start"
            >
               Start Interview
            </Button>
         )}
      </div>
   )
}

export default ProjectMoreInfo
