import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '~/store'
import { getActivitiesArticle } from '~/api/activity'

interface Activity {
   user?: {
      name?: string
   }
   activity_type?: {
      name?: string
   }
   article?: {
      caption?: string
   }
}

/**
 * Custom hook for managing activities sidebar
 */
export const useActivities = () => {
   const dispatch = useAppDispatch()
   const initialFetchCompleted = useRef(false)

   const { activities, isLoadingActivities, limit: activitiesLimit } = useAppSelector((state) => state.activity)

   useEffect(() => {
      // Only fetch activities if this is the first time or if the limit has changed
      if (!initialFetchCompleted.current || initialFetchCompleted.current === false) {
         dispatch(getActivitiesArticle({ skip: 0, limit: activitiesLimit }))
         initialFetchCompleted.current = true
      }
   }, [dispatch, activitiesLimit])

   return {
      activities,
      isLoadingActivities,
   }
}

/**
 * Utility function to format activity messages
 */
export const unifiedAction = (activity: Activity | string | null): React.ReactElement => {
   if (typeof activity === 'string' || !activity || activity === null) {
      return React.createElement('span', null, 'has interacted with ', activity)
   }

   try {
      const { user, activity_type, article } = activity
      const displayName = user?.name || 'Someone'

      const activityTypeName = activity_type?.name
      const articleCaption = article?.caption
         ? `"${article.caption.length > 20 ? article.caption.substring(0, 20) + '...' : article.caption}"`
         : 'an article'

      switch (activityTypeName) {
         case 'save':
            return React.createElement('span', null, 'You has saved ', articleCaption)
         case 'update':
            return React.createElement('span', null, 'You has updated ', articleCaption)
         case 'create':
            return React.createElement('span', null, 'has created ', articleCaption)
         case 'reply_comment':
            return React.createElement('span', null, 'has replied to your comment on ', articleCaption)
         case 'comment':
            return React.createElement('span', null, 'has commented on ', articleCaption)
         case 'reaction':
            return React.createElement('span', null, 'liked your post ', articleCaption)
         default:
            return React.createElement('span', null, displayName, ' has interacted with ', articleCaption)
      }
   } catch (error) {
      console.error('Error processing activity:', error)
      return React.createElement('span', null, 'has performed an activity')
   }
}
