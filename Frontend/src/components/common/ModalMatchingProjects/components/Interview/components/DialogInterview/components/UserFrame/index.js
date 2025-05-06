import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const UserFrame = ({ videoRef }) => {
    const { hasJoined } = useSelector((state) => state.interview)
    const localVideoRef = useRef(null)

    // Apply stream from main videoRef to this video element
    useEffect(() => {
        if (videoRef?.current?.srcObject && localVideoRef.current) {
            // Set the srcObject property on the video element ref
            localVideoRef.current.srcObject = videoRef.current.srcObject
            console.log('UserFrame: Video stream connected', videoRef.current.srcObject)
        }
    }, [videoRef, hasJoined])

    if (!hasJoined) return null

    return (
        <div className="absolute bottom-0 right-0 p-4">
            <video
                ref={localVideoRef}
                width="200"
                height="200"
                className="rounded-md"
                autoPlay
                playsInline
                muted
                style={{ transform: 'scaleX(-1)', outline: 'none' }}
                disablePictureInPicture
            />
        </div>
    )
}

export default UserFrame
