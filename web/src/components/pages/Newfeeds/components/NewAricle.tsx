import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarImage } from '~/components/UI/avatar'
import { Input } from '~/components/UI/input'
import { AVATAR_DEFAULT } from '~/config/constants'
import { NewArticleProps, RootState } from '~/types'

const NewArticle: React.FC<NewArticleProps> = ({ onOpenForm }) => {
   const { authUser } = useSelector((state: RootState) => state.auth)

   const handleClick = (): void => {
      onOpenForm()
   }

   return (
      <>
         <div className="flex gap-3 bg-[#ffffff] p-8 rounded-md mb-4 w-full">
            <Avatar className="w-[40px] h-[40px]">
               <AvatarImage src={authUser?.avatar || undefined} />
               <AvatarImage src={AVATAR_DEFAULT} />
            </Avatar>
            <Input
               className="rounded-lg cursor-pointer"
               placeholder={`${authUser?.name} do you want to create a article?`}
               onClick={handleClick}
               readOnly
            />
         </div>
      </>
   )
}

export default NewArticle
