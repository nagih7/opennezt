import React from 'react'

// Hàm xử lý escape HTML và thay \n bằng <br/>
function formatMessage(message) {
    const escapeHTML = (str) => {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
    }

    const escaped = escapeHTML(message)

    // Split theo \n để render thành <br/>
    return escaped.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ))
}

export default formatMessage
