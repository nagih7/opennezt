import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getNotifications } from '~/api/notification'
import { AppDispatch } from '~/store'

const useApp = () => {
   const dispatch = useDispatch<AppDispatch>()

   useEffect(() => {
      dispatch(getNotifications())
   }, [dispatch])
}

export default useApp
