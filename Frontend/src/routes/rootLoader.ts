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
