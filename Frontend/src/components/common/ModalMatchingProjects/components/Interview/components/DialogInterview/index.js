import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import img from '../../../../../../../assets/images/background/auth.jpg'
import { IconlyCall, IconlyDanger2, IconlySetting, IconlyVoice } from 'components/UI/Iconly'
import VideoPreview from '../VideoPreview'

const DiaLogInterview = ({ open, setOpen, videoRef }) => {
    // STATE

    // // Handle device selection
    // const handleDeviceSelect = (type, device) => {
    //     switch (type) {
    //         case 'audio-input':
    //             setSelectedAudioInput(device)
    //             break
    //         case 'audio-output':
    //             setSelectedAudioOutput(device)
    //             if (videoRef.current && typeof videoRef.current.setSinkId === 'function') {
    //                 videoRef.current.setSinkId(device.deviceId).catch((error) => {
    //                     console.error('Error setting audio output device:', error)
    //                 })
    //             }
    //             break
    //         case 'video':
    //             setSelectedVideo(device)
    //             break
    //         default:
    //             break
    //     }
    // }

    // RENDERING
    return (
        <Dialog.Root size="full" motionPreset="slide-in-bottom" open={open}>
            <Dialog.Trigger asChild>
                <Button variant="outline" size="sm">
                    Open Dialog
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content className="w-full h-full bg-[#201f24] rounded-none flex flex-col">
                        <Dialog.Body className="w-full flex-1 bg-[#201f24] p-0 flex flex-col overflow-hidden">
                            <div className="flex-1 px-8 pt-8 overflow-hidden">
                                <div className="relative w-full h-full">
                                    <VideoPreview videoRef={videoRef} />
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
                            </div>
                        </Dialog.Body>
                        <Dialog.Footer className="w-full h-[100px] bg-[#201f24] flex items-center justify-center gap-4">
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
                        </Dialog.Footer>
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
