import React from 'react'
import VideoPreview from './components/VideoPreview'
import PermissionAlert from './components/PermissionAlert'
import InterviewControls from './components/InterviewControls'
import InterviewJoinSection from './components/InterviewJoinSection'
import InterviewHeader from './components/InterviewHeader'
import InterviewNavigation from './components/InterviewNavigation'
import Session from '../Session'
import { useInterviewPreview } from '../hooks'

const Interview: React.FC = () => {
   const {
      audioInputDevices,
      audioOutputDevices,
      videoDevices,
      error,
      permissionStatus,
      videoRef,
      selectedAudioInput,
      selectedAudioOutput,
      selectedVideo,
      requestMediaPermissions,
      handleDeviceSelect,
      handleTechnicalIssues,
   } = useInterviewPreview()

   return (
      <div className="p-[16px] w-full h-screen bg-[#ffffff] overflow-y-auto flex flex-col items-center">
         <InterviewNavigation />
         <div className="flex flex-col w-10/12 h-full mt-4 2xl:mt-10">
            <PermissionAlert
               error={error}
               permissionStatus={permissionStatus}
               requestMediaPermissions={requestMediaPermissions}
            />

            <div className="flex flex-col lg:flex-row items-center gap-10 2xl:gap-[100px] w-full">
               <div className="flex flex-col w-2/3 gap-3 overflow-hidden">
                  <InterviewHeader />
                  <VideoPreview videoRef={videoRef} />
                  <InterviewControls
                     selectedAudioInput={selectedAudioInput}
                     selectedAudioOutput={selectedAudioOutput}
                     selectedVideo={selectedVideo}
                     audioInputDevices={audioInputDevices}
                     audioOutputDevices={audioOutputDevices}
                     videoDevices={videoDevices}
                     handleDeviceSelect={handleDeviceSelect}
                  />
               </div>
               <div className="w-1/3">
                  <InterviewJoinSection handleTechnicalIssues={handleTechnicalIssues} />
               </div>
            </div>
         </div>
         <Session videoRef={videoRef} />
      </div>
   )
}

export default Interview
