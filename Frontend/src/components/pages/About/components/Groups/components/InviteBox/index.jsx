import { Avatar, Button } from '@chakra-ui/react'
import React from 'react'

const InviteBox = ({ invite }) => {
    return (
        <div className="flex items-center justify-between p-4 mb-3 bg-white border rounded-lg">
            <div className="flex items-center space-x-4">
                <Avatar.Root className="w-[4.5rem] h-[4.5rem] rounded-full">
                    <Avatar.Image src={invite.user?.avatar} />
                    <Avatar.Fallback alt={invite.user?.name} />
                </Avatar.Root>

                <div className="flex items-center space-x-1">
                    <p className="font-medium">
                        <strong>{invite.user?.name}</strong> invite you to group{' '}
                        <strong>{invite.data?.project?.name}</strong>
                    </p>
                </div>
            </div>
            <div className="flex space-x-4">
                <Button className="bg-blue-500 text-white hover:!bg-blue-400 hover:!text-white font-bold">
                    Accept
                </Button>
                <Button className="bg-[#F4F5F6] font-bold">Delete</Button>
            </div>
        </div>
    )
}

export default InviteBox
