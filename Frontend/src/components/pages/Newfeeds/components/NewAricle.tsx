import AvatarDefault from '../../../../assets/images/default/AvatarDefault.png'
import React from 'react'
import { useSelector } from 'react-redux'
import { Input } from '~/components/UI/input'
import { NewArticleProps, RootState } from '~/types'

const NewArticle: React.FC<NewArticleProps> = ({ onOpenForm }) => {
   const { authUser } = useSelector((state: RootState) => state.auth)

   const handleClick = (): void => {
      onOpenForm()
   }

   return (
      <>
         <div className="flex gap-3 bg-[#ffffff] p-8 rounded-md mb-4 w-full">
            <img src={authUser?.avatar || AvatarDefault} className="w-[50px] h-[50px] rounded-full"></img>
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
