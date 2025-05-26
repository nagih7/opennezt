import React from 'react'
import { IconlyCall, IconlyDanger2, IconlySetting, IconlyVoice } from 'components/UI/Iconly'
import { InterviewControlsProps } from '~/types'

const InterviewControls: React.FC<InterviewControlsProps> = ({
   isListening,
   onToggleVoice,
   onCloseInterview,
   onSettings,
   onEmergency,
}) => {
   return (
      <div className="flex items-center justify-center gap-3">
         <button
            className="flex justify-center items-center bg-[#42474a] p-3 rounded-full cursor-pointer hover:bg-[#525759] transition-colors"
            onClick={onSettings}
            title="Settings"
         >
            <IconlySetting size={25} color={'#ffffff'} />
         </button>

         <button
            className="flex items-center justify-center bg-[#ff2c20] p-3 rounded-full cursor-pointer hover:bg-[#e62419] transition-colors"
            onClick={onCloseInterview}
            title="End interview"
         >
            <IconlyCall size={25} color={'#ffffff'} />
         </button>

         <button
            className={`flex justify-center items-center ${
               isListening ? 'bg-green-500 hover:bg-green-600' : 'bg-[#42474a] hover:bg-[#525759]'
            } p-3 rounded-full cursor-pointer transition-colors`}
            onClick={onToggleVoice}
            title={isListening ? 'Stop listening' : 'Start listening'}
         >
            <IconlyVoice size={25} color={'#ffffff'} />
         </button>

         <button
            className="flex justify-center items-center bg-[#42474a] p-3 rounded-full cursor-pointer hover:bg-[#525759] transition-colors"
            onClick={onEmergency}
            title="Emergency"
         >
            <IconlyDanger2 size={25} color={'#ffffff'} />
         </button>
      </div>
   )
}

export default InterviewControls
