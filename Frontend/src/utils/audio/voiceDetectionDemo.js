/**
 * Voice Detection Demo
 *
 * Simple standalone example of voice detection using the Web Audio API.
 * This demonstrates how to use the voice detection functionality without
 * any external dependencies.
 */

// Create a basic UI for testing
function createDemoUI() {
    // Create container
    const container = document.createElement('div')
    container.style.cssText = 'font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'

    // Create title
    const title = document.createElement('h2')
    title.textContent = 'Voice Detection Demo'
    container.appendChild(title)

    // Create description
    const description = document.createElement('p')
    description.textContent = 'This demo shows how to detect when a user is speaking using the Web Audio API.'
    container.appendChild(description)

    // Create status display
    const statusDisplay = document.createElement('div')
    statusDisplay.style.cssText =
        'padding: 15px; margin: 20px 0; border-radius: 5px; background: #f0f0f0; text-align: center;'
    statusDisplay.textContent = 'Ready to detect voice'
    container.appendChild(statusDisplay)

    // Create settings
    const settingsDiv = document.createElement('div')
    settingsDiv.style.cssText = 'margin: 20px 0;'

    const thresholdLabel = document.createElement('label')
    thresholdLabel.textContent = 'Sensitivity: '

    const thresholdInput = document.createElement('input')
    thresholdInput.type = 'range'
    thresholdInput.min = '1'
    thresholdInput.max = '30'
    thresholdInput.value = '10'
    thresholdLabel.appendChild(thresholdInput)

    settingsDiv.appendChild(thresholdLabel)
    container.appendChild(settingsDiv)

    // Create buttons
    const buttonDiv = document.createElement('div')
    buttonDiv.style.cssText = 'display: flex; gap: 10px;'

    const startButton = document.createElement('button')
    startButton.textContent = 'Start Detection'
    startButton.style.cssText =
        'padding: 8px 16px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;'

    const stopButton = document.createElement('button')
    stopButton.textContent = 'Stop Detection'
    stopButton.style.cssText =
        'padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;'
    stopButton.disabled = true

    buttonDiv.appendChild(startButton)
    buttonDiv.appendChild(stopButton)
    container.appendChild(buttonDiv)

    // Create log
    const logContainer = document.createElement('div')
    logContainer.style.cssText =
        'margin-top: 20px; border: 1px solid #ddd; padding: 10px; height: 150px; overflow-y: auto; background: #f9f9f9;'
    container.appendChild(logContainer)

    document.body.appendChild(container)

    return {
        statusDisplay,
        startButton,
        stopButton,
        thresholdInput,
        logContainer,
    }
}

// Voice detection implementation
class VoiceDetector {
    constructor(options = {}) {
        this.options = {
            threshold: 10,
            silenceDelay: 1000,
            ...options,
        }

        this.audioContext = null
        this.analyser = null
        this.microphoneStream = null
        this.isListening = false
        this.isSpeaking = false
        this.speechTimeout = null
    }

    async start() {
        try {
            await this.stop()

            const AudioContext = window.AudioContext || window.webkitAudioContext
            this.audioContext = new AudioContext()

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            this.microphoneStream = stream

            const analyser = this.audioContext.createAnalyser()
            analyser.fftSize = 1024
            analyser.smoothingTimeConstant = 0.8
            this.analyser = analyser

            const source = this.audioContext.createMediaStreamSource(stream)
            source.connect(analyser)

            this.isListening = true
            if (this.options.onListeningStart) this.options.onListeningStart()
            this.monitorSound()

            return true
        } catch (err) {
            if (this.options.onError) this.options.onError(err)
            this.isListening = false
            return false
        }
    }

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
            if (this.options.onListeningEnd) this.options.onListeningEnd()
        }
    }

    monitorSound() {
        if (!this.analyser || !this.isListening) return

        const dataArray = new Uint8Array(this.analyser.fftSize)
        this.analyser.getByteTimeDomainData(dataArray)

        let sum = 0
        for (let i = 0; i < dataArray.length; i++) {
            sum += Math.abs(dataArray[i] - 128)
        }
        const averageVolume = sum / dataArray.length

        if (this.options.onVolumeChange) {
            this.options.onVolumeChange(averageVolume)
        }

        if (averageVolume > this.options.threshold) {
            if (!this.isSpeaking) {
                this.isSpeaking = true
                if (this.options.onSpeechStart) this.options.onSpeechStart()
            }

            if (this.speechTimeout) {
                clearTimeout(this.speechTimeout)
            }

            this.speechTimeout = setTimeout(() => {
                this.isSpeaking = false
                if (this.options.onSpeechEnd) this.options.onSpeechEnd()
            }, this.options.silenceDelay)
        }

        if (this.isListening) {
            requestAnimationFrame(this.monitorSound.bind(this))
        }
    }

    setThreshold(threshold) {
        this.options.threshold = threshold
    }
}

// Add a function to initialize the demo
function initDemo() {
    // Create UI
    const ui = createDemoUI()

    // Log function
    const log = (message) => {
        const logEntry = document.createElement('div')
        logEntry.textContent = `${new Date().toLocaleTimeString()}: ${message}`
        ui.logContainer.appendChild(logEntry)
        ui.logContainer.scrollTop = ui.logContainer.scrollHeight
    }

    // Create voice detector
    const detector = new VoiceDetector({
        onSpeechStart: () => {
            log('User is speaking')
            ui.statusDisplay.textContent = 'Speaking detected!'
            ui.statusDisplay.style.background = '#ff9800'
            console.log('User is speaking')
        },
        onSpeechEnd: () => {
            log('User stopped speaking')
            ui.statusDisplay.textContent = 'Listening for voice...'
            ui.statusDisplay.style.background = '#4CAF50'
            console.log('User stopped speaking')
        },
        onListeningStart: () => {
            log('Voice detection started')
            ui.statusDisplay.textContent = 'Listening for voice...'
            ui.statusDisplay.style.background = '#4CAF50'
        },
        onListeningEnd: () => {
            log('Voice detection stopped')
            ui.statusDisplay.textContent = 'Voice detection inactive'
            ui.statusDisplay.style.background = '#f0f0f0'
        },
        onError: (err) => {
            log(`Error: ${err.message}`)
            ui.statusDisplay.textContent = 'Error accessing microphone'
            ui.statusDisplay.style.background = '#f44336'
            ui.startButton.disabled = false
            ui.stopButton.disabled = true
        },
        threshold: parseInt(ui.thresholdInput.value),
    })

    // Add event listeners
    ui.startButton.addEventListener('click', async () => {
        ui.startButton.disabled = true
        ui.statusDisplay.textContent = 'Requesting microphone access...'

        const success = await detector.start()

        if (success) {
            ui.stopButton.disabled = false
        } else {
            ui.startButton.disabled = false
        }
    })

    ui.stopButton.addEventListener('click', async () => {
        ui.stopButton.disabled = true
        await detector.stop()
        ui.startButton.disabled = false
    })

    ui.thresholdInput.addEventListener('change', () => {
        const threshold = parseInt(ui.thresholdInput.value)
        detector.setThreshold(threshold)
        log(`Sensitivity threshold set to ${threshold}`)
    })

    // Initial log
    log('Voice detection demo initialized')
}

// Check if running in browser or as module
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', initDemo)
}

// Export for module usage
export { VoiceDetector, initDemo }
