import React from 'react'
import { useSelector } from 'react-redux'
import PaginationCustom from 'components/UI/PaginationCustom'
import { recruitTalents } from 'api/talent'
import { accessToTalent } from 'api/activity'
import { useNavigate } from 'react-router-dom'
import { User } from '../../types'
import { useAppDispatch } from '~/store/hooks'
import { RootState } from '~/store'
import { ROUTE_CONFIG } from '~/config/constants'
import { ButtonPrimary } from '~/components/UI/button'
import { IconlyBookmark, IconlyHeart, IconlyShow } from '~/components/UI/Iconly'
import { AVATAR_DEFAULT } from '~/utils/constants'
import { Avatar, AvatarImage } from '~/components/UI/avatar'

interface PageData {
   page: number
   pageSize: number
}

const ListTalents: React.FC = () => {
   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   const { talents, formRecruitTalents, paginationRecruitTalents } = useSelector((state: RootState) => state.talent)

   const onPageChange = (pageData: PageData) => {
      dispatch(
         recruitTalents({
            ...formRecruitTalents,
            page: pageData.page,
            perPage: pageData.pageSize,
         })
      )
   }

   const handleViewTalentDetails = (user: User) => {
      dispatch(accessToTalent(user._id))
      navigate(ROUTE_CONFIG.USER.RECRUIT_TALENT.PREFIX + user._id)
   }

   return (
      <div className="container flex flex-col items-center justify-center w-full gap-10 py-8 mx-auto md:gap-20">
         <div className="grid grid-cols-1 gap-8 lg:w-full w-fit lg:grid-cols-3 md:grid-cols-2 sm:gap-6 md:gap-8 lg:gap-3">
            {talents?.map((talent, index) => (
               <div
                  key={index}
                  className="relative group h-[380px] cursor-pointer"
                  onMouseEnter={(e) => {
                     const children = e.currentTarget.querySelectorAll('.fade-element')
                     children.forEach((child) => ((child as HTMLElement).style.opacity = '1'))
                  }}
                  onMouseLeave={(e) => {
                     const children = e.currentTarget.querySelectorAll('.fade-element')
                     children.forEach((child) => ((child as HTMLElement).style.opacity = '0'))
                  }}
               >
                  <div className="relative">
                     <div className="relative group">
                        <Avatar className="w-[280px] h-[280px] object-cover cursor-pointer rounded-md overflow-hidden">
                           <AvatarImage src={talent.user.avatar} />
                           <AvatarImage src={AVATAR_DEFAULT} />
                        </Avatar>

                        <div
                           className="absolute top-[15px] right-[15px] fade-element"
                           style={{
                              opacity: 0,
                              transition: 'opacity 0.7s ease-in-out',
                           }}
                        >
                           <ul className="flex flex-col gap-2 pl-0 m-0">
                              <li className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center">
                                 <IconlyShow size={20} color={'#2f65b9'} />
                              </li>
                              <li className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center">
                                 <IconlyHeart size={20} color={'#2f65b9'} backgroundColor={'transparent'} />
                              </li>
                              <li className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center">
                                 <IconlyBookmark size={20} color={'#2f65b9'} backgroundColor={'transparent'} />
                              </li>
                           </ul>
                        </div>
                     </div>
                     <div className="absolute bottom-[-130px] group-hover:bottom-[-90px]  translate-x-full transition-all duration-700 ease-in-out left-[-280px] w-[280px] p-[16px] bg-[#f6f4f4] flex flex-col justify-center items-center gap-2">
                        <div className="font-semibold text-black no-underline">{talent.user.name}</div>

                        <ButtonPrimary
                           onClick={() => handleViewTalentDetails(talent.user)}
                           className="w-[150px] h-[40px] text-sm font-semibold bg-[#2f65b9] text-white hover:bg-[#1a4d8c] mt-[16px] fade-element"
                           style={{
                              opacity: 0,
                              transition: 'opacity 0.3s ease-in-out',
                           }}
                        >
                           VIEW DETAILS
                        </ButtonPrimary>
                     </div>
                  </div>
               </div>
            ))}
         </div>
         <PaginationCustom pagination={paginationRecruitTalents} onPageChange={onPageChange} />
      </div>
   )
}

export default ListTalents
