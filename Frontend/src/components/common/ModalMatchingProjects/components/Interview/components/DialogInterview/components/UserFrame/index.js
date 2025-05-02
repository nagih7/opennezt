import React from 'react'

const UserFrame = ({ videoRef }) => {
    return (
        <div className="absolute bottom-0 right-0 p-4">
            <video
                ref={videoRef}
                width="200"
                height="200"
                className="rounded-md"
                autoPlay
                playsInline
                style={{ outline: 'none' }}
                disablePictureInPicture
            />
        </div>
    )
}

export default UserFrame
