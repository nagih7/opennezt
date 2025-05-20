import { redirect } from 'react-router-dom'
import store from '~/store'
import { initialSaga } from '~/store/modules/routing'
import { hasPermission } from '~/utils/helper'
import { getMe } from 'api/auth'
import { getAuthToken } from '~/utils/localStorage'

// Define a more flexible interface that works with both loaders
interface LoaderArgs {
   request: Request
   params?: Record<string, string | undefined>
}

export const rootLoader = async (
   loaderArgs: LoaderArgs | { request: Request },
   isAuth = false,
   saga: string | null = null,
   permissions: string[] = []
) => {
   // Ensure we always have a request object
   const request = 'request' in loaderArgs ? loaderArgs.request : null
   if (!request) {
      console.error('Request object is missing from loader arguments')
      return null
   }

   const url = new URL(request.url) // CHECK PATHNAME
   if (url.pathname === '/profile') {
      await store.dispatch(getMe())
   }

   let { auth } = store.getState()

   if (
      !auth.isAuthSuccess &&
      getAuthToken() &&
      url.pathname !== 'verify-authentication' &&
      url.pathname !== 'forgot-password'
   ) {
      await store.dispatch(getMe())
      auth = store.getState().auth
   }

   if (isAuth) {
      if (!auth.isAuthSuccess) {
         return redirect('/login')
      }
      if (permissions.length > 0 && !hasPermission(permissions)) {
         return redirect('/')
      }
   }

   if (saga) {
      store.dispatch(initialSaga(saga))
   } // Return null as a valid loader result
   return null
}

// rootLoader.js
// import { redirect } from 'react-router-dom'
// import store from '~/store'
// import { initialSaga } from '~/store/modules/routing'
// import { hasPermission } from '~/utils/helper'
// import { getMe } from 'api/auth'
// import { getAuthToken } from '~/utils/localStorage'

// /**
//  * Root loader function for handling route transitions
//  * @param {Object} loaderArgs - The loader arguments
//  * @param {Request} loaderArgs.request - The request object
//  * @param {Object} [loaderArgs.params] - The route parameters
//  * @param {boolean} isAuth - Whether authentication is required
//  * @param {string|null} saga - The saga to initialize
//  * @param {string[]} permissions - The required permissions
//  * @returns {Promise<null|Response>} - Null or a redirect response
//  */
// export const rootLoader = async (loaderArgs, isAuth = false, saga = null, permissions = []) => {
//    // Ensure we always have a request object
//    const request = loaderArgs && 'request' in loaderArgs ? loaderArgs.request : null
//    if (!request) {
//       console.error('Request object is missing from loader arguments')
//       return null
//    }

//    const url = new URL(request.url) // CHECK PATHNAME
//    if (url.pathname === '/profile') {
//       await store.dispatch(getMe())
//    }

//    let { auth } = store.getState()

//    if (
//       !auth.isAuthSuccess &&
//       getAuthToken() &&
//       url.pathname !== 'verify-authentication' &&
//       url.pathname !== 'forgot-password'
//    ) {
//       await store.dispatch(getMe())
//       auth = store.getState().auth
//    }

//    if (isAuth) {
//       if (!auth.isAuthSuccess) {
//          return redirect('/login')
//       }

//       if (permissions.length > 0 && !hasPermission(permissions)) {
//          return redirect('/')
//       }
//    }

//    if (saga) {
//       store.dispatch(initialSaga(saga))
//    }

//    // Return null as a valid loader result
//    return null
// }
