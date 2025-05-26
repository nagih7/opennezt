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

declare module '*.mp4' {
   const src: string
   export default src
}

declare module '*.webm' {
   const src: string
   export default src
}

declare module '*.ogg' {
   const src: string
   export default src
}

// Add other module declarations as needed
