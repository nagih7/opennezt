import { Image } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { OPENNEZT_LOGO } from 'utils/constants'
import { AccessLog } from 'types'
import { ROUTE_CONFIG } from '~/config/constants'

interface AccessBoxProps {
   access: AccessLog
}

const AccessBox: FC<AccessBoxProps> = ({ access }) => {
   const navigate = useNavigate()

   // ========== STATE ========== //
   const [imageError, setImageError] = useState<boolean>(false)

   // ========== HANDLE FUNCTION ========== //
   const handleViewProjectDetails = (project: AccessLog['project']) => {
      navigate(ROUTE_CONFIG.USER.PROJECT.PREFIX + project._id)
   }

   return (
      <div onClick={() => handleViewProjectDetails(access.project)} className="relative flex gap-3 cursor-pointer">
         {!imageError ? (
            <Image
               className="relative w-[4.5rem] h-[4.5rem] rounded-md object-cover"
               src={access.project.background}
               alt={access.project.name}
               aspectRatio={4 / 4}
               objectFit="cover"
               onError={() => setImageError(true)}
            />
         ) : (
            <div className="w-[4.5rem] h-[4.5rem] rounded-md bg-[#EAEFF8] flex items-center justify-center p-2">
               <Image src={OPENNEZT_LOGO} alt={access.project.name} objectFit="cover" />
            </div>
         )}
         <div className="flex flex-col gap-1 mt-2">
            <span className="text-sm font-semibold">{access.project.name}</span>
            <span className="relative text-xs">{moment(access.createdAt).fromNow()}</span>
         </div>
      </div>
   )
}

export default AccessBox
