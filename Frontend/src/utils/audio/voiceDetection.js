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
            ...options,
        }

        this.audioContext = null
        this.analyser = null
        this.microphoneStream = null
        this.isListening = false
        this.isSpeaking = false
        this.speechTimeout = null

        // Callbacks
        this.onSpeechStart = options.onSpeechStart || (() => console.log('User is speaking'))
        this.onSpeechEnd = options.onSpeechEnd || (() => console.log('User stopped speaking'))
        this.onError = options.onError || ((error) => console.error('Voice detection error:', error))
        this.onListeningStart = options.onListeningStart || (() => console.log('Voice detection started'))
        this.onListeningEnd = options.onListeningEnd || (() => console.log('Voice detection stopped'))
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
            this.audioContext = new AudioContext()

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
                this.onSpeechStart()
            }

            // Reset timeout to detect end of speech
            if (this.speechTimeout) {
                clearTimeout(this.speechTimeout)
            }

            this.speechTimeout = setTimeout(() => {
                this.isSpeaking = false
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
 * @param {number} options.threshold - Volume threshold (1-100, default: 10)
 * @param {number} options.silenceDelay - Silence delay in ms (default: 1000)
 * @returns {VoiceDetector} A configured voice detector instance
 */
export const createVoiceDetector = (options) => {
    return new VoiceDetector(options)
}

export default VoiceDetector
