import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { convertSpeechToText } from 'api/interview'

/**
 * Custom hook for handling speech-to-text recording functionality
 * @returns {Object} Speech-to-text recording state and functions
 */
export const useSpeechToText = () => {
    const dispatch = useDispatch()
    const [isRecording, setIsRecording] = useState(false)
    const [recordingTime, setRecordingTime] = useState(0)
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState(null)

    const mediaRecorderRef = useRef(null)
    const audioChunksRef = useRef([])
    const timerRef = useRef(null)

    // Start recording audio
    const startRecording = async () => {
        try {
            setError(null)
            // Request audio permissions
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const mediaRecorder = new MediaRecorder(stream)
            mediaRecorderRef.current = mediaRecorder
            audioChunksRef.current = []

            // Set up event handlers
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data)
                }
            }

            mediaRecorder.onstop = handleAudioStop

            // Start the media recorder
            mediaRecorder.start()
            setIsRecording(true)

            // Start recording timer
            startTimer()

            return true
        } catch (error) {
            console.error('Error starting recording:', error)
            setError(error.message || 'Failed to start recording')
            return false
        }
    }

    // Stop recording audio
    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop()

            // Stop all audio tracks
            mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
        }

        // Stop the recording timer
        stopTimer()
        setIsRecording(false)
    }

    // Handle the recorded audio when stopped
    const handleAudioStop = async () => {
        setIsProcessing(true)

        // Create audio blob from chunks
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })

        // Create a file from the blob
        const audioFile = new File([audioBlob], `speech-${Date.now()}.webm`, {
            type: 'audio/webm',
        })

        try {
            // Call the convertSpeechToText API with the audio file
            await dispatch(convertSpeechToText(audioFile))
        } catch (error) {
            setError('Failed to convert speech to text')
            console.error('Speech to text conversion error:', error)
        } finally {
            setIsProcessing(false)
        }
    }

    // Toggle recording state
    const toggleRecording = async () => {
        if (isRecording) {
            stopRecording()
        } else {
            await startRecording()
        }
    }

    // Timer functions for recording duration
    const startTimer = () => {
        setRecordingTime(0)
        timerRef.current = setInterval(() => {
            setRecordingTime((prevTime) => prevTime + 1)
        }, 1000)
    }

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }
    }

    // Format time for display (MM:SS)
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                mediaRecorderRef.current.stop()
                mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
            }
            stopTimer()
        }
    }, [])

    return {
        isRecording,
        recordingTime,
        isProcessing,
        error,
        startRecording,
        stopRecording,
        toggleRecording,
        formatTime,
    }
}

export default useSpeechToText
