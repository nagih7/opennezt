/**
 * Audio Handler Utility for OpenNezt Interview Features
 * Provides functions to manage audio playback and events
 */

/**
 * Creates an audio player with enhanced event handling
 * @param {string} src - URL of the audio to play
 * @param {Object} options - Configuration options
 * @param {Function} options.onEnd - Callback function when audio ends
 * @param {Function} options.onPlay - Callback function when audio starts playing
 * @param {Function} options.onError - Callback function when audio encounters an error
 * @param {Function} options.onTimeUpdate - Callback function for time updates during playback
 * @param {boolean} options.autoPlay - Whether to automatically play the audio after loading
 * @returns {Object} Audio controller with methods and the audio element
 */
export const createAudioPlayer = (src, options = {}) => {
    const {
        onEnd = () => {
            /* noop */
        },
        onPlay = () => {
            /* noop */
        },
        onError = (error) => console.error('Audio playback error:', error),
        onTimeUpdate = () => {
            /* noop */
        },
        autoPlay = true,
    } = options

    // Create audio element
    const audio = new Audio(src)

    // Track if the audio has started playing
    let hasStarted = false

    // Set up event listeners
    audio.addEventListener('ended', () => {
        onEnd()
    })

    audio.addEventListener('playing', () => {
        hasStarted = true
        onPlay()
    })

    audio.addEventListener('error', (e) => {
        onError(e)
    })

    audio.addEventListener('timeupdate', () => {
        onTimeUpdate(audio.currentTime, audio.duration)
    })

    // Start playing if autoPlay is enabled
    if (autoPlay) {
        audio.play().catch(onError)
    }

    return {
        audio,

        // Play the audio
        play: () => audio.play().catch(onError),

        // Pause the audio
        pause: () => audio.pause(),

        // Stop and reset the audio
        stop: () => {
            audio.pause()
            audio.currentTime = 0
        },

        // Check if audio is currently playing
        isPlaying: () => !audio.paused && hasStarted,

        // Get current time in seconds
        getCurrentTime: () => audio.currentTime,

        // Get total duration in seconds
        getDuration: () => audio.duration,

        // Set volume (0-1)
        setVolume: (volume) => {
            audio.volume = Math.min(Math.max(volume, 0), 1)
        },

        // Clean up method to remove event listeners
        cleanup: () => {
            audio.pause()
            audio.removeEventListener('ended', onEnd)
            audio.removeEventListener('playing', onPlay)
            audio.removeEventListener('error', onError)
            audio.removeEventListener('timeupdate', onTimeUpdate)
        },
    }
}

/**
 * Checks if an audio file exists and is playable
 * @param {string} url - URL of the audio to check
 * @returns {Promise<boolean>} Promise that resolves to true if audio is valid
 */
export const checkAudioValidity = (url) => {
    return new Promise((resolve) => {
        const audio = new Audio()

        const onCanPlay = () => {
            cleanup()
            resolve(true)
        }

        const onError = () => {
            cleanup()
            resolve(false)
        }

        const cleanup = () => {
            audio.removeEventListener('canplaythrough', onCanPlay)
            audio.removeEventListener('error', onError)
        }

        audio.addEventListener('canplaythrough', onCanPlay)
        audio.addEventListener('error', onError)

        audio.src = url

        // Set a timeout to prevent hanging indefinitely
        setTimeout(() => {
            if (audio.readyState < 3) {
                // HAVE_FUTURE_DATA = 3
                cleanup()
                resolve(false)
            }
        }, 5000)
    })
}

/**
 * Creates a synchronized audio-video player
 * @param {string} audioSrc - URL of the audio to play
 * @param {HTMLVideoElement} videoElement - Video element to synchronize with
 * @param {Object} options - Configuration options for audio and synchronization
 * @returns {Object} Controller for the synchronized playback
 */
export const createSyncedAudioVideo = (audioSrc, videoElement, options = {}) => {
    const {
        onAudioEnd = () => {
            /* noop */
        },
        onVideoEnd = () => {
            /* noop */
        },
        onSyncComplete = () => {
            /* noop */
        },
        autoStart = true,
    } = options

    let isAudioEnded = false
    let isVideoEnded = false

    // Create audio player
    const audioPlayer = createAudioPlayer(audioSrc, {
        autoPlay: autoStart,
        onEnd: () => {
            isAudioEnded = true
            onAudioEnd()
            checkSyncComplete()
        },
        onError: (error) => {
            console.error('Audio sync error:', error)
            // If audio fails, still allow the video to play independently
            isAudioEnded = true
            checkSyncComplete()
        },
    })

    // Add video event listeners
    const handleVideoEnded = () => {
        isVideoEnded = true
        onVideoEnd()
        checkSyncComplete()
    }

    // Check if both audio and video have completed
    const checkSyncComplete = () => {
        if (isAudioEnded && isVideoEnded) {
            onSyncComplete()
        } else if (isAudioEnded) {
            // If audio ends first, force the video to end as well
            videoElement.currentTime = videoElement.duration
        }
    }

    videoElement.addEventListener('ended', handleVideoEnded)

    // Return controller object
    return {
        start: () => {
            isAudioEnded = false
            isVideoEnded = false
            videoElement.play()
            audioPlayer.play()
        },

        stop: () => {
            audioPlayer.stop()
            videoElement.pause()
            videoElement.currentTime = 0
        },

        pause: () => {
            audioPlayer.pause()
            videoElement.pause()
        },

        resume: () => {
            audioPlayer.play()
            videoElement.play()
        },

        isAudioEnded: () => isAudioEnded,
        isVideoEnded: () => isVideoEnded,

        cleanup: () => {
            audioPlayer.cleanup()
            videoElement.removeEventListener('ended', handleVideoEnded)
        },
    }
}
