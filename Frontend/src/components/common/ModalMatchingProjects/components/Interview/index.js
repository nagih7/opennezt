import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
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
import logo_opennezt_img from 'assets/images/logo/opennezt_full_black_old.png'
import icon_opennezt_img from 'assets/images/logo/opennezt_black.png'
import DeviceSelector from '../DeviceSelector'
import { useNavigate } from 'react-router-dom'
import { toaster } from 'components/UI/toaster'

const Interview = () => {
    const navigate = useNavigate()
    const [audioInputDevices, setAudioInputDevices] = useState([])
    const [audioOutputDevices, setAudioOutputDevices] = useState([])
    const [videoDevices, setVideoDevices] = useState([])

    // State for selected devices
    const [selectedAudioInput, setSelectedAudioInput] = useState(null)
    const [selectedAudioOutput, setSelectedAudioOutput] = useState(null)
    const [selectedVideo, setSelectedVideo] = useState(null)

    // Fetch available devices on component mount
    useEffect(() => {
        async function getAvailableDevices() {
            try {
                // Request permission to access media devices
                await navigator.mediaDevices.getUserMedia({ audio: true, video: true })

                // Get all media devices
                const devices = await navigator.mediaDevices.enumerateDevices()

                // Filter devices by type
                const audioInputs = devices.filter((device) => device.kind === 'audioinput')
                const audioOutputs = devices.filter((device) => device.kind === 'audiooutput')
                const videoInputs = devices.filter((device) => device.kind === 'videoinput')

                setAudioInputDevices(audioInputs)
                setAudioOutputDevices(audioOutputs)
                setVideoDevices(videoInputs)

                // Set default selections
                if (audioInputs.length > 0) setSelectedAudioInput(audioInputs[0])
                if (audioOutputs.length > 0) setSelectedAudioOutput(audioOutputs[0])
                if (videoInputs.length > 0) setSelectedVideo(videoInputs[0])
            } catch (error) {
                console.error('Error accessing media devices:', error)
                toaster.create({
                    type: 'error',
                    title: 'Failed to access media devices. Please check your permissions.',
                })
            }
        }

        getAvailableDevices()
    }, [])

    return (
        <div className="p-[16px] w-full h-screen bg-[#ffffff]">
            <div className="flex items-center justify-between ">
                <img
                    src={logo_opennezt_img}
                    className="2xl:w-[300px] w-[220px] h-full cursor-pointer"
                    onClick={() => navigate('/')}
                />
                <div className="flex items-center gap-2">
                    <div className="flex items-center font-semibold gap-1 border bg-[#ffffff] rounded-full cursor-pointer py-[5px] px-3">
                        <IconlyUpload size={18} color={'#000000'} />
                        Share
                    </div>
                    <div
                        className=" font-semibold border bg-[#ffffff] rounded-full cursor-pointer py-[5px] px-3"
                        onClick={() => navigate('/')}
                    >
                        Go to dashboard
                    </div>
                    <img
                        src="https://s3-alpha-sig.figma.com/img/e16b/cb60/425da07d91b6faa2946c5440979915a3?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=V~f9yjShO1gqG80p3jti6jcUvJ0jyEYk~BopTM4-sZTj26r~~jRyHQVxEH9dA8KV3IXOvk4ESwgo1NI86xE-y4pThAEZNrUM~RtkG~FvCSTAb8WVQKsYVUwS9y4cBS-LaRMLPs5A3wh0wzh0GJPVuw2kgWNly1fK4~Z7RNmiSL3VrTzyz8N5tFJmDVjf0cXQBdBNbBaYhMcP-CwtKHfaCf1wfzSSRQF92kQijj~CVxpR12qcTmWaKYcY7c6Lt-DEW5xDy--J8XMa-1bcjNtF3loAFC820OHobxS9f8QbY1O1Vj7mwJY07VFE1yPkzbDM8qva6Hy9fiafdGhRwRmlYg__"
                        className="object-cover w-10 h-10 bg-center rounded-full"
                    />
                </div>
            </div>
            <div className="mt-4 2xl:mt-10">
                <div className="flex w-full h-full">
                    <div className="w-1/12"></div>
                    <div className="w-10/12">
                        <div className="flex items-center gap-[60px] 2xl:gap-[100px] 2xl:ml-[100px]">
                            <div className="flex flex-col gap-3">
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
                                <div className="relative bg-[#000000] 2xl:w-[850px] 2xl:h-[500px] w-[700px] h-[400px] rounded-md">
                                    <div className="bg-[#ffffff] rounded-full absolute bottom-[15px] left-[20px]">
                                        <IconlyMoreCircle size={20} color={'#4374c0'} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-around">
                                    {/* <div className='flex items-center gap-2'>
                                        <IconlyVoice size={20} color={'#000000'} />
                                        Microphone Array
                                        <IconlyArrowDown2 size={20} color={'#000000'} />
                                    </div> */}
                                    <DeviceSelector
                                        icon={<IconlyVoice size={20} color={'#000000'} />}
                                        selectedDevice={selectedAudioInput}
                                        devices={audioInputDevices}
                                        onSelect={setSelectedAudioInput}
                                        deviceType="audio-input"
                                    />
                                    <DeviceSelector
                                        icon={<IconlyVolumeUp size={20} color={'#000000'} />}
                                        selectedDevice={selectedAudioOutput}
                                        devices={audioOutputDevices}
                                        onSelect={setSelectedAudioOutput}
                                        deviceType="audio-output"
                                    />
                                    <DeviceSelector
                                        icon={<IconlyVideo size={20} color={'#000000'} />}
                                        selectedDevice={selectedVideo}
                                        devices={videoDevices}
                                        onSelect={setSelectedVideo}
                                        deviceType="video"
                                    />
                                    {/* <div className='flex items-center gap-2'>
                                        <IconlyVolumeUp size={20} color={'#000000'} />
                                        Mặc định - Speakers
                                        <IconlyArrowDown2 size={20} color={'#000000'} />
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <IconlyVideo size={20} color={'#000000'} />
                                        Integrated Camera
                                        <IconlyArrowDown2 size={20} color={'#000000'} />
                                    </div> */}
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-3 2xl:mt-[150px] mt-[120px]">
                                <span className="text-xl font-semibold 2xl:text-2xl">Ready to join ?</span>
                                <img className="w-10 h-10 bg-center rounded-full" src={icon_opennezt_img} />
                                <span className="text-[#6f7f92] font-semibold">OpenNezt AI is in the call</span>
                                <button className="bg-[#4374c0] px-20 2xl:py-3 py-2 rounded-full text-[#ffffff] font-semibold">
                                    Start Interview
                                </button>
                                <button className="bg-[#ffffff] px-6 font-semibold py-2 rounded-full border ">
                                    I{`'`}m having issues
                                </button>
                                <span className="text-[#6f7f92] font-semibold">
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
