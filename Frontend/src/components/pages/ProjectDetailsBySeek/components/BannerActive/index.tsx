import { Image } from '@chakra-ui/react'
import { IconlySend } from 'components/UI/Iconly'
import React,{useState} from 'react'
import { BsPatchCheckFill } from 'react-icons/bs'
import { FaCheckCircle } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { RootState } from 'store/types'
import { Button } from '~/components/UI/button'
import { OPENNEZT_LOGO, OPENNEZT_LOGO_GRADIENT } from '~/utils/constants'

interface ProjectUser {
   name: string
   avatar?: string
}

interface ProjectStage {
   name: string
}

interface ProjectDetails {
   name: string
   user?: ProjectUser
   stage?: ProjectStage
}

const BannerActive: React.FC = () => {
   // ========== STATE FROM REDUX STORE ========== //
   const { projectDetails } = useSelector((state: RootState) => state.project)
   const [imageError, setImageError] = useState<boolean>(false)
   const [logoError, setLogoError] = useState<boolean>(false)

   return (
      <div>
         {!imageError && projectDetails?.background ? (
            <Image
               src={projectDetails?.background}
               alt={projectDetails?.name}
               onError={() => setImageError(true)}
               className='w-full h-80 object-cover rounded-t-md'
            />
         ) : (
            <Image
               src={OPENNEZT_LOGO_GRADIENT}
               alt={projectDetails?.name}
               width="100%"
               className='w-full h-80 object-cover rounded-t-md'
            />
         )}

         <div className='flex bg-[#ffffff] rounded-b-md p-6'>
            <div className='flex items-center gap-3 -mt-40 w-full'>
               <div className='flex flex-col items-center gap-8 2xl:w-2/12 w-3/12'>
                  {!logoError && projectDetails.logo ? (
                           <Image
                              src={projectDetails.logo}
                              className='w-52 h-52 object-cover rounded-full'
                              alt={projectDetails.name}
                              width="100%"
                              objectFit="cover"
                              onError={() => setLogoError(true)}
                           />
                        ) : (
                           <Image
                              src={OPENNEZT_LOGO}
                              alt="OpenNezt"
                              className='w-52 h-52 object-cover rounded-full'
                           />
                        )}
                  <Button className='bg-[#2F65B9] text-[#ffffff] flex items-center rounded-xl !py-1 px-4 gap-2'>
                     <IconlySend color={'#ffffff'} size={25} />
                     Connect
                  </Button>                  </div>
               <div className='flex flex-col gap-8 2xl:w-8/12 w-7/12'>
                  <div className='flex flex-col text-[#ffffff]'>                        <div className='flex text-2xl font-medium items-center gap-2'>
                     {projectDetails?.name}
                     <BsPatchCheckFill className='text-blue-500' />
                  </div>
                     <span className='text-base font-medium'>Hanoi, VietNam</span>
                  </div>
                  <div className='flex items-center justify-between'>
                     <div className='flex flex-col font-medium items-center text-[#6F7F92]'>
                        Created by
                        <span className='flex items-center text-lg text-black font-bold gap-2'>
                           {projectDetails?.user?.name}
                           <FaCheckCircle className=" text-blue-500" />
                        </span>
                     </div>
                     <div className='flex flex-col font-medium items-center mr-32 text-[#6F7F92]'>
                        Stage
                        <span className='text-black text-lg font-bold'>{projectDetails?.stage?.name}</span>
                     </div>
                     <div className='flex flex-col font-medium items-center text-[#6F7F92] gap-2'>
                        Project Results: 70%
                        <p className="w-40 h-3 bg-gray-100 rounded-full overflow-hidden">
                           <div className="w-3/5 h-full bg-blue-600 rounded-full"></div>
                        </p>
                     </div>
                  </div>
               </div>
               <div className='w-2/12'>
               </div>
            </div>
            <div className='flex flex-col justify-end'>
               <FaLinkedin className='w-14 h-14 text-[#2F65B9]' />
            </div>
         </div>
      </div>
   )
}

export default BannerActive
