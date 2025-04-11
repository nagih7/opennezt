import { Badge, Button, Dialog, FormatNumber, HStack, Portal, Stack, Stat } from '@chakra-ui/react'
import ProjectGrid from 'components/pages/SeekProjects/components/ListProjects/ProjectGrid'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenModalMatchingProjects } from 'states/modules/artificialIntelligence'

const ModalMatchingProjects = () => {
    const dispatch = useDispatch()
    // ========== STATE FROM REDUX ========== //
    const { projects, isOpenModalMatchingProjects } = useSelector((state) => state.artificialIntelligence)
    // console.log('projects', projects)

    // ========== RENDER ========== //
    return (
        <Dialog.Root size={'xl'} open={isOpenModalMatchingProjects} placement={'center'} motionPreset="slide-in-bottom">
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content className="bg-white">
                        <Dialog.Header>
                            <Dialog.Title>
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-black">Matching Projects</h2>
                                </div>
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Stack spacing={4} className="w-full p-4 bg-gray-100 ">
                                {projects.length > 0 &&
                                    projects.map((project) => (
                                        <Stack
                                            key={project.id}
                                            className="flex flex-row w-full p-4 bg-white rounded-lg shadow-md "
                                        >
                                            <div className="flex-1 pr-4 border-r-2 border-gray-200">
                                                <ProjectGrid project={project} handleViewProjectDetails={() => {}} />
                                            </div>
                                            <Stack className="flex items-center justify-center w-1/4 p-4">
                                                <Stat.Root className="flex flex-col items-center justify-center w-full">
                                                    <Stat.Label>Suitable job</Stat.Label>
                                                    <HStack>
                                                        <Stat.ValueText className="flex items-center justify-center m-0 text-2xl font-bold text-gray-800">
                                                            {/* <FormatNumber value={'fdsf'} /> */}
                                                            <span className="text-gray-500"> {project?.job_title}</span>
                                                        </Stat.ValueText>
                                                        <Badge colorPalette="green" gap="0">
                                                            <Stat.UpIndicator />
                                                            {project?.percent_match}%
                                                        </Badge>
                                                    </HStack>
                                                    <Stat.HelpText>statistical</Stat.HelpText>
                                                </Stat.Root>
                                            </Stack>
                                        </Stack>
                                    ))}
                            </Stack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button
                                className="border-[#F4F5F6] bg-[#2F65B9] text-white"
                                onClick={() => dispatch(setOpenModalMatchingProjects(false))}
                                borderRadius={4}
                                loading={false}
                            >
                                OK
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default ModalMatchingProjects
