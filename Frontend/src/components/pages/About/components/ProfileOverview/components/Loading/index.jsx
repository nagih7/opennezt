import React from 'react'
import './index.scss'
import PropTypes from 'prop-types'

const Loading = () => {
    return (
        <div className="flex items-center user-select-none">
            <div className="my-auto rounded-md loading">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
            <div className="loader">
                <div className="scanner ">
                    <span>OpenNezt...</span>
                </div>
            </div>
        </div>
    )
}

Loading.propTypes = {
    // This component doesn't currently accept props
}

export default Loading
