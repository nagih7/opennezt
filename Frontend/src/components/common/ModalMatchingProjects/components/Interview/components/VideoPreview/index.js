import React from 'react'

const VideoPreview = ({ videoRef }) => {
    return (
        <div className="relative w-full aspect-video max-w-[640px] bg-gray-900 rounded-lg overflow-hidden">
            <video
                ref={videoRef}
                width="100%"
                height="100%"
                autoPlay
                playsInline
                muted
                className="object-cover w-full h-full"
                style={{ transform: 'scaleX(-1)' }} // Mirror effect
            />
            <div className="absolute px-2 py-1 text-sm text-white bg-black bg-opacity-50 rounded bottom-4 right-4">
                Preview
            </div>
        </div>
    )
}

export default VideoPreview
