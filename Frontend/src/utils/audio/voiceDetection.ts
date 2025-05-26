/**
 * Voice Detection Utility
 *
 * A reusable utility for detecting when a user is speaking using the Web Audio API.
 * This module provides functions to start/stop voice detection and callbacks for
 * when speech starts and stops.
 */

// Type definitions
interface VoiceDetectorOptions {
    threshold?: number
    silenceDelay?: number
    sampleRate?: number
    audioFormat?: string
    bitsPerSample?: number
    onSpeechStart?: () => void
    onSpeechEnd?: () => void
    onError?: (error: Error | Event) => void
    onListeningStart?: () => void
    onListeningEnd?: () => void
    onAudioReady?: (blob: Blob) => void
}

// Extend the Window interface to include webkit prefixed AudioContext
declare global {
    interface Window {
        webkitAudioContext?: typeof AudioContext
    }
}

class VoiceDetector {
    private options: Required<VoiceDetectorOptions>
    private audioContext: AudioContext | null = null
    private analyser: AnalyserNode | null = null
    private microphoneStream: MediaStream | null = null
    private isListening: boolean = false
    private isSpeaking: boolean = false
    private speechTimeout: NodeJS.Timeout | null = null
    private audioProcessor: ScriptProcessorNode | null = null
    private recordedChunks: Blob[] = []
    private mediaRecorder: MediaRecorder | null = null
    private isRecording: boolean = false
    private rawAudioChunks: Float32Array[] = []

    // Callbacks
    private onSpeechStart: () => void
    private onSpeechEnd: () => void
    private onError: (error: Error | Event) => void
    private onListeningStart: () => void
    private onListeningEnd: () => void
    private onAudioReady: (blob: Blob) => void

    constructor(options: VoiceDetectorOptions = {}) {
        this.options = {
            threshold: 10, // Volume threshold to detect speech
            silenceDelay: 1000, // Time of silence to determine speech has ended (ms)
            sampleRate: 44100, // Audio sample rate
            audioFormat: 'audio/wav', // Try WAV format first if supported
            bitsPerSample: 16, // Bit depth for WAV encoding
            ...options,
        } as Required<VoiceDetectorOptions>

        // Callbacks
        this.onSpeechStart = options.onSpeechStart || (() => console.log('User is speaking'))
        this.onSpeechEnd = options.onSpeechEnd || (() => console.log('User stopped speaking'))
        this.onError = options.onError || ((error: Error | Event) => console.error('Voice detection error:', error))
        this.onListeningStart = options.onListeningStart || (() => console.log('Voice detection started'))
        this.onListeningEnd = options.onListeningEnd || (() => console.log('Voice detection stopped'))
        this.onAudioReady = options.onAudioReady || ((blob: Blob) => console.log('Audio recording ready', blob))
    }

    /**
     * Start voice detection
     * @returns Promise that resolves to true if successfully started
     */
    async start(): Promise<boolean> {
        try {
            // Clean up any existing audio context
            await this.stop()

            // Create audio context
            const AudioContext = window.AudioContext || window.webkitAudioContext
            if (!AudioContext) {
                throw new Error('Web Audio API is not supported in this browser')
            }

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
                let selectedMimeType: string | null = null

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

            this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
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
            this.onError(err as Error)
            this.isListening = false
            return false
        }
    }

    /**
     * Stop voice detection
     */
    async stop(): Promise<void> {
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
    startRecording(): void {
        if (!this.isRecording && this.mediaRecorder && this.mediaRecorder.state !== 'recording') {
            this.recordedChunks = []
            this.mediaRecorder.start()
            this.isRecording = true
        }
    }

    /**
     * Stop recording audio
     */
    stopRecording(): void {
        if (this.isRecording && this.mediaRecorder && this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.stop()
            this.isRecording = false
        }
    }

    /**
     * Monitor sound levels and detect speech
     */
    private monitorSound(): void {
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
     */
    isActive(): boolean {
        return this.isListening
    }

    /**
     * Check if speech is detected
     */
    isSpeechDetected(): boolean {
        return this.isSpeaking
    }

    /**
     * Set speech detection threshold
     * @param threshold - Volume threshold level (0-100)
     */
    setThreshold(threshold: number): void {
        this.options.threshold = threshold
    }

    /**
     * Create WAV file from audio data
     * @param audioBlob - The recorded audio blob
     * @returns A WAV file blob
     */
    async createWavFile(audioBlob: Blob): Promise<Blob> {
        // If we're already recording in WAV format, just return the blob
        if (this.options.audioFormat === 'audio/wav') {
            return audioBlob
        }

        try {
            // Method to convert WebM/Ogg to WAV using AudioContext
            const arrayBuffer = await audioBlob.arrayBuffer()
            const AudioContext = window.AudioContext || window.webkitAudioContext
            if (!AudioContext) {
                throw new Error('Web Audio API is not supported')
            }
            
            const audioContext = new AudioContext()
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
     * @param audioBuffer - The audio buffer to convert
     * @returns WAV file data as ArrayBuffer
     */
    private audioBufferToWav(audioBuffer: AudioBuffer): ArrayBuffer {
        const numChannels = audioBuffer.numberOfChannels
        const sampleRate = audioBuffer.sampleRate
        const format = 1 // PCM format
        const bitDepth = 16

        // Extract raw audio data
        const channelData: Float32Array[] = []
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
     * @param channelData - Array of channel data
     * @param frameCount - Number of frames
     * @returns Interleaved audio data
     */
    private interleaveChannels(channelData: Float32Array[], frameCount: number): Float32Array {
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
     * @param samples - Interleaved audio samples
     * @param format - Audio format (1 for PCM)
     * @param sampleRate - Sample rate
     * @param numChannels - Number of channels
     * @param bitDepth - Bit depth
     * @returns WAV file as DataView
     */
    private encodeWav(
        samples: Float32Array, 
        format: number, 
        sampleRate: number, 
        numChannels: number, 
        bitDepth: number
    ): DataView {
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
     * @param view - DataView to write to
     * @param offset - Offset in the DataView
     * @param string - String to write
     */
    private writeString(view: DataView, offset: number, string: string): void {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i))
        }
    }

    /**
     * Convert Float32 array to 16-bit PCM
     * @param view - DataView to write to
     * @param offset - Offset in the DataView
     * @param input - Input audio data
     */
    private floatTo16BitPCM(view: DataView, offset: number, input: Float32Array): void {
        for (let i = 0; i < input.length; i++, offset += 2) {
            const s = Math.max(-1, Math.min(1, input[i]))
            view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true)
        }
    }

    /**
     * Set up direct recording using ScriptProcessorNode for raw PCM capture
     * This is more reliable for WAV creation than using MediaRecorder
     * @param source - The audio source
     */
    private setupDirectRecording(source: MediaStreamAudioSourceNode): void {
        if (!this.audioContext) return

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
        this.audioProcessor.onaudioprocess = (e: AudioProcessingEvent) => {
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
 * @returns A configured voice detector instance
 */
export const createSimpleVoiceDetector = (): VoiceDetector => {
    return new VoiceDetector()
}

/**
 * Create a voice detector with custom callbacks
 * @param options - Configuration options
 * @returns A configured voice detector instance
 */
export const createVoiceDetector = (options: VoiceDetectorOptions): VoiceDetector => {
    return new VoiceDetector(options)
}

export default VoiceDetector
