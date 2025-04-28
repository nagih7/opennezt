import React, { useState, useRef, useEffect, useCallback } from 'react'
import { IconlyMoreCircle } from 'components/UI/Iconly'
import { useDispatch, useSelector } from 'react-redux'
import { createSyncedAudioVideo } from 'utils/audio/audioHandler'
import { OPENNEZT_INTERVIEW_LISTEN, OPENNEZT_INTERVIEW_SPEAK } from 'utils/constants'
import { setCurrentAction } from 'states/modules/interview'

const VideoPreview = ({ videoRef }) => {
    const dispatch = useDispatch()
    // STATE FROM REDUX STORE
    const { hasJoined, messages } = useSelector((state) => state.interview)
    const [isFirstMessageReceived, setIsFirstMessageReceived] = useState(false)
    const [currentVideo, setCurrentVideo] = useState(OPENNEZT_INTERVIEW_SPEAK)
    const [fadeState, setFadeState] = useState('') // '', 'fading', 'faded'
    const [nextVideo, setNextVideo] = useState(null)

    const interviewVideoRef = useRef(null)
    const syncControllerRef = useRef(null)
    // const secondaryVideoRef = useRef(null)

    // Handle switch to listening mode
    const switchToListenMode = useCallback(() => {
        // Start fade transition instead of direct swap
        setNextVideo(OPENNEZT_INTERVIEW_LISTEN)
        dispatch(setCurrentAction('listening'))
        setFadeState('fading')
    }, [dispatch])

    // Handle fade transition
    useEffect(() => {
        if (fadeState === 'fading') {
            // After fade out completes, update current video and fade back in
            const timer = setTimeout(() => {
                setCurrentVideo(nextVideo)
                setFadeState('faded')
            }, 500) // Match this duration with CSS transition duration

            return () => clearTimeout(timer)
        } else if (fadeState === 'faded') {
            // Reset fade state after fade in completes
            const timer = setTimeout(() => {
                setFadeState('')
            }, 500) // Match this duration with CSS transition duration

            return () => clearTimeout(timer)
        }
    }, [fadeState, nextVideo])

    // Cleanup function for audio-video sync controller
    const cleanupSyncController = useCallback(() => {
        if (syncControllerRef.current) {
            syncControllerRef.current.cleanup()
            syncControllerRef.current = null
        }
    }, [])

    // Listen for new messages to trigger the speaking video
    useEffect(() => {
        if (hasJoined && messages.length > 0) {
            // Determine which message to use
            const messageToPlay = !isFirstMessageReceived
                ? messages[0]
                : messages.length > 1
                ? messages[messages.length - 1]
                : null

            if (messageToPlay && messageToPlay.attachments) {
                // Set state to show speaking video and mark first message as received if needed
                setCurrentVideo(OPENNEZT_INTERVIEW_SPEAK)
                dispatch(setCurrentAction('speaking'))

                if (!isFirstMessageReceived) {
                    setIsFirstMessageReceived(true)
                }

                // Clean up any existing controller
                cleanupSyncController()

                // Wait for the video element to be ready
                setTimeout(() => {
                    if (interviewVideoRef.current) {
                        // Create synced audio-video controller
                        syncControllerRef.current = createSyncedAudioVideo(
                            messageToPlay.attachments,
                            interviewVideoRef.current,
                            {
                                onAudioEnd: () => {
                                    console.log('Audio playback ended')
                                    // Audio ended, switch to listen mode
                                    switchToListenMode()
                                },
                                onVideoEnd: () => {
                                    console.log('Video playback ended')
                                },
                                onSyncComplete: () => {
                                    console.log('Audio and video sync complete')
                                    switchToListenMode()
                                },
                            }
                        )
                    }
                }, 100) // Small delay to ensure video element is ready
            }
        }
    }, [hasJoined, messages, isFirstMessageReceived, switchToListenMode, cleanupSyncController, dispatch])

    // Handle video ended event
    const handleVideoEnded = () => {
        // Only switch to listen mode if the video is the speaking video
        if (currentVideo === OPENNEZT_INTERVIEW_SPEAK) {
            switchToListenMode()
        }
    }

    // Clean up on unmount
    useEffect(() => {
        return () => {
            cleanupSyncController()
        }
    }, [cleanupSyncController])

    // CSS classes for fade transition
    const getVideoClassName = () => {
        const baseClass = ' rounded-md w-full h-full transition-opacity duration-500 ease-in-out '

        if (fadeState === 'fading') {
            return `${baseClass} opacity-0`
        } else if (fadeState === 'faded') {
            return `${baseClass} opacity-100`
        }

        return `${baseClass} opacity-100`
    }

    return (
        <div className="relative bg-[#000000]  w-full h-full  rounded-md overflow-hidden">
            {!hasJoined ? (
                <>
                    <div className="bg-[#ffffff] rounded-full absolute bottom-[15px] left-[20px] z-10">
                        <IconlyMoreCircle size={20} color={'#4374c0'} />
                    </div>
                    <video
                        ref={videoRef}
                        width="100%"
                        height="100%"
                        autoPlay
                        playsInline
                        muted
                        style={{ outline: 'none' }}
                    />
                </>
            ) : (
                <video
                    ref={interviewVideoRef}
                    width="100%"
                    height="100%"
                    loop={currentVideo === OPENNEZT_INTERVIEW_LISTEN}
                    autoPlay
                    muted
                    className={getVideoClassName()}
                    playsInline
                    style={{ outline: 'none' }}
                    src={currentVideo}
                    onLoadedMetadata={(e) => e.target.play()}
                    onEnded={handleVideoEnded}
                    controlsList="nodownload nofullscreen noremoteplayback"
                />
            )}
        </div>
    )
}

export default VideoPreview
