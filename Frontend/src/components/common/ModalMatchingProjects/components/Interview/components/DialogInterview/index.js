import { Dialog, Portal } from '@chakra-ui/react'
import React from 'react'
import img from '../../../../../../../assets/images/background/auth.jpg'
import { IconlyCall, IconlyDanger2, IconlySetting, IconlyVoice } from 'components/UI/Iconly'
import VideoPreview from '../VideoPreview'
import { useSelector } from 'react-redux'
import useSpeechToText from 'utils/audio/useSpeechToText'

const DiaLogInterview = ({ videoRef }) => {
    // STATE
    const { isOpenModalInterview } = useSelector((state) => state.interview)

    // Use our custom hook for speech-to-text functionality
    const { isRecording, recordingTime, isProcessing, error, toggleRecording, formatTime } = useSpeechToText()

    // RENDERING
    return (
        <Dialog.Root size="full" motionPreset="slide-in-bottom" open={isOpenModalInterview}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content className="w-full h-full bg-[#201f24] rounded-none flex flex-col">
                        <Dialog.Body className="w-full flex-1 bg-[#201f24] p-0 flex flex-col overflow-hidden">
                            <div className="flex-1 px-8 pt-8 overflow-hidden">
                                <div className="relative w-full h-full">
                                    <VideoPreview videoRef={videoRef} />
                                    <div className="absolute bottom-0 right-0 p-4">
                                        <img src={img} className="h-[200px] rounded-md" alt="Interview background" />
                                    </div>
                                    {isRecording && (
                                        <div className="absolute flex items-center gap-2 px-3 py-1 text-white bg-red-600 rounded-full top-4 right-4">
                                            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                            <span>Recording {formatTime(recordingTime)}</span>
                                        </div>
                                    )}
                                    {isProcessing && (
                                        <div className="absolute flex items-center gap-2 px-3 py-1 text-white bg-blue-600 rounded-full top-4 right-4">
                                            <div className="w-3 h-3 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                                            <span>Processing speech...</span>
                                        </div>
                                    )}
                                    {error && (
                                        <div className="absolute px-3 py-1 text-white bg-red-500 rounded-full top-4 right-4">
                                            {error}
                                        </div>
                                    )}
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
                                <div
                                    className={`flex justify-center items-center ${
                                        isRecording ? 'bg-red-500' : 'bg-[#42474a]'
                                    } p-3 rounded-full cursor-pointer transition-colors`}
                                    onClick={toggleRecording}
                                    title={isRecording ? 'Stop recording' : 'Start recording'}
                                >
                                    <IconlyVoice size={25} color={'#ffffff'} />
                                </div>
                                <div className="flex justify-center items-center bg-[#42474a] p-3 rounded-full cursor-pointer">
                                    <IconlyDanger2 size={25} color={'#ffffff'} />
                                </div>
                            </div>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default DiaLogInterview
