import React from 'react'
import SideBar from './SiderBar'
import Header from './Header'
import LazyLoading from '~/components/UI/LazyLoading'
import { BaseComponentProps } from '~/types'
const AppLayout: React.FC<BaseComponentProps> = ({ children }) => {
   return (
      <div className="flex flex-col h-screen bg-main-bg-color">
         <Header />
         <div className="flex flex-1">
            <div className="hidden lg:block">
               <SideBar />
            </div>
            <div className="flex justify-center flex-1 w-full h-full max-h-full ">
               <main className="flex flex-col items-center w-full overflow-x-hidden overflow-y-auto mb-[70px] bg-mainBackgroundColor">
                  <LazyLoading>{children}</LazyLoading>
                  {/* <Footer /> */}
               </main>
            </div>
         </div>
      </div>
   )
}

export default AppLayout
