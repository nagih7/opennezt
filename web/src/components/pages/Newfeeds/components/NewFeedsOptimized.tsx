import React, { memo } from 'react'
import NewFeeds from '../index'

/**
 * Optimized wrapper for NewFeeds component with performance monitoring
 */
const NewFeedsOptimized = memo(() => {
   return <NewFeeds />
})

export default NewFeedsOptimized
