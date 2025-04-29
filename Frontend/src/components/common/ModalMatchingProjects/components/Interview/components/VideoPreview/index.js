import React, { useRef } from 'react'
import { IconlyMoreCircle } from 'components/UI/Iconly'
import { OPENNEZT_INTERVIEW_LISTEN } from 'utils/constants'

const VideoPreview = () => {
    // STATE FROM REDUX STORE
    const interviewVideoRef = useRef(null)

    return (
        <div className="relative bg-[#000000]  w-full h-full  rounded-md overflow-hidden">
            <video
                ref={interviewVideoRef}
                width="100%"
                height="100%"
                loop
                autoPlay
                muted
                playsInline
                style={{ outline: 'none' }}
                src={OPENNEZT_INTERVIEW_LISTEN}
                onLoadedMetadata={(e) => {
                    if (e.target.paused) e.target.play().catch((error) => console.warn('Video autoplay failed:', error))
                }}
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
            />
            <div className="bg-[#ffffff] rounded-full absolute bottom-[15px] left-[20px] z-10">
                <IconlyMoreCircle size={20} color={'#4374c0'} />
            </div>
        </div>
    )
}

export default VideoPreview
