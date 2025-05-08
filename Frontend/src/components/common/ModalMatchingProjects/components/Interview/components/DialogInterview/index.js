import { Button, Checkbox, CloseButton, Dialog, Portal, Stack } from '@chakra-ui/react'
import React, { useState, useEffect, useRef } from 'react'
import { IconlyCall, IconlyDanger2, IconlySetting, IconlyVoice } from 'components/UI/Iconly'
import { useDispatch, useSelector } from 'react-redux'
import AIFrame from './components/AIFrame'
import UserFrame from './components/UserFrame'
import { createVoiceDetector } from 'utils/audio/voiceDetection'
import { closeInterview, replyInterview } from 'api/interview'

const DiaLogInterview = ({ videoRef }) => {
    const dispatch = useDispatch()
    // STATE
    const { isOpenModalInterview, currentAction, messages, conversation, isLoadingReplyInterview } = useSelector(
        (state) => state.interview
    )
    const [isListening, setIsListening] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [error, setError] = useState(null)
    const [interviewDuration, setInterviewDuration] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [audioBlob, setAudioBlob] = useState(null)
    const [isOpenModalCloseInterview, setIsOpenModalCloseInterview] = useState(false)
    const [confirmSendData, setConfirmSendData] = useState(false)

    // REFS
    const voiceDetectorRef = useRef(null)
    const audioPlayerRef = useRef(null)
    const timerRef = useRef(null)

    // Start timer for interview duration
    useEffect(() => {
        if (isOpenModalInterview) {
            timerRef.current = setInterval(() => {
                setInterviewDuration((prev) => prev + 1)
            }, 1000)
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [isOpenModalInterview])

    // Format time for display (mm:ss)
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`
    }

    // VOICE DETECTION SETUP
    const setupVoiceDetection = async () => {
        try {
            // Don't start voice detection if we're currently loading a reply
            if (isLoadingReplyInterview) {
                setError('Waiting for AI response...')
                setIsListening(false)
                return false
            }

            // Clean up any existing detector
            if (voiceDetectorRef.current) {
                await voiceDetectorRef.current.stop()
            }

            // Create voice detector with callbacks
            voiceDetectorRef.current = createVoiceDetector({
                threshold: 10,
                silenceDelay: 2000,
                sampleRate: 44100,
                onSpeechStart: () => {
                    setIsSpeaking(true)
                },
                onSpeechEnd: () => {
                    setIsSpeaking(false)
                    // The audio blob is automatically created by the voice detector
                },
                onAudioReady: (blob) => {
                    // This callback receives the audio blob when speech ends
                    setAudioBlob(blob)
                    // Send the audio to be processed
                    sendAudioMessage(blob)
                },
                onError: (err) => {
                    setError('Microphone access denied')
                    setIsListening(false)
                },
                onListeningStart: () => {
                    setIsListening(true)
                    setError(null)
                },
                onListeningEnd: () => {
                    setIsListening(false)
                    setIsSpeaking(false)
                },
            })

            // Start the voice detector
            const success = await voiceDetectorRef.current.start()
            if (!success) {
                setError('Failed to start voice detection')
                return false
            }
            return true
        } catch (err) {
            setError('Voice detection error')
            setIsListening(false)
            return false
        }
    }

    // CLEANUP FUNCTION
    const cleanupVoiceDetection = async () => {
        if (voiceDetectorRef.current) {
            await voiceDetectorRef.current.stop()
            voiceDetectorRef.current = null
        }
    }

    // Toggle voice detection on/off
    const toggleVoiceDetection = () => {
        if (isListening) {
            cleanupVoiceDetection()
        } else {
            setupVoiceDetection()
        }
    }

    // Send audio message to the server for speech-to-text conversion
    const sendAudioMessage = async (blob) => {
        if (!blob) return

        try {
            // Create a FormData object to send the audio file
            const audioFile = new File([blob], `voice_message_${Date.now()}.wav`, {
                type: 'audio/wav',
            })

            const payload = {
                audio: audioFile,
                interview: conversation,
            }
            dispatch(replyInterview(payload))
        } catch (error) {
            console.error('Error sending audio message:', error)
            setError('Failed to send audio message')
        }
    }

    // AUDIO PLAYBACK FUNCTION
    // const playAIResponse = async (audioUrl) => {
    //     // Clean up previous audio player if exists
    //     if (audioPlayerRef.current) {
    //         audioPlayerRef.current.cleanup()
    //     }

    //     // Create a new audio player for AI response
    //     audioPlayerRef.current = createAudioPlayer(audioUrl, {
    //         autoPlay: true,
    //         onPlay: () => {
    //             setIsPlaying(true)
    //             // Pause voice detection while AI is speaking
    //             if (voiceDetectorRef.current && voiceDetectorRef.current.isActive()) {
    //                 voiceDetectorRef.current.stop()
    //                 setIsListening(false)
    //             }
    //         },
    //         onEnd: () => {
    //             setIsPlaying(false)
    //             // Auto resume voice detection after AI finishes speaking
    //             if (!isListening) {
    //                 setupVoiceDetection()
    //             }
    //         },
    //         onError: (error) => {
    //             console.error('Error playing AI audio:', error)
    //             setError('Failed to play AI response')
    //             setIsPlaying(false)
    //         },
    //     })
    // }

    // Cleanup function for audio player
    const cleanupAudioPlayer = () => {
        if (audioPlayerRef.current) {
            audioPlayerRef.current.cleanup()
            audioPlayerRef.current = null
        }
    }

    // Enhanced cleanup on unmount to include audio player
    useEffect(() => {
        return () => {
            cleanupVoiceDetection()
            cleanupAudioPlayer()
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [])

    // Stop voice detection when loading reply
    useEffect(() => {
        if (isLoadingReplyInterview && voiceDetectorRef.current && voiceDetectorRef.current.isActive()) {
            // Stop listening while processing the previous message
            voiceDetectorRef.current.stop()
            setIsListening(false)
            // setError('Processing your message...')
        } else if (!isLoadingReplyInterview && !isListening && !isPlaying && isOpenModalInterview) {
            // Auto-resume listening when loading is complete and we're not playing audio
            setupVoiceDetection()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingReplyInterview, isPlaying, isOpenModalInterview, isListening, voiceDetectorRef])

    const handleCloseInterview = () => {
        setIsOpenModalCloseInterview(true)
    }

    const onChangeConfirmSendData = (event) => {
        setConfirmSendData(event.target.checked)
    }

    const handleConfirmCloseInterview = () => {
        cleanupVoiceDetection()
        cleanupAudioPlayer()

        const payload = {
            interview: conversation,
            storage: confirmSendData,
        }
        if (confirmSendData) dispatch(closeInterview({ ...payload, messages }))
        else dispatch(closeInterview(payload))
        setIsOpenModalCloseInterview(false)
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
                                    <AIFrame />
                                    <UserFrame videoRef={videoRef} />

                                    {isLoadingReplyInterview && (
                                        <div className="absolute z-10 flex items-center gap-2 px-3 py-1 text-white bg-yellow-600 rounded-full top-4 right-4">
                                            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                            <span>Processing your message...</span>
                                        </div>
                                    )}

                                    {currentAction === 'speaking' && (
                                        <div className="absolute z-10 flex items-center gap-2 px-3 py-1 text-white bg-blue-600 rounded-full top-4 right-4">
                                            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                            <span>AI Speaking...</span>
                                        </div>
                                    )}

                                    {isSpeaking && currentAction === 'listening' && (
                                        <div className="absolute z-10 flex items-center gap-2 px-3 py-1 text-white bg-red-600 rounded-full top-4 right-4">
                                            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                            <span>Recording voice...</span>
                                        </div>
                                    )}

                                    {isListening && !isSpeaking && currentAction === 'listening' && (
                                        <div className="absolute z-10 flex items-center gap-2 px-3 py-1 text-white bg-green-600 rounded-full top-4 right-4">
                                            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                            <span>Listening for your voice...</span>
                                        </div>
                                    )}

                                    {error && (
                                        <div className="absolute z-10 px-3 py-1 text-white bg-red-500 rounded-full top-4 right-4">
                                            {error}
                                        </div>
                                    )}

                                    {/* Voice visualization */}
                                    {isSpeaking && (
                                        <div className="absolute z-10 flex items-center justify-center gap-2 transform -translate-x-1/2 top-16 left-1/2">
                                            <div className="flex items-end h-10 gap-1">
                                                <div
                                                    className="w-1 bg-green-400 rounded-t animate-bounce"
                                                    style={{ height: '40%', animationDelay: '0ms' }}
                                                ></div>
                                                <div
                                                    className="w-1 bg-green-400 rounded-t animate-bounce"
                                                    style={{ height: '80%', animationDelay: '100ms' }}
                                                ></div>
                                                <div
                                                    className="w-1 bg-green-400 rounded-t animate-bounce"
                                                    style={{ height: '60%', animationDelay: '200ms' }}
                                                ></div>
                                                <div
                                                    className="w-1 bg-green-400 rounded-t animate-bounce"
                                                    style={{ height: '90%', animationDelay: '300ms' }}
                                                ></div>
                                                <div
                                                    className="w-1 bg-green-400 rounded-t animate-bounce"
                                                    style={{ height: '40%', animationDelay: '400ms' }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex w-full px-8 pt-4">
                                <div className="w-full">
                                    <div className="flex items-center justify-between font-medium text-[#ffffff]">
                                        <div className="flex gap-2">
                                            <span>{formatTime(interviewDuration)}</span>
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
                            <Dialog.Root
                                size={'lg'}
                                open={isOpenModalCloseInterview}
                                placement={'center'}
                                motionPreset="slide-in-bottom"
                            >
                                <Portal>
                                    <Dialog.Backdrop />
                                    <Dialog.Positioner>
                                        <Dialog.Content>
                                            <Dialog.Header className="p-4">
                                                {/* <Text className="mb-0 text-xl font-medium">Invite to project</Text> */}
                                            </Dialog.Header>
                                            <Dialog.Body>
                                                <Stack>
                                                    Are you sure you want to end the interview?
                                                    <Checkbox.Root
                                                        value={confirmSendData}
                                                        defaultChecked={false}
                                                        onChange={(e) => onChangeConfirmSendData(e)}
                                                    >
                                                        <Checkbox.HiddenInput />
                                                        <Checkbox.Control />
                                                        <Checkbox.Label>
                                                            Do you want to send the interview data to the founder?
                                                        </Checkbox.Label>
                                                    </Checkbox.Root>
                                                    This action will prohibit you from interviewing until you receive a
                                                    response from the founder
                                                </Stack>
                                            </Dialog.Body>
                                            <Dialog.Footer>
                                                <Dialog.ActionTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className="bg-[#f6f5f5] rounded-md"
                                                        onClick={() => setIsOpenModalCloseInterview(false)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Dialog.ActionTrigger>
                                                <Button
                                                    onClick={handleConfirmCloseInterview}
                                                    borderRadius={4}
                                                    className="bg-[#2f65b9] text-white text-sm rounded-md font-medium"
                                                    loadingText="Loading..."
                                                    spinnerPlacement="start"
                                                >
                                                    FINISH
                                                </Button>
                                            </Dialog.Footer>
                                            <Dialog.CloseTrigger asChild>
                                                <CloseButton
                                                    onClick={() => setIsOpenModalCloseInterview(false)}
                                                    size="sm"
                                                />
                                            </Dialog.CloseTrigger>
                                        </Dialog.Content>
                                    </Dialog.Positioner>
                                </Portal>
                            </Dialog.Root>
                        </Dialog.Body>
                        <Dialog.Footer className="w-full h-[100px] bg-[#201f24] flex items-center justify-center gap-4">
                            <div className="flex items-center justify-center gap-3">
                                <div className="flex justify-center items-center bg-[#42474a] p-3 rounded-full cursor-pointer">
                                    <IconlySetting size={25} color={'#ffffff'} />
                                </div>
                                <div
                                    className="flex items-center justify-center bg-[#ff2c20] p-3 rounded-full cursor-pointer"
                                    onClick={handleCloseInterview}
                                >
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
