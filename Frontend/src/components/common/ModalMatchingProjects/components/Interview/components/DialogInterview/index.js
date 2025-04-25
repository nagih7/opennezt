import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import React from 'react'
import img from '../../../../../../../assets/images/background/auth.jpg'
import { IconlyCall, IconlyDanger2, IconlySetting, IconlyVoice } from 'components/UI/Iconly'

const DiaLogInterview = () => {
    return (
        <Dialog.Root size="full" motionPreset="slide-in-bottom">
            <Dialog.Trigger asChild>
                <Button variant="outline" size="sm">
                    Open Dialog
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Body className="w-full h-full bg-[#201f24] p-0">
                            <div>
                                <div className="px-8 pt-8">
                                    <div className="relative">
                                        <img src={img} className="h-[570px] w-full" />
                                        <div className="absolute bottom-0 right-0 p-4">
                                            <img src={img} className="h-[200px] rounded-md" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full px-8 pt-4">
                                    <div className="w-2/12">
                                        <div className="flex items-center gap-2 font-medium text-[#ffffff]">
                                            <span>1:29</span>
                                            <span>|</span>
                                            <span>Virtual interview</span>
                                        </div>
                                    </div>
                                    <div className="w-8/12">
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="flex justify-center items-center bg-[#42474a] p-3 rounded-full cursor-pointer">
                                                <IconlySetting size={25} color={'#ffffff'} />
                                            </div>
                                            <div className="flex items-center justify-center bg-[#ff2c20] p-3 rounded-full cursor-pointer">
                                                <IconlyCall size={25} color={'#ffffff'} />
                                            </div>
                                            <div className="flex justify-center items-center bg-[#42474a] p-3 rounded-full cursor-pointer">
                                                <IconlyVoice size={25} color={'#ffffff'} />
                                            </div>
                                            <div className="flex justify-center items-center bg-[#42474a] p-3 rounded-full cursor-pointer">
                                                <IconlyDanger2 size={25} color={'#ffffff'} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/12"></div>
                                </div>
                            </div>
                        </Dialog.Body>
                        {/* <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button>Save</Button>
              </Dialog.Footer> */}
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default DiaLogInterview
