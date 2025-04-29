import { Dialog, Portal } from '@chakra-ui/react'
import React, { useState, useEffect, useRef } from 'react'
import { IconlyCall, IconlyDanger2, IconlySetting, IconlyVoice } from 'components/UI/Iconly'
import { useSelector } from 'react-redux'
import AIFrame from './components/AIFrame'
import UserFrame from './components/UserFrame'

const DiaLogInterview = ({ videoRef }) => {
    // STATE
    const { isOpenModalInterview, currentAction, messages } = useSelector((state) => state.interview)
    const [isListening, setIsListening] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [error, setError] = useState(null)
    const [volume, setVolume] = useState(0)

    // REFS
    const audioContextRef = useRef(null)
    const analyserRef = useRef(null)
    const microphoneStreamRef = useRef(null)
    const speechTimeoutRef = useRef(null)
    const animationFrameRef = useRef(null)

    // VOICE DETECTION SETUP
    const setupVoiceDetection = async () => {
        try {
            // Reset any existing audio context
            if (audioContextRef.current) {
                await cleanupAudioContext()
            }

            // Create audio context
            const AudioContext = window.AudioContext || window.webkitAudioContext
            audioContextRef.current = new AudioContext()

            // Get microphone access
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            microphoneStreamRef.current = stream

            // Create analyzer
            const analyser = audioContextRef.current.createAnalyser()
            analyser.fftSize = 1024
            analyser.smoothingTimeConstant = 0.8
            analyserRef.current = analyser

            // Connect microphone to analyzer
            const source = audioContextRef.current.createMediaStreamSource(stream)
            source.connect(analyser)

            // Start monitoring
            setIsListening(true)
            monitorSound()
            console.log('Voice detection started')
        } catch (err) {
            console.error('Error accessing microphone:', err)
            setError('Microphone access denied')
            setIsListening(false)
        }
    }

    // CLEANUP FUNCTION
    const cleanupAudioContext = async () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
            animationFrameRef.current = null
        }

        if (speechTimeoutRef.current) {
            clearTimeout(speechTimeoutRef.current)
            speechTimeoutRef.current = null
        }

        if (microphoneStreamRef.current) {
            const tracks = microphoneStreamRef.current.getTracks()
            tracks.forEach((track) => track.stop())
            microphoneStreamRef.current = null
        }

        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            await audioContextRef.current.close()
            audioContextRef.current = null
        }

        analyserRef.current = null
        setIsListening(false)
        setIsSpeaking(false)
        setVolume(0)
        console.log('Voice detection stopped')
    }

    // MONITOR SOUND LEVELS
    const monitorSound = () => {
        if (!analyserRef.current || !isListening) return

        const dataArray = new Uint8Array(analyserRef.current.fftSize)
        analyserRef.current.getByteTimeDomainData(dataArray)

        // Calculate volume level
        let sum = 0
        for (let i = 0; i < dataArray.length; i++) {
            sum += Math.abs(dataArray[i] - 128)
        }
        const averageVolume = sum / dataArray.length
        console.log('Volume level:', averageVolume)
        setVolume(averageVolume)

        // Threshold for speech detection (adjust as needed)
        const threshold = 10

        if (averageVolume > threshold) {
            // User is speaking
            if (!isSpeaking) {
                setIsSpeaking(true)
                console.log('User is speaking')
            }

            // Reset timeout to detect end of speech
            if (speechTimeoutRef.current) {
                clearTimeout(speechTimeoutRef.current)
            }

            speechTimeoutRef.current = setTimeout(() => {
                setIsSpeaking(false)
                console.log('User stopped speaking')
            }, 1000) // Silence for 1 second means speaking ended
        }

        // Continue monitoring if still listening
        if (isListening) {
            animationFrameRef.current = requestAnimationFrame(monitorSound)
        }
    }

    // Toggle voice detection on/off
    const toggleVoiceDetection = () => {
        if (isListening) {
            cleanupAudioContext()
        } else {
            setupVoiceDetection()
        }
    }

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            cleanupAudioContext()
        }
    }, [])

    // Render voice meter
    const renderVoiceMeter = () => {
        if (!isListening) return null

        // Scale the volume for better visualization
        const scaledVolume = Math.min(volume * 3, 100)

        return (
            <div className="absolute w-2/3 max-w-md transform -translate-x-1/2 left-1/2 bottom-24">
                <div className="p-2 bg-gray-800 rounded-lg shadow-lg">
                    <div className="mb-1 text-xs text-center text-gray-300">
                        {isSpeaking ? 'Speaking Detected' : 'Voice Level'}
                    </div>
                    <div className="h-3 overflow-hidden bg-gray-700 rounded">
                        <div
                            className={`h-full transition-all duration-100 ${
                                isSpeaking ? 'bg-orange-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${scaledVolume}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                        <span>Low</span>
                        <span className="w-1 h-2 mx-2 bg-red-500" style={{ marginLeft: '10%' }}></span>
                        <span>High</span>
                    </div>
                </div>
            </div>
        )
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
                                    <AIFrame videoRef={videoRef} />
                                    <UserFrame videoRef={videoRef} />

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

                                    {/* Voice meter */}
                                    {renderVoiceMeter()}
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
