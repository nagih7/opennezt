import React from 'react'
import { IconlyVideo, IconlyVoice, IconlyVolumeUp } from 'components/UI/Iconly'
import DeviceSelector from '../DeviceSelector'

const InterviewControls = ({
    selectedAudioInput,
    selectedAudioOutput,
    selectedVideo,
    audioInputDevices,
    audioOutputDevices,
    videoDevices,
    handleDeviceSelect,
}) => {
    return (
        <div className="flex flex-wrap items-center gap-2 justify">
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
    )
}

export default InterviewControls
