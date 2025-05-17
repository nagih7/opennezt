import React from 'react'
import { IconlyVideo, IconlyVoice, IconlyVolumeUp } from 'components/UI/Iconly'
import DeviceSelector from '../DeviceSelector'

interface InterviewControlsProps {
   selectedAudioInput: MediaDeviceInfo | null
   selectedAudioOutput: MediaDeviceInfo | null
   selectedVideo: MediaDeviceInfo | null
   audioInputDevices: MediaDeviceInfo[]
   audioOutputDevices: MediaDeviceInfo[]
   videoDevices: MediaDeviceInfo[]
   handleDeviceSelect: (type: 'audio-input' | 'audio-output' | 'video', device: MediaDeviceInfo) => void
}

const InterviewControls: React.FC<InterviewControlsProps> = ({
   selectedAudioInput,
   selectedAudioOutput,
   selectedVideo,
   audioInputDevices,
   audioOutputDevices,
   videoDevices,
   handleDeviceSelect,
}) => {
   return (
      <div className="flex flex-wrap items-center w-full gap-2 justify">
         <DeviceSelector
            icon={<IconlyVoice size={20} color={'#000000'} />}
            selectedDevice={selectedAudioInput}
            devices={audioInputDevices}
            onSelect={(device: MediaDeviceInfo) => handleDeviceSelect('audio-input', device)}
            deviceType="audio-input"
         />
         <DeviceSelector
            icon={<IconlyVolumeUp size={20} color={'#000000'} />}
            selectedDevice={selectedAudioOutput}
            devices={audioOutputDevices}
            onSelect={(device: MediaDeviceInfo) => handleDeviceSelect('audio-output', device)}
            deviceType="audio-output"
         />
         <DeviceSelector
            icon={<IconlyVideo size={20} color={'#000000'} />}
            selectedDevice={selectedVideo}
            devices={videoDevices}
            onSelect={(device: MediaDeviceInfo) => handleDeviceSelect('video', device)}
            deviceType="video"
         />
      </div>
   )
}

export default InterviewControls
