/**
 * Voice Detection Utility
 *
 * A reusable utility for detecting when a user is speaking using the Web Audio API.
 * This module provides functions to start/stop voice detection and callbacks for
 * when speech starts and stops.
 */

class VoiceDetector {
    constructor(options = {}) {
        this.options = {
            threshold: 10, // Volume threshold to detect speech
            silenceDelay: 1000, // Time of silence to determine speech has ended (ms)
            sampleRate: 44100, // Audio sample rate
            audioFormat: 'audio/wav', // Try WAV format first if supported
            bitsPerSample: 16, // Bit depth for WAV encoding
            ...options,
        }

        this.audioContext = null
        this.analyser = null
        this.microphoneStream = null
        this.isListening = false
        this.isSpeaking = false
        this.speechTimeout = null

        // Audio recording related
        this.audioProcessor = null
        this.recordedChunks = []
        this.mediaRecorder = null
        this.isRecording = false

        // Callbacks
        this.onSpeechStart = options.onSpeechStart || (() => console.log('User is speaking'))
        this.onSpeechEnd = options.onSpeechEnd || (() => console.log('User stopped speaking'))
        this.onError = options.onError || ((error) => console.error('Voice detection error:', error))
        this.onListeningStart = options.onListeningStart || (() => console.log('Voice detection started'))
        this.onListeningEnd = options.onListeningEnd || (() => console.log('Voice detection stopped'))
        this.onAudioReady = options.onAudioReady || ((blob) => console.log('Audio recording ready', blob))
    }

    /**
     * Start voice detection
     * @returns {Promise<boolean>} True if successfully started
     */
    async start() {
        try {
            // Clean up any existing audio context
            await this.stop()

            // Create audio context
            const AudioContext = window.AudioContext || window.webkitAudioContext
            this.audioContext = new AudioContext({
                sampleRate: this.options.sampleRate,
            })

            // Get microphone access
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            this.microphoneStream = stream

            // Create analyzer
            const analyser = this.audioContext.createAnalyser()
            analyser.fftSize = 1024
            analyser.smoothingTimeConstant = 0.8
            this.analyser = analyser

            // Connect microphone to analyzer
            const source = this.audioContext.createMediaStreamSource(stream)
            source.connect(analyser)

            // Set up both direct recording (for WAV) and MediaRecorder as fallback
            this.setupDirectRecording(source)

            // Setup MediaRecorder as fallback
            try {
                // Try WAV first, then WebM
                const mimeTypes = ['audio/wav', 'audio/webm']
                let selectedMimeType = null

                // Find a supported format
                for (const mimeType of mimeTypes) {
                    if (MediaRecorder.isTypeSupported(mimeType)) {
                        selectedMimeType = mimeType
                        break
                    }
                }

                if (selectedMimeType) {
                    this.mediaRecorder = new MediaRecorder(stream, { mimeType: selectedMimeType })
                    this.options.audioFormat = selectedMimeType
                } else {
                    // If no preferred format is supported, use browser default
                    this.mediaRecorder = new MediaRecorder(stream)
                    this.options.audioFormat = this.mediaRecorder.mimeType
                }
            } catch (err) {
                console.warn('Error setting up MediaRecorder:', err)
                this.mediaRecorder = new MediaRecorder(stream)
                this.options.audioFormat = this.mediaRecorder.mimeType
            }

            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.recordedChunks.push(event.data)
                }
            }

            this.mediaRecorder.onstop = async () => {
                // Create audio blob when recording stops
                if (this.recordedChunks.length > 0) {
                    const audioBlob = new Blob(this.recordedChunks, { type: this.options.audioFormat })

                    // Convert to WAV if it's not already WAV format
                    const wavBlob = await this.createWavFile(audioBlob)

                    // Call the callback with the WAV blob
                    this.onAudioReady(wavBlob)

                    // Clear the chunks for the next recording
                    this.recordedChunks = []
                }
            }

            // Start monitoring
            this.isListening = true
            this.onListeningStart()
            this.monitorSound()

            return true
        } catch (err) {
            this.onError(err)
            this.isListening = false
            return false
        }
    }

    /**
     * Stop voice detection
     * @returns {Promise<void>}
     */
    async stop() {
        // Stop recording if active
        this.stopRecording()

        if (this.speechTimeout) {
            clearTimeout(this.speechTimeout)
            this.speechTimeout = null
        }

        if (this.microphoneStream) {
            const tracks = this.microphoneStream.getTracks()
            tracks.forEach((track) => track.stop())
            this.microphoneStream = null
        }

        if (this.audioContext && this.audioContext.state !== 'closed') {
            await this.audioContext.close()
            this.audioContext = null
        }

        this.analyser = null

        if (this.isListening) {
            this.isListening = false
            this.isSpeaking = false
            this.onListeningEnd()
        }
    }

    /**
     * Start recording audio
     */
    startRecording() {
        if (!this.isRecording && this.mediaRecorder && this.mediaRecorder.state !== 'recording') {
            this.recordedChunks = []
            this.mediaRecorder.start()
            this.isRecording = true
        }
    }

    /**
     * Stop recording audio
     */
    stopRecording() {
        if (this.isRecording && this.mediaRecorder && this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.stop()
            this.isRecording = false
        }
    }

    /**
     * Monitor sound levels and detect speech
     */
    monitorSound() {
        if (!this.analyser || !this.isListening) return

        const dataArray = new Uint8Array(this.analyser.fftSize)
        this.analyser.getByteTimeDomainData(dataArray)

        // Calculate volume level
        let sum = 0
        for (let i = 0; i < dataArray.length; i++) {
            sum += Math.abs(dataArray[i] - 128)
        }
        const averageVolume = sum / dataArray.length

        // Check if volume is above threshold
        if (averageVolume > this.options.threshold) {
            // User is speaking
            if (!this.isSpeaking) {
                this.isSpeaking = true
                // Start recording when speech is detected
                this.startRecording()
                this.onSpeechStart()
            }

            // Reset timeout to detect end of speech
            if (this.speechTimeout) {
                clearTimeout(this.speechTimeout)
            }

            this.speechTimeout = setTimeout(() => {
                this.isSpeaking = false
                // Stop recording when speech ends
                this.stopRecording()
                this.onSpeechEnd()
            }, this.options.silenceDelay)
        }

        // Continue monitoring if still listening
        if (this.isListening) {
            requestAnimationFrame(this.monitorSound.bind(this))
        }
    }

    /**
     * Check if currently listening
     * @returns {boolean}
     */
    isActive() {
        return this.isListening
    }

    /**
     * Check if speech is detected
     * @returns {boolean}
     */
    isSpeechDetected() {
        return this.isSpeaking
    }

    /**
     * Set speech detection threshold
     * @param {number} threshold - Volume threshold level (0-100)
     */
    setThreshold(threshold) {
        this.options.threshold = threshold
    }

    /**
     * Create WAV file from audio data
     * @param {Blob} audioBlob - The recorded audio blob
     * @returns {Promise<Blob>} - A WAV file blob
     */
    async createWavFile(audioBlob) {
        // If we're already recording in WAV format, just return the blob
        if (this.options.audioFormat === 'audio/wav') {
            return audioBlob
        }

        // For non-WAV formats, we either need to:
        // 1. Accept the actual format (WebM/Ogg) as is, or
        // 2. Convert to WAV format using AudioContext

        try {
            // Method to convert WebM/Ogg to WAV using AudioContext
            const arrayBuffer = await audioBlob.arrayBuffer()
            const audioContext = new (window.AudioContext || window.webkitAudioContext)()
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

            // Create WAV file
            const wavBuffer = this.audioBufferToWav(audioBuffer)
            const wavBlob = new Blob([wavBuffer], { type: 'audio/wav' })

            // Close the audio context
            audioContext.close()

            return wavBlob
        } catch (err) {
            console.warn('Error converting audio to WAV format:', err)
            // Return original format with the correct MIME type if conversion fails
            return new Blob([audioBlob], { type: this.options.audioFormat })
        }
    }

    /**
     * Convert AudioBuffer to WAV format
     * @param {AudioBuffer} audioBuffer - The audio buffer to convert
     * @returns {ArrayBuffer} - WAV file data as ArrayBuffer
     */
    audioBufferToWav(audioBuffer) {
        const numChannels = audioBuffer.numberOfChannels
        const sampleRate = audioBuffer.sampleRate
        const format = 1 // PCM format
        const bitDepth = 16

        // Extract raw audio data
        const channelData = []
        for (let channel = 0; channel < numChannels; channel++) {
            channelData.push(audioBuffer.getChannelData(channel))
        }

        // Interleave the channel data and convert to 16-bit PCM
        const interleaved = this.interleaveChannels(channelData, audioBuffer.length)
        const dataView = this.encodeWav(interleaved, format, sampleRate, numChannels, bitDepth)

        return dataView.buffer
    }

    /**
     * Interleave multiple audio channels into a single buffer
     * @param {Array<Float32Array>} channelData - Array of channel data
     * @param {number} frameCount - Number of frames
     * @returns {Float32Array} - Interleaved audio data
     */
    interleaveChannels(channelData, frameCount) {
        const numChannels = channelData.length
        const result = new Float32Array(frameCount * numChannels)

        for (let i = 0; i < frameCount; i++) {
            for (let channel = 0; channel < numChannels; channel++) {
                result[i * numChannels + channel] = channelData[channel][i]
            }
        }

        return result
    }

    /**
     * Encode audio data to WAV format
     * @param {Float32Array} samples - Interleaved audio samples
     * @param {number} format - Audio format (1 for PCM)
     * @param {number} sampleRate - Sample rate
     * @param {number} numChannels - Number of channels
     * @param {number} bitDepth - Bit depth
     * @returns {DataView} - WAV file as DataView
     */
    encodeWav(samples, format, sampleRate, numChannels, bitDepth) {
        const bytesPerSample = bitDepth / 8
        const blockAlign = numChannels * bytesPerSample

        // Create buffer with appropriate size for the WAV file
        const dataLength = samples.length * bytesPerSample
        const buffer = new ArrayBuffer(44 + dataLength)
        const view = new DataView(buffer)

        // Write WAV header
        // "RIFF" chunk descriptor
        this.writeString(view, 0, 'RIFF')
        view.setUint32(4, 36 + dataLength, true)
        this.writeString(view, 8, 'WAVE')

        // "fmt " sub-chunk
        this.writeString(view, 12, 'fmt ')
        view.setUint32(16, 16, true) // fmt chunk length
        view.setUint16(20, format, true) // format (PCM)
        view.setUint16(22, numChannels, true) // channels
        view.setUint32(24, sampleRate, true) // sample rate
        view.setUint32(28, sampleRate * blockAlign, true) // byte rate
        view.setUint16(32, blockAlign, true) // block align
        view.setUint16(34, bitDepth, true) // bits per sample

        // "data" sub-chunk
        this.writeString(view, 36, 'data')
        view.setUint32(40, dataLength, true) // data chunk length

        // Write PCM samples
        this.floatTo16BitPCM(view, 44, samples)

        return view
    }

    /**
     * Write a string to a DataView
     * @param {DataView} view - DataView to write to
     * @param {number} offset - Offset in the DataView
     * @param {string} string - String to write
     */
    writeString(view, offset, string) {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i))
        }
    }

    /**
     * Convert Float32 array to 16-bit PCM
     * @param {DataView} view - DataView to write to
     * @param {number} offset - Offset in the DataView
     * @param {Float32Array} input - Input audio data
     */
    floatTo16BitPCM(view, offset, input) {
        for (let i = 0; i < input.length; i++, offset += 2) {
            const s = Math.max(-1, Math.min(1, input[i]))
            view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true)
        }
    }

    /**
     * Set up direct recording using ScriptProcessorNode for raw PCM capture
     * This is more reliable for WAV creation than using MediaRecorder
     * @param {MediaStreamAudioSourceNode} source - The audio source
     */
    setupDirectRecording(source) {
        // Create a ScriptProcessorNode to capture raw audio data
        // Note: ScriptProcessorNode is deprecated but still widely supported
        // The replacement (AudioWorkletNode) is not as widely supported yet
        const bufferSize = 4096
        this.audioProcessor = this.audioContext.createScriptProcessor(
            bufferSize,
            1, // Input channels: mono
            1 // Output channels: mono
        )

        // Buffer to store raw PCM data (Float32Array)
        this.rawAudioChunks = []

        // Process audio data
        this.audioProcessor.onaudioprocess = (e) => {
            // Only save data if actually recording
            if (this.isRecording) {
                // Get raw audio data from input channel
                const inputData = e.inputBuffer.getChannelData(0).slice()
                this.rawAudioChunks.push(inputData)
            }
        }

        // Connect the audio graph
        source.connect(this.audioProcessor)
        this.audioProcessor.connect(this.audioContext.destination)
    }
}

/**
 * Create a simple voice detector that logs to the console when speaking is detected
 * @returns {VoiceDetector} A configured voice detector instance
 */
export const createSimpleVoiceDetector = () => {
    return new VoiceDetector()
}

/**
 * Create a voice detector with custom callbacks
 * @param {Object} options - Configuration options
 * @param {Function} options.onSpeechStart - Called when speech starts
 * @param {Function} options.onSpeechEnd - Called when speech ends
 * @param {Function} options.onError - Called on error
 * @param {Function} options.onAudioReady - Called when audio recording is ready with the audio blob
 * @param {number} options.threshold - Volume threshold (1-100, default: 10)
 * @param {number} options.silenceDelay - Silence delay in ms (default: 1000)
 * @param {number} options.sampleRate - Audio sample rate (default: 44100)
 * @param {string} options.audioFormat - Audio format MIME type (default: 'audio/webm')
 * @returns {VoiceDetector} A configured voice detector instance
 */
export const createVoiceDetector = (options) => {
    return new VoiceDetector(options)
}

export default VoiceDetector
