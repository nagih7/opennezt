import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import React, { useState, useEffect, useRef } from 'react'
import {
    IconlyArrowDown2,
    IconlyArrowRight2,
    IconlyFace,
    IconlyMoreCircle,
    IconlyTickSquare,
    IconlyTimeSquare,
    IconlyUpload,
    IconlyVideo,
    IconlyVoice,
    IconlyVolumeUp,
} from 'components/UI/Iconly'
import icon_opennezt_img from 'assets/images/logo/opennezt_black.png'
import DeviceSelector from '../DeviceSelector'
import { useNavigate } from 'react-router-dom'
import { toaster } from 'components/UI/toaster'
import { OPENNEZT_INTERVIEW_LISTEN, OPENNEZT_BG_BLACK } from 'utils/constants'
import InterviewHeader from './components/InterviewHeader'

const Interview = () => {
    const navigate = useNavigate()
    const [audioInputDevices, setAudioInputDevices] = useState([])
    const [audioOutputDevices, setAudioOutputDevices] = useState([])
    const [videoDevices, setVideoDevices] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasJoined, setHasJoined] = useState(false)
    const [error, setError] = useState(null)
    const [permissionStatus, setPermissionStatus] = useState({
        camera: 'prompt',
        microphone: 'prompt'
    })
    const [debugging, setDebugging] = useState({
        hasMediaDevices: false,
        hasEnumerateDevices: false,
        hasUserMediaSupport: false,
        deviceCount: 0
    })

    // References
    const videoRef = useRef(null)
    const streamRef = useRef(null)

    // State for selected devices
    const [selectedAudioInput, setSelectedAudioInput] = useState(null)
    const [selectedAudioOutput, setSelectedAudioOutput] = useState(null)
    const [selectedVideo, setSelectedVideo] = useState(null)

    // Check browser capabilities on mount
    useEffect(() => {
        // Set debug information about browser capabilities
        setDebugging({
            hasMediaDevices: !!navigator.mediaDevices,
            hasEnumerateDevices: !!(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices),
            hasUserMediaSupport: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
            secure: window.isSecureContext,
            deviceCount: 0
        });

        // Check if we're in a secure context (HTTPS or localhost)
        if (!window.isSecureContext) {
            setError('Media devices can only be accessed in a secure context (HTTPS or localhost)');
            toaster.create({
                type: 'error',
                title: 'This page must be accessed via HTTPS to use cameras and microphones.',
            });
        }
    }, []);

    // Fetch available devices on component mount
    useEffect(() => {
        async function getAvailableDevices() {
            if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                setError('Your browser doesn\'t support media device access.');
                toaster.create({
                    type: 'error',
                    title: 'Your browser doesn\'t support media device access.',
                });
                return;
            }

            try {
                // First try to enumerate devices without requesting permissions
                // This will still list devices but with generic labels like "audio input" instead of specific names
                let devices = await navigator.mediaDevices.enumerateDevices();
                let hasLabels = devices.some(device => device.label !== '');
                
                // If we don't have device labels, we need to request permissions to get them
                if (!hasLabels) {
                    // Try video first
                    try {
                        const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
                        if (streamRef.current) {
                            streamRef.current.getTracks().forEach((track) => track.stop());
                        }
                        streamRef.current = videoStream;
                        setPermissionStatus(prev => ({...prev, camera: 'granted'}));
                    } catch (err) {
                        console.warn('Camera permission denied:', err);
                        setPermissionStatus(prev => ({...prev, camera: 'denied'}));
                    }
                    
                    // Then try audio
                    try {
                        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                        if (!streamRef.current) {
                            streamRef.current = audioStream;
                        } else {
                            // Add audio tracks to existing stream
                            audioStream.getAudioTracks().forEach(track => {
                                streamRef.current.addTrack(track);
                            });
                        }
                        setPermissionStatus(prev => ({...prev, microphone: 'granted'}));
                    } catch (err) {
                        console.warn('Microphone permission denied:', err);
                        setPermissionStatus(prev => ({...prev, microphone: 'denied'}));
                    }
                    
                    // Enumerate devices again after requesting permissions to get device labels
                    devices = await navigator.mediaDevices.enumerateDevices();
                }
                
                // Update debugging info
                setDebugging(prev => ({...prev, deviceCount: devices.length}));

                // Filter devices by type
                const audioInputs = devices.filter((device) => device.kind === 'audioinput');
                const audioOutputs = devices.filter((device) => device.kind === 'audiooutput');
                const videoInputs = devices.filter((device) => device.kind === 'videoinput');

                // Update device lists
                setAudioInputDevices(audioInputs);
                setAudioOutputDevices(audioOutputs);
                setVideoDevices(videoInputs);

                // Set default selections if available
                if (audioInputs.length > 0) setSelectedAudioInput(audioInputs[0]);
                if (audioOutputs.length > 0) setSelectedAudioOutput(audioOutputs[0]);
                if (videoInputs.length > 0) {
                    setSelectedVideo(videoInputs[0]);
                    // Start video preview with default camera
                    startVideoPreview(videoInputs[0].deviceId);
                } else if (videoInputs.length === 0) {
                    toaster.create({
                        type: 'warning',
                        title: 'No video devices detected. Please connect a camera to continue.',
                    });
                }
            } catch (error) {
                console.error('Error accessing media devices:', error);
                setError(`Failed to access media devices: ${error.message || error}`);
                toaster.create({
                    type: 'error',
                    title: 'Failed to access media devices. Please check your permissions.',
                });
            }
        }

        // Add device change listener for hot-plugging devices
        const handleDeviceChange = () => {
            console.log('Media devices changed, updating device list...');
            getAvailableDevices();
        };

        navigator.mediaDevices?.addEventListener('devicechange', handleDeviceChange);
        getAvailableDevices();

        // Clean up the stream and event listener when component unmounts
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
            navigator.mediaDevices?.removeEventListener('devicechange', handleDeviceChange);
        }
    }, []);

    // Function to manually request permissions again
    const requestMediaPermissions = async () => {
        try {
            // Request both audio and video permissions at once
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: true, 
                video: true 
            });
            
            // Update permission status
            setPermissionStatus({
                camera: 'granted',
                microphone: 'granted'
            });
            
            // Stop any existing stream
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
            
            // Store the new stream
            streamRef.current = stream;
            
            // Re-enumerate devices to get updated labels
            const devices = await navigator.mediaDevices.enumerateDevices();
            
            // Filter and update device lists
            const audioInputs = devices.filter(device => device.kind === 'audioinput');
            const audioOutputs = devices.filter(device => device.kind === 'audiooutput'); 
            const videoInputs = devices.filter(device => device.kind === 'videoinput');
            
            setAudioInputDevices(audioInputs);
            setAudioOutputDevices(audioOutputs);
            setVideoDevices(videoInputs);
            
            // Set default selections if available
            if (audioInputs.length > 0) setSelectedAudioInput(audioInputs[0]);
            if (audioOutputs.length > 0) setSelectedAudioOutput(audioOutputs[0]);
            if (videoInputs.length > 0) {
                setSelectedVideo(videoInputs[0]);
                // Display video preview
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            }
            
            toaster.create({
                type: 'success',
                title: 'Permissions granted successfully!',
            });
            
            setError(null);
        } catch (error) {
            console.error('Error requesting permissions:', error);
            setError(`Permission request failed: ${error.message || error}`);
            toaster.create({
                type: 'error',
                title: 'Permission request failed. Please check your browser settings.',
            });
        }
    };

    // Start video preview when device is changed
    useEffect(() => {
        if (selectedVideo && selectedVideo.deviceId) {
            startVideoPreview(selectedVideo.deviceId)
        }
    }, [selectedVideo])

    // Function to start video preview
    const startVideoPreview = async (deviceId) => {
        try {
            // Stop any existing stream
            if (streamRef.current) {
                // Only stop video tracks to keep audio permission
                streamRef.current.getVideoTracks().forEach((track) => track.stop())
            }

            // Start a new stream with the selected device
            const constraints = {
                video: deviceId ? { deviceId: { exact: deviceId } } : true
            };
            
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            
            // If we already have a stream with audio tracks, add the video track to it
            if (streamRef.current) {
                const audioTracks = streamRef.current.getAudioTracks();
                audioTracks.forEach(track => {
                    stream.addTrack(track);
                });
                streamRef.current = stream;
            } else {
                streamRef.current = stream;
            }

            // Display the stream in the video element
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error starting video preview:', error);
            toaster.create({
                type: 'error',
                title: 'Failed to start video preview. Please try another device.',
            });
        }
    }

    // Handle device selection
    const handleDeviceSelect = (type, device) => {
        switch (type) {
            case 'audio-input':
                setSelectedAudioInput(device)
                break
            case 'audio-output':
                setSelectedAudioOutput(device)
                if (videoRef.current && typeof videoRef.current.setSinkId === 'function') {
                    videoRef.current.setSinkId(device.deviceId).catch((error) => {
                        console.error('Error setting audio output device:', error)
                    })
                }
                break
            case 'video':
                setSelectedVideo(device)
                break
            default:
                break
        }
    }

    // Start the interview
    const handleStartInterview = async () => {
        try {
            setIsLoading(true)

            // Here you would typically connect to your interview service
            // For example, calling an API endpoint to start the interview session

            // Simulate API call with timeout
            setTimeout(() => {
                setHasJoined(true)
                setIsLoading(false)
                toaster.create({
                    type: 'success',
                    title: 'You have joined the interview successfully!',
                })
            }, 1500)
        } catch (error) {
            console.error('Error starting interview:', error)
            setIsLoading(false)
            toaster.create({
                type: 'error',
                title: 'Failed to start the interview. Please try again.',
            })
        }
    }

    // Handle technical issues
    const handleTechnicalIssues = () => {
        // Show debugging information in the console
        console.log('Device Detection Debug Info:', {
            browser: navigator.userAgent,
            permissions: permissionStatus,
            capabilities: debugging,
            audioInputs: audioInputDevices.length,
            audioOutputs: audioOutputDevices.length,
            videoInputs: videoDevices.length
        });
        
        // Ask user to grant permissions again
        requestMediaPermissions();
        
        toaster.create({
            type: 'info',
            title: 'Attempting to detect devices again...',
        });
    }

    return (
        <div className="p-[16px] w-full h-screen bg-[#ffffff]">
            <InterviewHeader />
            <div className="mt-4 2xl:mt-10">
                <div className="flex w-full h-full">
                    <div className="w-1/12"></div>
                    <div className="w-10/12">
                        {error && (
                            <div className="w-full mb-4 px-4 py-3 bg-red-50 text-red-700 border border-red-300 rounded-md">
                                <div className="font-semibold">Error detecting devices</div>
                                <div className="text-sm">{error}</div>
                                <button 
                                    className="mt-2 px-3 py-1 text-sm bg-red-100 hover:bg-red-200 rounded-md"
                                    onClick={requestMediaPermissions}
                                >
                                    Grant Permissions
                                </button>
                            </div>
                        )}
                        
                        {(permissionStatus.camera === 'denied' || permissionStatus.microphone === 'denied') && !error && (
                            <div className="w-full mb-4 px-4 py-3 bg-yellow-50 text-yellow-700 border border-yellow-300 rounded-md">
                                <div className="font-semibold">Permission Required</div>
                                <div className="text-sm">
                                    Please allow access to your {permissionStatus.camera === 'denied' ? 'camera' : ''} 
                                    {permissionStatus.camera === 'denied' && permissionStatus.microphone === 'denied' ? ' and ' : ''}
                                    {permissionStatus.microphone === 'denied' ? 'microphone' : ''} to join the interview.
                                </div>
                                <button 
                                    className="mt-2 px-3 py-1 text-sm bg-yellow-100 hover:bg-yellow-200 rounded-md"
                                    onClick={requestMediaPermissions}
                                >
                                    Grant Permissions
                                </button>
                            </div>
                        )}
                        
                        <div className="flex flex-col md:flex-row items-center gap-[30px] md:gap-[60px] 2xl:gap-[100px] 2xl:ml-[100px]">
                            <div className="flex flex-col w-full gap-3 md:w-auto">
                                <div className="flex items-center gap-1 text-[#6f7f92] font-semibold">
                                    Interviews
                                    <IconlyArrowRight2 size={18} color={'#6f7f92'} />
                                    <span className="text-[#000000]">Consulting</span>
                                </div>
                                <span className="text-2xl font-semibold 2xl:text-3xl">Growth Hacker</span>
                                <div className="items-center hidden gap-2 2xl:flex">
                                    <div className="flex items-center gap-1 px-2 py-1 border rounded-md">
                                        <IconlyTimeSquare size={20} color={'#000000'} />
                                        30m
                                    </div>
                                    <span className="text-[#6f7f92] font-semibold">
                                        Plan and strategize a product launch
                                    </span>
                                </div>
                                <div className="relative bg-[#000000] 2xl:w-[850px] 2xl:h-[500px] w-[100%] md:w-[700px] h-[400px] rounded-md overflow-hidden">
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
                                                className="object-cover rounded-md 2xl:h-[500px] h-[400px]"
                                                style={{ outline: 'none' }}
                                            />
                                        </>
                                    ) : (
                                        <video
                                            width="100%"
                                            height="100%"
                                            loop
                                            autoPlay
                                            muted
                                            className="object-cover rounded-md 2xl:h-[500px] h-[400px]"
                                            playsInline
                                            style={{ outline: 'none' }}
                                            onLoadedMetadata={(e) => e.target.play()}
                                            controlsList="nodownload nofullscreen noremoteplayback"
                                        >
                                            <source src={OPENNEZT_INTERVIEW_LISTEN} type="video/mp4" />
                                        </video>
                                    )}
                                </div>
                                <div className="flex flex-wrap items-center justify-around gap-2">
                                    <DeviceSelector
                                        icon={<IconlyVoice size={20} color={'#000000'} />}
                                        selectedDevice={selectedAudioInput}
                                        devices={audioInputDevices}
                                        onSelect={(device) => handleDeviceSelect('audio-input', device)}
                                        deviceType="audio-input"
                                    />
                                    <DeviceSelector
                                        icon={<IconlyVolumeUp size={20} color={'#000000'} />}
                                        selectedDevice={selectedAudioOutput}
                                        devices={audioOutputDevices}
                                        onSelect={(device) => handleDeviceSelect('audio-output', device)}
                                        deviceType="audio-output"
                                    />
                                    <DeviceSelector
                                        icon={<IconlyVideo size={20} color={'#000000'} />}
                                        selectedDevice={selectedVideo}
                                        devices={videoDevices}
                                        onSelect={(device) => handleDeviceSelect('video', device)}
                                        deviceType="video"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-3 mt-[30px] md:mt-[120px] 2xl:mt-[150px]">
                                <span className="text-xl font-semibold 2xl:text-2xl">Ready to join?</span>
                                <img
                                    className="w-10 h-10 bg-center rounded-full"
                                    src={icon_opennezt_img}
                                    alt="OpenNezt Logo"
                                />
                                <span className="text-[#6f7f92] font-semibold">OpenNezt AI is in the call</span>
                                <button
                                    className={`px-20 2xl:py-3 py-2 rounded-full text-[#ffffff] font-semibold ${
                                        isLoading
                                            ? 'bg-[#7299d1] cursor-not-allowed'
                                            : 'bg-[#4374c0] hover:bg-[#3a65a9] transition-colors'
                                    }`}
                                    onClick={handleStartInterview}
                                    disabled={isLoading || hasJoined}
                                >
                                    {isLoading ? 'Connecting...' : hasJoined ? 'Interview Started' : 'Start Interview'}
                                </button>
                                <button
                                    className="bg-[#ffffff] px-6 font-semibold py-2 rounded-full border hover:bg-gray-50 transition-colors"
                                    onClick={handleTechnicalIssues}
                                >
                                    I{`'`}m having issues
                                </button>
                                <span className="text-[#6f7f92] font-semibold text-center px-4">
                                    OpenNezt uses generative AI to conduct the AI interview
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/12"></div>
                </div>
            </div>
        </div>
    )
}

export default Interview
