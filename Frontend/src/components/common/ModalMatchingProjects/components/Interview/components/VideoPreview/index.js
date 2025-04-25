import React from 'react'
import { IconlyMoreCircle } from 'components/UI/Iconly'
import { OPENNEZT_INTERVIEW_LISTEN } from 'utils/constants'
import { useSelector } from 'react-redux'

const VideoPreview = ({ videoRef }) => {
    // STATE FROM REDUX STORE
    const { hasJoined, conversation, messages } = useSelector((state) => state.interview)

    return (
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
    )
}

export default VideoPreview
