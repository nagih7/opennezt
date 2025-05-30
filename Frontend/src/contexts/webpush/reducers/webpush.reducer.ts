import { WebPushState, SubscriptionStatus, NotificationPermissionStatus } from '../webpush.types'
import { WebPushAction } from './webpush.actions'

export const initialWebPushState: WebPushState = {
   status: SubscriptionStatus.UNSUBSCRIBED,
   subscription: null,
   subscriptionInfo: null,
   error: null,
   isLoading: false,
   isSupported: false,
   permissionStatus: NotificationPermissionStatus.DEFAULT,
   registration: null,
}

export const webPushReducer = (state: WebPushState, action: WebPushAction): WebPushState => {
   switch (action.type) {
      case 'SET_LOADING':
         return {
            ...state,
            isLoading: action.payload,
            error: action.payload ? null : state.error, // Clear error when loading starts
         }

      case 'SET_ERROR':
         return {
            ...state,
            error: action.payload,
            isLoading: false,
            status: action.payload ? SubscriptionStatus.ERROR : state.status,
         }

      case 'SET_SUBSCRIPTION':
         return {
            ...state,
            subscription: action.payload.subscription,
            subscriptionInfo: action.payload.info,
            status: action.payload.subscription ? SubscriptionStatus.SUBSCRIBED : SubscriptionStatus.UNSUBSCRIBED,
            error: null,
         }

      case 'SET_STATUS':
         return { ...state, status: action.payload }

      case 'SET_PERMISSION':
         return { ...state, permissionStatus: action.payload }

      case 'SET_REGISTRATION':
         return { ...state, registration: action.payload }

      case 'SET_SUPPORTED':
         return { ...state, isSupported: action.payload }

      case 'RESET_STATE':
         return initialWebPushState

      default:
         return state
   }
}
