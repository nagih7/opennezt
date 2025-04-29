import { Dialog, Portal } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import img from '../../../../../../../assets/images/background/auth.jpg'
import { IconlyCall, IconlyDanger2, IconlySetting, IconlyVoice } from 'components/UI/Iconly'
import VideoPreview from '../VideoPreview'
import { useSelector, useDispatch } from 'react-redux'
import useSpeechToText from 'utils/audio/useSpeechToText'
import { setCurrentAction } from 'states/modules/interview'

const DiaLogInterview = ({ videoRef }) => {
    const dispatch = useDispatch()
    // STATE
    const { isOpenModalInterview, currentAction, messages } = useSelector((state) => state.interview)

    // Use speech-to-text hook with automatic voice detection with more lenient settings
    const {
        isRecording,
        recordingTime,
        isProcessing,
        error,
        isListening,
        speechDetected,
        toggleVoiceDetection,
        formatTime,
        currentVolumeLevel,
        silenceThreshold,
    } = useSpeechToText({
        autoDetect: true, // Enable auto-detection when component mounts
        silenceThreshold: -50, // More sensitive to pick up voice (was -40)
        silenceTimeout: 1500, // Shorter silence timeout before stopping
        minRecordingTime: 1000, // Reduced minimum recording time
        minSpeechDuration: 300, // Shorter minimum speech duration
        consecutiveVoiceFrames: 5, // Fewer frames needed to trigger recording
        debugMode: true, // Enable debug logging
    })

    // Testing function to toggle between AI speaking and listening states
    const toggleAIAction = () => {
        const newAction = currentAction === 'speaking' ? 'listening' : 'speaking'
        dispatch(setCurrentAction(newAction))
    }

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

                                    {/* Audio level debug visualizer */}
                                    <div className="absolute top-4 left-4 px-3 py-2 bg-black bg-opacity-70 text-white text-sm rounded-lg">
                                        <div>
                                            Volume:{' '}
                                            <span
                                                className={
                                                    currentVolumeLevel > silenceThreshold
                                                        ? 'text-green-400'
                                                        : 'text-red-400'
                                                }
                                            >
                                                {currentVolumeLevel.toFixed(1)} dB
                                            </span>
                                        </div>
                                        <div>
                                            Threshold: <span className="text-yellow-300">{silenceThreshold} dB</span>
                                        </div>
                                        <div className="mt-1">
                                            <div className="w-full bg-gray-700 h-2 rounded-full">
                                                <div
                                                    className={`h-2 rounded-full ${
                                                        currentVolumeLevel > silenceThreshold
                                                            ? 'bg-green-500'
                                                            : 'bg-red-500'
                                                    }`}
                                                    style={{
                                                        width: `${Math.min(
                                                            100,
                                                            Math.max(0, ((currentVolumeLevel + 100) / 100) * 100)
                                                        )}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={toggleAIAction}
                                            className="mt-2 px-2 py-1 bg-blue-600 text-xs rounded hover:bg-blue-700"
                                        >
                                            Toggle AI {currentAction === 'speaking' ? 'to Listening' : 'to Speaking'}
                                        </button>
                                    </div>

                                    {/* Status indicators showing the current state */}
                                    {currentAction === 'speaking' && (
                                        <div className="absolute flex items-center gap-2 px-3 py-1 text-white bg-blue-600 rounded-full top-4 right-4">
                                            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                            <span>AI Speaking...</span>
                                        </div>
                                    )}

                                    {isRecording && currentAction === 'listening' && (
                                        <div className="absolute flex items-center gap-2 px-3 py-1 text-white bg-red-600 rounded-full top-4 right-4">
                                            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                            <span>Recording {formatTime(recordingTime)}</span>
                                        </div>
                                    )}

                                    {isProcessing && (
                                        <div className="absolute flex items-center gap-2 px-3 py-1 text-white bg-yellow-600 rounded-full top-4 right-4">
                                            <div className="w-3 h-3 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                                            <span>Processing speech...</span>
                                        </div>
                                    )}

                                    {isListening && !isRecording && !isProcessing && currentAction === 'listening' && (
                                        <div className="absolute flex items-center gap-2 px-3 py-1 text-white bg-green-600 rounded-full top-4 right-4">
                                            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                            <span>Listening for your voice...</span>
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
                                <div className="w-full">
                                    <div className="flex items-center justify-between font-medium text-[#ffffff]">
                                        <div className="flex gap-2">
                                            <span>1:29</span>
                                            <span>|</span>
                                            <span>Virtual interview</span>
                                        </div>
                                        <div className="text-sm">
                                            {messages.length > 0 && (
                                                <span>
                                                    Last message:{' '}
                                                    {messages[messages.length - 1]?.content?.substring(0, 30)}...
                                                </span>
                                            )}
                                        </div>
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
                                        isListening ? 'bg-green-500' : 'bg-[#42474a]'
                                    } p-3 rounded-full cursor-pointer transition-colors`}
                                    onClick={toggleVoiceDetection}
                                    title={isListening ? 'Stop listening' : 'Start listening'}
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
