import React from 'react'
import { CheckCircleFilled } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Avatar } from '@chakra-ui/react'

const ProfileCard = () => {
    // ========== STATE FROM REDUX STORE ========== //
    const { authUser } = useSelector((state) => state.auth)
    // ========== COMPONENT RENDER ========== //
    return (
        <div className="flex items-center gap-3 pb-8 border-b-[1px] border-gray-200 mb-8">
            <div>
                <Avatar.Root shape={'rounded'} size={'2xl'}>
                    <Avatar.Fallback name={authUser.name} />
                    <Avatar.Image src={authUser.avatar} />
                </Avatar.Root>
            </div>
            <div>
                <h4 className="flex items-center">
                    {authUser?.name}
                    <CheckCircleFilled className="text-[#3897f0] ml-2" />
                </h4>
                <span className="text-[#6f7f92]">
                    {authUser?.created_at ? `Member since ${new Date(authUser.created_at).getFullYear()}` : ''}
                </span>
            </div>
        </div>
    )
}

export default ProfileCard
