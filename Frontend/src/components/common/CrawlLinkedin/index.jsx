import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import React, { useState } from 'react'
import logo_opennezt_img from '../../../assets/images/logo/opennezt_full_black_old.png'
import { toaster } from 'components/UI/toaster'

const CrawlLinkedin = () => {
    const [linkedinUsername, setLinkedinUsername] = useState('')
    const [isConfirmed, setIsConfirmed] = useState(false)

    const handleUsernameChange = (e) => {
        setLinkedinUsername(e.target.value)
    }

    const handleConfirmationChange = (e) => {
        setIsConfirmed(e.target.checked)
    }

    const verifyAndSubmit = () => {
        if (!linkedinUsername.trim()) {
            toaster.create({
                type: 'error',
                title: 'LinkedIn username is required',
            })
            return false
        }

        if (!isConfirmed) {
            toaster.create({
                type: 'error',
                title: 'Please confirm this is your LinkedIn account',
            })
            return false
        }
        return true
    }

    const handleSubmit = () => {
        if (verifyAndSubmit()) {
            toaster.create({
                type: 'success',
                title: `Profile submission initiated for: ${linkedinUsername}`,
            })
        }
    }

    return (
        <Dialog.Root size="full" motionPreset="slide-in-bottom">
            <Dialog.Trigger asChild>
                <Button variant="outline" size="sm">
                    Open Dialog
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>{/* <Dialog.Title>Dialog Title</Dialog.Title> */}</Dialog.Header>
                        <Dialog.Body>
                            <div className="flex flex-col items-center gap-5">
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-3xl font-extrabold">How do you want to complete your</span>
                                    <img src={logo_opennezt_img} alt="" className="h-8" />
                                    <span className="text-3xl font-extrabold">profile?</span>
                                </div>
                                <div className="flex items-center gap-1 font-semibold text-xl">
                                    <span>Choose a method to complete your profile. Using</span>
                                    <span className="text-[#2f65b9] font-extrabold">LinkedIn</span>
                                    <span>is recommended for the best matching experience.</span>
                                </div>
                                <div className="flex items-center gap-3 text-xl font-semibold">
                                    <span>www.linkedin.com/in/</span>
                                    <input
                                        type="text"
                                        className="outline-none border-b w-20 border-black"
                                        value={linkedinUsername}
                                        onChange={handleUsernameChange}
                                    />
                                    <span>or</span>
                                    <span className="flex items-center gap-2">
                                        Sign in with
                                        <a
                                            href="https://www.linkedin.com/checkpoint/rm/sign-in-another-account?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin"
                                            className="text-[#2f65b9] outline-none"
                                        >
                                            LinkedIn
                                        </a>
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mt-10 text-md font-medium">
                                    <input
                                        type="checkbox"
                                        name="name"
                                        className="w-4 h-4"
                                        checked={isConfirmed}
                                        onChange={handleConfirmationChange}
                                    />
                                    <label htmlFor="name" className="text-gray-500">
                                        I confirm this is my LinkedIn account. Misuse will result in a permanent ban.
                                    </label>
                                </div>
                                <div className="mt-[-10px]">
                                    <button
                                        className="bg-[#2f65b9] text-white px-16 py-2 rounded-md font-semibold"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="border-t-2 border-gray-200 w-full">
                                        <div className="text-[#ffffff]">
                                            lákjdlaskjdaslkdjsaldjsalkjlaaaaaaaaaaaaaaa
                                        </div>
                                    </div>
                                    <span className="mt-[-22px] text-lg font-medium text-gray-300">or</span>
                                    <div className="border-t-2 border-gray-200 w-full">
                                        <div className="text-[#ffffff]">
                                            lákjdlaskjdaslkdjsaldjsalkjlaaaaaaaaaaaaaaa
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className="bg-[#2f65b9] text-white px-8 py-2 rounded-md font-semibold">
                                        Enter Your Profile Manually
                                    </button>
                                </div>
                            </div>
                        </Dialog.Body>
                        {/* <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button>Save</Button>
                        </Dialog.Footer> */}
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default CrawlLinkedin
