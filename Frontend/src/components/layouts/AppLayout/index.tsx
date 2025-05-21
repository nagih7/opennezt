import React, { ReactNode, useEffect } from 'react'
import styles from './styles.module.scss'
import SideBar from './SiderBar'
import Header from './Header'
import { useSelector, useDispatch } from 'react-redux'
import LazyLoading from 'components/UI/LazyLoading'
import { RealtimeProvider } from 'contexts'
import { useNavigate } from 'react-router-dom'
import { setLocation } from 'store/modules/app'
import { RootState } from '~/store'
// import { SkeletonTheme } from "react-loading-skeleton";

interface AppLayoutProps {
   children: ReactNode
}

interface LocationState {
   pathName: string
   prevPathName: string
   payload?: any
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const isShowSideBar = useSelector((state: RootState) => state.app.isShowSideBar)
   // const isThemeLight = useSelector((state) => state.app.isThemeLight);
   const location = useSelector((state: RootState) => state.app.location)

   useEffect(() => {
      if (location.pathName !== location.prevPathName) {
         dispatch(
            setLocation({
               pathName: location.pathName,
               payload: location.payload,
               prevPathName: location.pathName,
            })
         )
         navigate(location.pathName)
      }
   }, [location, navigate, dispatch])

   return (
      <RealtimeProvider>
         <div className={`${styles.boxMainLayout}`}>
            <div className={styles.mainLayoutWrap}>
               <Header />
               <div
                  style={{ display: 'flex' }}
                  className={`${styles.mainWrap} ${
                     !isShowSideBar ? styles.mainWrapWithConditionSideBarClose : ''
                  }, h-full `}
               >
                  <div className="hidden lg:block">
                     <SideBar
                     // isThemeLight={isThemeLight}
                     // isShowSideBar={isShowSideBar}
                     />
                  </div>
                  <div className="flex justify-center flex-1 w-full h-full max-h-full ">
                     <main className={`${styles.mainContentWrap} w-full flex flex-col  items-center`}>
                        <LazyLoading>{children}</LazyLoading>
                        {/* <Footer /> */}
                     </main>
                  </div>
               </div>
            </div>
         </div>
      </RealtimeProvider>
   )
}

export default AppLayout
