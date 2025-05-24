import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '~/api/auth'
import { AppDispatch } from '~/store'
import { setAuthState } from '~/store/modules/auth'
import { AuthState } from '~/store/modules/auth/types'
import { getAuthToken } from '~/utils/localStorage'

const useAuth = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch<AppDispatch>()

   // State
   const [authToken, setAuthToken] = useState<string | null>(null)

   // Effect
   useEffect(() => {
      const token = getAuthToken()
      if (token) {
         setAuthToken(token)
         getAuth()
      }
   }, [])

   // Function
   const getAuth = async () => {
      // getMe()
      //    .then((res) => {
      //       dispatch(
      //          setAuthState({
      //             isAuthSuccess: true,
      //             authRole: res.data.role,
      //             authUser: res.data,
      //             authorize: res.data.role,
      //          } as AuthState)
      //       )
      //    })
      //    .catch((error) => {
      //       console.error('Failed to fetch user data', error)
      //       navigate('/')
      //    })
   }

   return {
      getAuth,
   }
}

export default useAuth
