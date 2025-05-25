import React from 'react'
import { Progress } from '../../UI/progress'

// Define color mapping type
// type ColorMap = {
//     [key: string]: string
// }

// const COLOR: ColorMap = {
//     '0%': '#e90e0e',
//     '25%': '#e941cf',
//     '50%': '#7736f0',
//     '75%': '#29dee9',
//     '100%': '#00ff2e',
// }

interface CompatibilityProps {
   percent: number
}

const Compatibility: React.FC<CompatibilityProps> = ({ percent }) => {
   return (
      <div className="flex gap-2 flex-wrap">
         <Progress value={percent} className="w-32" />
      </div>
   )
}

export default Compatibility
