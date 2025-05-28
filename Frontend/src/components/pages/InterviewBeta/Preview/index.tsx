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
      <div className="p-[16px] w-full h-screen bg-[#ffffff] overflow-y-auto">
         <InterviewNavigation />
         <div className="mt-4 2xl:mt-10">
            <div className="flex w-full h-full">
               <div className="w-1/12"></div>
               <div className="w-10/12">
                  <PermissionAlert
                     error={error}
                     permissionStatus={permissionStatus}
                     requestMediaPermissions={requestMediaPermissions}
                  />

                  <div className="flex flex-col md:flex-row items-center gap-[30px] md:gap-[60px] 2xl:gap-[100px] 2xl:ml-[100px]">
                     <div className="flex flex-col w-full gap-3 md:w-auto over">
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
                     <InterviewJoinSection handleTechnicalIssues={handleTechnicalIssues} />
                  </div>
               </div>
               <div className="w-1/12"></div>
            </div>
         </div>
         <Session videoRef={videoRef} />
      </div>
   )
}

export default Interview
