import { redirect } from 'react-router-dom'
import store from '../states/configureStore'
import { initialSaga } from '../states/modules/routing'
import { hasPermission } from '../utils/helper'
import { getMe } from 'api/auth'
import { getAuthToken } from '../utils/localStorage'
import { LoaderFunctionArgs } from '@remix-run/router'

interface CustomLoaderArgs extends LoaderFunctionArgs {
   request: Request
}

export const rootLoader = async (
   { request }: CustomLoaderArgs,
   isAuth = false,
   saga: string | null = null,
   permissions: string[] = []
) => {
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
   }

   return null
}
