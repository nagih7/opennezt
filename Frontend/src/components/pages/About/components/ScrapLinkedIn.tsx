import React, { ChangeEvent } from 'react'
import logo_opennezt_img from '../../../../assets/images/logo/opennezt_full_black_old.png'
import { Dialog, DialogContent, DialogTrigger } from '~/components/UI/dialog'
import { Button } from '~/components/UI/button'

interface ScrapLinkedInProps {
   username: string
   open: boolean
   confirmed: boolean
   hideNotification: boolean
   setOpen: (status: boolean) => void
   onChange: (e: ChangeEvent<HTMLInputElement>) => void
   onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
   onConfirm: (e: ChangeEvent<HTMLInputElement>) => void
   onHideNotification: (e: ChangeEvent<HTMLInputElement>) => void
   onSubmit: () => void
   onSkip: () => void
}

const ScrapLinkedIn: React.FC<ScrapLinkedInProps> = ({
   open,
   username,
   confirmed,
   hideNotification,
   setOpen,
   onChange,
   onKeyDown,
   onConfirm,
   onHideNotification,
   onSubmit,
   onSkip,
}) => {
   return (
      <Dialog open={open}>
         <DialogTrigger asChild>
            <Button type="submit" onClick={() => setOpen(true)}>
               Confirm
            </Button>
         </DialogTrigger>
         <DialogContent className="w-screen h-screen max-w-full max-h-full ">
            <div className="flex flex-col items-center justify-center gap-5 p-10">
               <div className="flex flex-col items-center gap-5">
                  <div className="flex items-center justify-center gap-2">
                     <span className="text-3xl font-extrabold">How do you want to complete your</span>
                     <img src={logo_opennezt_img} alt="" className="h-8" />
                     <span className="text-3xl font-extrabold">profile?</span>
                  </div>
                  <div className="flex items-center gap-1 text-xl font-semibold">
                     <span>Choose a method to complete your profile. Using</span>
                     <span className="text-[#2f65b9] font-extrabold">LinkedIn</span>
                     <span>is recommended for the best matching experience.</span>
                  </div>
                  <div className="flex items-center justify-center w-full gap-3 text-xl font-semibold">
                     <span>www.linkedin.com/in/</span>
                     <input
                        type="text"
                        className="w-auto border-b border-black outline-none"
                        value={username}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                     />
                  </div>
                  <div className="flex items-center gap-2 mt-10 font-medium text-md">
                     <input
                        type="checkbox"
                        name="name"
                        className="w-4 h-4 cursor-pointer"
                        checked={confirmed}
                        onChange={onConfirm}
                     />
                     <label htmlFor="name" className="text-gray-500 user-select-none">
                        I confirm this is my LinkedIn account. Misuse will result in a permanent ban.
                     </label>
                  </div>
                  <div className="mt-[-10px]">
                     <button className="bg-[#2f65b9] text-white px-16 py-2 rounded-md font-semibold" onClick={onSubmit}>
                        Submit
                     </button>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-[200px] border-t-2 border-gray-200 pb-3" />
                     <span className="mt-[-22px] text-lg font-medium text-gray-300">or</span>
                     <div className="w-[200px] border-t-2 border-gray-200 pb-3" />
                  </div>
                  <div className="flex items-center gap-2 font-medium text-md">
                     <input
                        type="checkbox"
                        name="hideNotification"
                        className="w-4 h-4 cursor-pointer"
                        checked={hideNotification}
                        onChange={onHideNotification}
                     />
                     <label htmlFor="hideNotification" className="text-gray-500 user-select-none">
                        {`Don't show this notification again`}
                     </label>
                  </div>
                  <button className="bg-[#2f65b9] text-white px-8 py-2 rounded-md font-semibold" onClick={onSkip}>
                     Skip for Now
                  </button>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   )
}

export default ScrapLinkedIn
