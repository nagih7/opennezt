import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '~/api/auth'
import { RootState, useAppSelector, AppDispatch } from '~/store'
import { AuthRole, Location, RouteConfig } from '~/types'
import { AdminRoute, UserRoute } from '~/routes'

const useSidebar = () => {
   const dispatch = useDispatch<AppDispatch>()
   const navigate = useNavigate()

   // Store
   const { authUser } = useAppSelector((state: RootState) => state.auth)
   const { isShowSideBar } = useAppSelector((state: RootState) => state.app)
   const [location, setLocation] = useState<Location>({
      pathName: '',
      payload: {},
      prevPathName: '',
   })

   // Effect
   useEffect(() => {
      if (location.pathName !== location.prevPathName) {
         setLocation({
            pathName: location.pathName,
            payload: location.payload,
            prevPathName: location.pathName,
         })
         navigate(location.pathName)
      }
   }, [location, navigate])

   // Function
   const handleToggleMenu = (navbarItem: RouteConfig) => {
      if (navbarItem.path) {
         navigate(navbarItem.path)
      }
   }

   const handleConfirmLogOut = () => {
      dispatch(logout())
      window.location.reload()
   }

   return {
      authUser,
      routes: UserRoute,
      isShowSideBar,
      handleToggleMenu,
      handleConfirmLogOut,
      navigate,
   }
}

export default useSidebar
