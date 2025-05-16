import React from 'react'
import { Flex, Progress } from 'antd'
import PropTypes from 'prop-types'

const COLOR = {
    '0%': '#e90e0e',
    '25%': '#e941cf',
    '50%': '#7736f0',
    '75%': '#29dee9',
    '100%': '#00ff2e',
}

const Compatibility = ({ percent }) => {
    return (
        <Flex gap="small" wrap>
            <Progress type="dashboard" percent={percent} strokeColor={COLOR} />
        </Flex>
    )
}

Compatibility.propTypes = {
    percent: PropTypes.number.isRequired,
}

export default Compatibility
