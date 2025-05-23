import React from 'react'
import LazyLoading from 'components/UI/LazyLoading'
import banner from '../../../assets/images/background/banner_auth_layout.jpg'
import { AuthLayoutProps } from '~/types'
import { Auth } from '~/config/constants'

const Banner = () => {
   return (
      <div className="flex-col hidden w-1/2 h-full gap-2 overflow-hidden xl:flex">
         <div className="h-1/2">
            <img src={banner} alt="banner" className="object-cover w-full h-full" />
         </div>

         <div className="flex flex-col items-center justify-center flex-1 gap-2 p-4 text-center">
            <h3 className="">Connecting Visionaries, Building Futures</h3>
            <p className="">
               OpenNezt is a platform that connects founders with talented individuals, enabling easy collaboration to
               build strong teams and bring ideas to life.
            </p>
         </div>
      </div>
   )
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, path }) => {
   return (
      <div className="w-full h-[100vh] flex items-center justify-center">
         <div className="flex w-2/5 bg-white rounded-md shadow-lg">
            {(() => {
               switch (path) {
                  case Auth.LOGIN:
                     return (
                        <>
                           <div className="w-full h-full p-4 xl:w-1/2">
                              <LazyLoading>{children}</LazyLoading>
                           </div>
                           <Banner />
                        </>
                     )
                  case Auth.REGISTER:
                     return (
                        <>
                           <Banner />
                           <div className="w-full h-full p-4 xl:w-1/2">
                              <LazyLoading>{children}</LazyLoading>
                           </div>
                        </>
                     )
                  case Auth.FORGOT_PASSWORD:
                     return (
                        <>
                           <div className="w-full h-full p-4 xl:w-1/2">
                              <LazyLoading>{children}</LazyLoading>
                           </div>
                           <Banner />
                        </>
                     )
                  default:
                     return (
                        <>
                           <LazyLoading>{children}</LazyLoading>
                        </>
                     )
               }
            })()}
         </div>
      </div>
   )
}

export default AuthLayout
