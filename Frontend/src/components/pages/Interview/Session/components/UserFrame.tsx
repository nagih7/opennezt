import { UserFrameProps } from '~/types'

const UserFrame = ({ videoRef }: UserFrameProps) => {
   return (
      <div className="absolute bottom-0 right-0 p-4">
         <div className="relative">
            <video
               ref={videoRef}
               width="200"
               height="200"
               className="transition-opacity duration-300 border-2 rounded-md shadow-lg opacity-100 border-green-400/40"
               autoPlay
               playsInline
               muted
               style={{ transform: 'scaleX(-1)', outline: 'none' }}
               disablePictureInPicture
               controlsList="nodownload nofullscreen noremoteplaybook"
            />
         </div>
      </div>
   )
}

export default UserFrame
