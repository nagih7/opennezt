import React from 'react'
import SideBar from './SiderBar'
import Header from './Header'
import { BaseComponentProps } from '~/types'
import useApp from './useApp'

const AppLayout: React.FC<BaseComponentProps> = ({ children }) => {
   useApp()

   return (
      <div className="flex flex-col h-screen bg-main-bg-color">
         <Header />
         <div className="flex flex-1">
            <div className="hidden lg:block">
               <SideBar />
            </div>
            <div className="flex justify-center flex-1 w-full h-[100vh]">
               <main className="flex flex-col items-center w-full overflow-x-hidden overflow-y-auto mb-[70px] bg-mainBackgroundColor">
                  {children}
                  {/* <Footer /> */}
               </main>
            </div>
         </div>
      </div>
   )
}

export default AppLayout
