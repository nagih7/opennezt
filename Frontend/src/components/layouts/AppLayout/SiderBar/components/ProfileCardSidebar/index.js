import React from 'react'
import { CheckCircleFilled } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@chakra-ui/react'

const ProfileCardSidebar = () => {
    const navigate = useNavigate()
    const { authUser } = useSelector((state) => state.auth)

    return (
        <div
            style={{ cursor: 'pointer' }}
            className="flex items-center gap-3 pb-4 mb-6 border-b-[1px] border-gray-200"
            onClick={() => navigate('/about')}
        >
            <Avatar.Root size={'xl'}>
                <Avatar.Fallback name={authUser?.name} />
                <Avatar.Image src={authUser?.avatar} />
            </Avatar.Root>
            <div>
                <div href="#" className="flex items-center gap-2 text-black no-underline text-nowrap">
                    <span className="font-semibold truncate w-36">{authUser?.name}</span>
                    <CheckCircleFilled className="text-blue-500" />
                </div>
                <div className="w-40 text-xs text-gray-500 truncate">@{authUser?.email}</div>
            </div>
        </div>
    )
}

export default ProfileCardSidebar
