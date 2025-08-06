export interface AnalyticsEvent {
   event: string
   category: string
   data?: Record<string, any>
}

export const analyticsUtils = {
   track: (event: AnalyticsEvent): void => {
      try {
         // Google Analytics 4
         if (typeof window !== 'undefined' && (window as any).gtag) {
            ;(window as any).gtag('event', event.event, {
               event_category: event.category,
               ...event.data,
            })
         }
      } catch (error) {
         console.warn('Analytics tracking failed:', error)
      }
   },

   trackWebPushEvent: (event: string, data?: Record<string, any>): void => {
      analyticsUtils.track({
         event,
         category: 'WebPush',
         data,
      })
   },
}
