import React from 'react'
import VideoPreview from './components/VideoPreview'
import PermissionAlert from './components/PermissionAlert'
import InterviewControls from './components/InterviewControls'
import InterviewJoinSection from './components/InterviewJoinSection'
import InterviewHeader from './components/InterviewHeader'
import InterviewNavigation from './components/InterviewNavigation'
import InterviewSession from '../Session'
import InterviewErrorBoundary from './components/ErrorBoundary'
import { useDeviceLists, usePermissionData } from './hooks'
import useInterviewPreview from './useInterviewPreview'

const Interview: React.FC = () => {
   return (
      <InterviewErrorBoundary>
         <InterviewContent />
      </InterviewErrorBoundary>
   )
}

const InterviewContent: React.FC = () => {
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
   } = useInterviewPreview()

   // Use optimization hooks for better performance
   const deviceLists = useDeviceLists(audioInputDevices, audioOutputDevices, videoDevices)
   const permissionData = usePermissionData(permissionStatus, error)

   return (
      <div className="p-[16px] w-full h-screen bg-[#ffffff] overflow-y-auto flex flex-col items-center">
         <InterviewNavigation />
         <div className="flex flex-col w-10/12 h-full mt-4 2xl:mt-10">
            <PermissionAlert
               error={permissionData.error}
               permissionStatus={permissionData.permissionStatus}
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
                     audioInputDevices={deviceLists.audioInputDevices}
                     audioOutputDevices={deviceLists.audioOutputDevices}
                     videoDevices={deviceLists.videoDevices}
                     handleDeviceSelect={handleDeviceSelect}
                  />
               </div>
               <InterviewJoinSection />
            </div>
         </div>
         <InterviewSession />
      </div>
   )
}

export default Interview
