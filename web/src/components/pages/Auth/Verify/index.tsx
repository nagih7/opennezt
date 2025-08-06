import React from 'react'
import Gmail from '~/assets/images/icon/gmail.svg'
import { Button } from '@chakra-ui/react'
import useVerifyAuth from './useVerifyAuth'

const Verify: React.FC = () => {
   const { authRegister, handleNavigateToLogin } = useVerifyAuth()

   return (
      <div className="flex items-center justify-center w-full h-[100vh] ">
         <div className="flex flex-col items-center justify-center p-8 rounded-md shadow-xl">
            <img src={Gmail} alt="gmail" className="my-4" />
            <div className="text-xl font-semibold text-[#4374c0] mb-4">Verify your email address</div>
            <div className="text-center">
               <p className="text-sm text-gray-500">
                  We have sent an email to{' '}
                  <a href="https://gmail.com" target="_blank" rel="noopener noreferrer">
                     {authRegister?.email}
                  </a>
               </p>
               <p className="text-sm text-gray-500">Please check your email to verify your account.</p>
            </div>

            <Button className="bg-[#4374c0] hover:bg-[#4374c0]/80 text-white my-4" onClick={handleNavigateToLogin}>
               Back to sign in
            </Button>
         </div>
      </div>
   )
}

export default Verify
