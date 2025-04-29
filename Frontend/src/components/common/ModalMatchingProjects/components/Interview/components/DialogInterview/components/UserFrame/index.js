import React from 'react'
import img from '../../../../../../../../../assets/images/background/auth.jpg'

const UserFrame = ({ videoRef }) => {
    return (
        <div className="absolute bottom-0 right-0 p-4">
            <img src={img} className="h-[200px] rounded-md" alt="Interview background" />
            {/* <video
                ref={videoRef}
                width="100%"
                height="100%"
                autoPlay
                playsInline
                style={{ outline: 'none' }}
                disablePictureInPicture
            /> */}
        </div>
    )
}

export default UserFrame
