import React from 'react'
import { Flex, Progress } from 'antd'

// Define color mapping type
type ColorMap = {
    [key: string]: string
}

const COLOR: ColorMap = {
    '0%': '#e90e0e',
    '25%': '#e941cf',
    '50%': '#7736f0',
    '75%': '#29dee9',
    '100%': '#00ff2e',
}

interface CompatibilityProps {
    percent: number
}

const Compatibility: React.FC<CompatibilityProps> = ({ percent }) => {
    return (
        <Flex gap="small" wrap>
            <Progress type="dashboard" percent={percent} strokeColor={COLOR} />
        </Flex>
    )
}

export default Compatibility
