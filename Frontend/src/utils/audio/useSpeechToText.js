import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { convertSpeechToText } from 'api/interview'
import { replyInterview } from 'api/interview'

/**
 * Custom hook for handling speech-to-text recording functionality with automatic voice detection
 * @returns {Object} Speech-to-text recording state and functions
 */
export const useSpeechToText = (options = {}) => {
    const dispatch = useDispatch()

    // Get the current action from the interview state (speaking/listening)
    const { currentAction, conversation } = useSelector((state) => state.interview)
    const [isRecording, setIsRecording] = useState(false)
    const [recordingTime, setRecordingTime] = useState(0)
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState(null)
    const [isListening, setIsListening] = useState(false)
    const [speechDetected, setSpeechDetected] = useState(false)

    // Voice activity detection settings with more lenient defaults
    const {
        autoDetect = false,
        silenceThreshold = -50, // More sensitive threshold (was -45)
        silenceTimeout = 2000, // Time of silence before stopping (ms)
        minRecordingTime = 1000, // Reduced minimum recording time
        minSpeechDuration = 300, // Reduced minimum speech duration
        cooldownPeriod = 1500, // Cooldown period (ms) after processing
        consecutiveVoiceFrames = 5, // Reduced frames required (was 8)
        debugMode = true, // Enable debug mode
    } = options || {}

    // For debugging current audio level
    const [currentVolumeLevel, setCurrentVolumeLevel] = useState(-100)
    const frameCountRef = useRef(0)

    const mediaRecorderRef = useRef(null)
    const audioChunksRef = useRef([])
    const timerRef = useRef(null)
    const silenceTimerRef = useRef(null)
    const audioContextRef = useRef(null)
    const analyserRef = useRef(null)
    const microphoneStreamRef = useRef(null)
    const recordingStartTimeRef = useRef(null)
    const processingCooldownRef = useRef(false)
    const voiceDetectionCountRef = useRef(0)
    const silenceDetectionCountRef = useRef(0)
    const lastApiCallTimeRef = useRef(0)
    const lastRecordingTimeRef = useRef(0)
    const debugTimerRef = useRef(null)

    // Log key state changes in debug mode
    useEffect(() => {
        if (debugMode) {
            console.log(
                `[Voice Debug] Current action: ${currentAction}, Listening: ${isListening}, Recording: ${isRecording}, Processing: ${isProcessing}`
            )
            console.log(
                `[Voice Debug] Speech detected: ${speechDetected}, Voice frames: ${voiceDetectionCountRef.current}, Silence frames: ${silenceDetectionCountRef.current}`
            )
        }
    }, [debugMode, currentAction, isListening, isRecording, isProcessing, speechDetected])

    // Start monitoring for voice activity
    const startVoiceDetection = async () => {
        try {
            setError(null)

            // If already listening, don't start again
            if (isListening) {
                if (debugMode) console.log('[Voice Debug] Already listening, not starting again')
                return true
            }

            if (debugMode) console.log('[Voice Debug] Starting voice detection...')

            // Request audio permissions
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            microphoneStreamRef.current = stream

            // Set up audio analysis
            const audioContext = new (window.AudioContext || window.webkitAudioContext)()
            audioContextRef.current = audioContext

            const analyser = audioContext.createAnalyser()
            analyserRef.current = analyser
            analyser.fftSize = 256
            analyser.smoothingTimeConstant = 0.8

            const microphone = audioContext.createMediaStreamSource(stream)
            microphone.connect(analyser)

            // Reset counters
            voiceDetectionCountRef.current = 0
            silenceDetectionCountRef.current = 0

            // Start monitoring audio levels
            setIsListening(true)
            detectAudio()

            // Debug audio levels periodically if in debug mode
            if (debugMode) {
                if (debugTimerRef.current) clearInterval(debugTimerRef.current)
                debugTimerRef.current = setInterval(() => {
                    console.log(
                        `[Voice Debug] Current volume: ${currentVolumeLevel}dB, Threshold: ${silenceThreshold}dB, Voice frames: ${voiceDetectionCountRef.current}/${consecutiveVoiceFrames}`
                    )
                }, 2000)
            }

            return true
        } catch (error) {
            console.error('[Voice Debug] Error starting voice detection:', error)
            setError(error.message || 'Failed to access microphone')
            return false
        }
    }

    // Continuously check audio levels to detect speech
    const detectAudio = () => {
        if (!analyserRef.current || !isListening) return

        frameCountRef.current += 1

        // Don't detect speech if AI is currently speaking
        if (currentAction === 'speaking') {
            if (frameCountRef.current % 60 === 0 && debugMode) {
                // Log every ~1 second
                console.log('[Voice Debug] AI is speaking, pausing detection')
            }
            requestAnimationFrame(detectAudio)
            return
        }

        const bufferLength = analyserRef.current.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        analyserRef.current.getByteFrequencyData(dataArray)

        // Calculate volume level (simple average of frequency data)
        let sum = 0
        for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i]
        }
        const average = sum / bufferLength

        // Convert to decibels (approximate)
        const volume = average === 0 ? -100 : 20 * Math.log10(average / 255)
        setCurrentVolumeLevel(volume)

        // Detect if speech is happening
        const isSpeaking = volume > silenceThreshold

        // Apply debounce logic to avoid quick toggles due to borderline audio levels
        if (isSpeaking) {
            voiceDetectionCountRef.current += 1
            silenceDetectionCountRef.current = 0
        } else {
            silenceDetectionCountRef.current += 1
            voiceDetectionCountRef.current = Math.max(0, voiceDetectionCountRef.current - 1)
        }

        const isSpeakingDebounced = voiceDetectionCountRef.current >= consecutiveVoiceFrames
        const isSilentDebounced = silenceDetectionCountRef.current >= consecutiveVoiceFrames * 2

        // Periodically log detection state in debug mode
        if (debugMode && frameCountRef.current % 30 === 0) {
            console.log(
                `[Voice Debug] Volume: ${volume.toFixed(2)}dB, Speaking: ${isSpeaking}, Voice frames: ${
                    voiceDetectionCountRef.current
                }/${consecutiveVoiceFrames}, Silent frames: ${silenceDetectionCountRef.current}`
            )
        }

        // Handle speech detection state with improved logic
        if (isSpeakingDebounced && !speechDetected && !isRecording && !processingCooldownRef.current) {
            // Check sufficient time passed since last recording
            const timeSinceLastRecording = Date.now() - lastRecordingTimeRef.current

            if (timeSinceLastRecording > cooldownPeriod) {
                // Speech started with debounce
                if (debugMode) console.log('[Voice Debug] Speech detected! Starting recording...')
                setSpeechDetected(true)
                startRecording()
                clearTimeout(silenceTimerRef.current)
            }
        } else if (isSpeakingDebounced && speechDetected && isRecording) {
            // Speech continuing
            clearTimeout(silenceTimerRef.current)
        } else if (isSilentDebounced && speechDetected && isRecording) {
            // Potential silence after speech
            // Only stop if we've been recording for at least minRecordingTime
            const recordingDuration = Date.now() - recordingStartTimeRef.current

            if (recordingDuration > minRecordingTime) {
                if (!silenceTimerRef.current) {
                    if (debugMode) console.log('[Voice Debug] Silence detected, waiting to stop recording...')
                    silenceTimerRef.current = setTimeout(() => {
                        if (debugMode) console.log('[Voice Debug] Stopping recording after silence')
                        stopRecording()
                        setSpeechDetected(false)
                    }, silenceTimeout)
                }
            }
        }

        // Continue detecting only if we're still listening
        if (isListening) {
            requestAnimationFrame(detectAudio)
        }
    }

    // Stop voice detection
    const stopVoiceDetection = () => {
        if (!isListening) return

        if (debugMode) console.log('[Voice Debug] Stopping voice detection')
        setIsListening(false)

        // Clean up debug timer if it exists
        if (debugTimerRef.current) {
            clearInterval(debugTimerRef.current)
            debugTimerRef.current = null
        }

        // Clean up audio context and analyzer
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close().catch(console.error)
        }

        // Close microphone stream
        if (microphoneStreamRef.current) {
            microphoneStreamRef.current.getTracks().forEach((track) => track.stop())
        }

        // Clear silence timer
        if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current)
            silenceTimerRef.current = null
        }

        // If we were recording, stop it
        if (isRecording) {
            stopRecording()
        }

        // Reset state
        audioContextRef.current = null
        analyserRef.current = null
        microphoneStreamRef.current = null
    }

    // Start recording audio
    const startRecording = async () => {
        try {
            setError(null)

            // Use existing stream if we have one from voice detection
            const stream = microphoneStreamRef.current || (await navigator.mediaDevices.getUserMedia({ audio: true }))

            const mediaRecorder = new MediaRecorder(stream)
            mediaRecorderRef.current = mediaRecorder
            audioChunksRef.current = []
            recordingStartTimeRef.current = Date.now()

            // Set up event handlers
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data)
                    if (debugMode) console.log(`[Voice Debug] Audio chunk added: ${event.data.size} bytes`)
                }
            }

            mediaRecorder.onstop = handleAudioStop

            // Start the media recorder
            mediaRecorder.start()
            setIsRecording(true)

            // Start recording timer
            startTimer()

            if (debugMode) console.log('[Voice Debug] Recording started')
            return true
        } catch (error) {
            console.error('[Voice Debug] Error starting recording:', error)
            setError(error.message || 'Failed to start recording')
            return false
        }
    }

    // Stop recording audio
    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            if (debugMode) console.log('[Voice Debug] Recording stopping...')
            mediaRecorderRef.current.stop()

            // Don't stop tracks if we're still voice detecting
            if (!isListening) {
                mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
            }
        } else {
            if (debugMode) console.log('[Voice Debug] No active media recorder to stop')
        }

        // Record time of last recording completion
        lastRecordingTimeRef.current = Date.now()

        // Stop the recording timer
        stopTimer()
        setIsRecording(false)
    }

    // Handle the recorded audio when stopped
    const handleAudioStop = async () => {
        // Only process if we have audio chunks
        if (audioChunksRef.current.length === 0) {
            if (debugMode) console.log('[Voice Debug] No audio chunks to process')
            return
        }

        const recordingDuration = Date.now() - recordingStartTimeRef.current

        // Don't process recordings that are too short (likely noise)
        if (recordingDuration < minSpeechDuration) {
            console.log(`[Voice Debug] Recording too short (${recordingDuration}ms), skipping processing`)
            return
        }

        // Set cooldown flag to prevent immediate recording
        processingCooldownRef.current = true
        setIsProcessing(true)

        try {
            // Create audio blob from chunks
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
            if (debugMode) console.log(`[Voice Debug] Audio blob created: ${audioBlob.size} bytes`)

            // Create a file from the blob
            const audioFile = new File([audioBlob], `speech-${Date.now()}.webm`, {
                type: 'audio/webm',
            })

            if (debugMode) console.log('[Voice Debug] Processing speech to text...')

            // Call the convertSpeechToText API with the audio file
            try {
                const result = await dispatch(convertSpeechToText(audioFile)).unwrap()
                if (debugMode) console.log(`[Voice Debug] Transcription result:`, result)

                // Send the transcribed text to the interview API
                if (result && result.transcription && conversation?._id) {
                    if (debugMode) console.log('[Voice Debug] Sending reply with transcription:', result.transcription)
                    await dispatch(
                        replyInterview({
                            conversation_id: conversation._id,
                            content: result.transcription,
                            messageType: 'text',
                        })
                    )
                } else {
                    if (debugMode) console.log('[Voice Debug] No valid transcription or conversation ID')
                }
            } catch (apiError) {
                console.error('[Voice Debug] API error:', apiError)
                setError('API error: ' + (apiError.message || 'Unknown error'))
            }
        } catch (error) {
            setError('Failed to convert speech to text')
            console.error('[Voice Debug] Speech to text conversion error:', error)
        } finally {
            setIsProcessing(false)

            // Set a cooldown period after processing to prevent immediate re-recording
            setTimeout(() => {
                processingCooldownRef.current = false
                if (debugMode) console.log('[Voice Debug] Cooldown period ended')
            }, cooldownPeriod)
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

    // Toggle auto voice detection mode
    const toggleVoiceDetection = async () => {
        if (isListening) {
            stopVoiceDetection()
        } else {
            await startVoiceDetection()
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

    // Toggle listening based on currentAction changes
    useEffect(() => {
        if (debugMode) console.log(`[Voice Debug] Current action changed to: ${currentAction}`)

        if (currentAction === 'listening' && autoDetect && !isListening) {
            // When AI finishes speaking, start listening for user input
            if (debugMode) console.log('[Voice Debug] AI finished speaking, starting voice detection')
            startVoiceDetection()
        } else if (currentAction === 'speaking' && isListening && !isRecording) {
            // When AI starts speaking and we're not in the middle of recording,
            // temporarily pause the voice detection
            if (debugMode) console.log('[Voice Debug] AI started speaking, pausing detection')
            voiceDetectionCountRef.current = 0
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentAction, autoDetect, isListening, isRecording])

    // Start auto voice detection if enabled
    useEffect(() => {
        if (autoDetect && currentAction === 'listening') {
            if (debugMode)
                console.log('[Voice Debug] Auto-detect enabled and listening state, starting voice detection')
            startVoiceDetection()
        }

        // Cleanup on unmount
        return () => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                mediaRecorderRef.current.stop()
                mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
            }
            stopVoiceDetection()
            stopTimer()
            if (debugTimerRef.current) {
                clearInterval(debugTimerRef.current)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoDetect, currentAction])

    return {
        isRecording,
        recordingTime,
        isProcessing,
        error,
        isListening,
        speechDetected,
        currentAction,
        currentVolumeLevel,
        silenceThreshold,
        startRecording,
        stopRecording,
        toggleRecording,
        startVoiceDetection,
        stopVoiceDetection,
        toggleVoiceDetection,
        formatTime,
    }
}

export default useSpeechToText
