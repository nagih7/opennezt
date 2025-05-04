import React, { useEffect } from 'react'
import { Tabs } from '@chakra-ui/react'
import RightSidebar from 'components/common/RightSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getListProjectsParticipated } from 'api/project'
import ProjectBox from './components/ProjectBox'
import { PROJECT_INVITATION_NOTIFICATION, WAITING_STATUS } from 'utils/constants'
import InviteBox from './components/InviteBox'
const Groups = () => {
    const dispatch = useDispatch()
    // ========== STATE FROM REDUX ========== //
    const { projectsParticipated, paginationProjectsParticipated } = useSelector((state) => state.project)
    const { notifications } = useSelector((state) => state.notification)

    const projects = projectsParticipated || []
    const invitations = notifications.filter((notification) => {
        return (
            notification.type?.name === PROJECT_INVITATION_NOTIFICATION,
            notification.metadata?.status === WAITING_STATUS
        )
    })

    // ========== USE EFFECT ========== //
    useEffect(() => {
        if (!projectsParticipated || projectsParticipated.length === 0) {
            dispatch(getListProjectsParticipated(paginationProjectsParticipated))
        }
        // eslint-disable-next-line
    }, [dispatch])

    return (
        <div className="flex gap-3">
            <div className="lg:w-10/12 w-full">
                <Tabs.Root className="h-4" defaultValue="Memberships">
                    <div className="w-full 2xl:w-full">
                        <Tabs.List>
                            <div className="flex justify-between w-full p-4 font-bold bg-white">
                                <div className="flex">
                                    <Tabs.Trigger className="text-black" value="Memberships">
                                        Memberships
                                    </Tabs.Trigger>
                                    <Tabs.Trigger className="text-black" value="Invitations">
                                        Invitations
                                    </Tabs.Trigger>
                                </div>

                                <div className="flex items-center space-x-2 2xl:ml-[31.5rem] ">
                                    <span className="text-black ">Order By:</span>
                                    <select className="text-sm font-medium text-gray-600 bg-transparent outline-none border border-[#F3F3F3] w-[10rem] h-[2rem] rounded-sm">
                                        <option value="Last Active">Last Active</option>
                                        <option value="Most Members">Most Members</option>
                                        <option value="Newly Created">Newly Created</option>
                                    </select>
                                </div>
                            </div>
                        </Tabs.List>
                        <div className="mt-5 bg-white ">
                            <Tabs.Content value="Memberships">
                                <div className="p-6 bg-white rounded-lg">
                                    <h4 className="mb-4 text-lg font-semibold">Groups({projects?.length})</h4>
                                    <hr className="mb-4" />
                                    <div className="grid grid-cols-3 gap-8">
                                        {projects.map((project) => (
                                            <ProjectBox project={project} key={project._id} />
                                        ))}
                                    </div>
                                </div>
                            </Tabs.Content>
                            <Tabs.Content value="Invitations">
                                <div className="p-4">
                                    {!invitations.length ? (
                                        <div className="bg-[#E3F1F6] p-3 border-l-2 border-[#0098CB] text-[#1599CC]">
                                            You have no outstanding group invites.
                                        </div>
                                    ) : (
                                        <div className="bg-white rounded-lg ">
                                            <h4 className="mb-4 text-lg font-semibold">
                                                Invitations({invitations?.length})
                                            </h4>
                                            <hr className="mb-4" />
                                            {invitations.map((invite) => (
                                                <InviteBox invite={invite} key={invite._id} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Tabs.Content>
                        </div>
                    </div>
                </Tabs.Root>
            </div>
            <RightSidebar />
        </div>
    )
}
export default Groups
