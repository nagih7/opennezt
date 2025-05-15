// This file contains declarations for modules that don't have their own type definitions
// You can add more declarations as needed during the conversion process

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.svg' {
    import React from 'react'
    const SVG: React.FC<React.SVGProps<SVGSVGElement>>
    export default SVG
}

// Add other module declarations as needed
