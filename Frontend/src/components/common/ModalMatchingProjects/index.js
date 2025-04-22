import { Button, Dialog, Portal, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenModalMatchingProjects } from 'states/modules/artificialIntelligence'
import Statistical from './components/Statistical'

const ModalMatchingProjects = () => {
    const dispatch = useDispatch()
    // ========== STATE FROM REDUX ========== //
    const { projects, isOpenModalMatchingProjects } = useSelector((state) => state.artificialIntelligence)
    // ========== STATE ========== //
    const [projectSelected, setProjectSelected] = useState(null)

    // ========== EFFECT ========== //
    useEffect(() => {
        if (projects.length > 0) {
            setProjectSelected(projects[0])
        }
    }, [projects])

    // ========== RENDER ========== //
    return (
        <Dialog.Root
            size="full"
            motionPreset="slide-in-bottom"
            open={isOpenModalMatchingProjects}
            placement={'center'}
            scrollBehavior="inside"
        >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content className="bg-white">
                        <Dialog.Header>
                            <Dialog.Title width="full" className="flex items-center justify-between ">
                                <h2 className="text-lg font-semibold text-black">{projectSelected?.project?.name}</h2>
                                <div className="flex items-center gap-4 text-sm">
                                    <Button
                                        className="border-[#F4F5F6] bg-[#2F65B9] text-white"
                                        onClick={() =>
                                            setProjectSelected(
                                                projects[projects.indexOf(projectSelected) - 1] || projects[0]
                                            )
                                        }
                                        borderRadius={4}
                                        loading={false}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        className="border-[#F4F5F6] bg-[#2F65B9] text-white"
                                        onClick={() =>
                                            setProjectSelected(
                                                projects[projects.indexOf(projectSelected) + 1] || projects[0]
                                            )
                                        }
                                        borderRadius={4}
                                        loading={false}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Stack spacing={4} className="w-full h-full p-4 bg-gray-100 ">
                                <Statistical project={projectSelected} />
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
