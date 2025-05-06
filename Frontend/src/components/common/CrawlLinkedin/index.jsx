import { Dialog, Portal } from '@chakra-ui/react'
import React, { useState } from 'react'
import logo_opennezt_img from '../../../assets/images/logo/opennezt_full_black_old.png'
import { toaster } from 'components/UI/toaster'
import { useDispatch } from 'react-redux'
import { matchingProjects } from 'api/artificialIntelligence'

const CrawlLinkedin = ({ status, setStatus }) => {
    const dispatch = useDispatch()
    // =========== STATE =========== //
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
            dispatch(matchingProjects(linkedinUsername))
            setStatus(false)
        }
    }

    const handleSkip = () => {
        dispatch(matchingProjects())
        setStatus(false)
    }

    return (
        <Dialog.Root size="full" motionPreset="slide-in-bottom" lazyMount open={status}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        {/* <Dialog.Header></Dialog.Header> */}
                        <Dialog.Body className="flex flex-col items-center justify-center gap-5 p-10">
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
                                        value={linkedinUsername}
                                        onChange={handleUsernameChange}
                                    />
                                    {/* <span>or</span>
                                    <span className="flex items-center gap-2">
                                        Sign in with
                                        <a
                                            href="https://www.linkedin.com/checkpoint/rm/sign-in-another-account?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin"
                                            className="text-[#2f65b9] outline-none"
                                        >
                                            LinkedIn
                                        </a>
                                    </span> */}
                                </div>
                                <div className="flex items-center gap-2 mt-10 font-medium text-md">
                                    <input
                                        type="checkbox"
                                        name="name"
                                        className="w-4 h-4 cursor-pointer"
                                        checked={isConfirmed}
                                        onChange={handleConfirmationChange}
                                    />
                                    <label htmlFor="name" className="text-gray-500 user-select-none">
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
                                    <div className="w-[200px] border-t-2 border-gray-200 pb-3" />
                                    <span className="mt-[-22px] text-lg font-medium text-gray-300">or</span>
                                    <div className="w-[200px] border-t-2 border-gray-200 pb-3" />
                                </div>
                                <div>
                                    {/* <button className="bg-[#2f65b9] text-white px-8 py-2 rounded-md font-semibold">
                                        Enter Your Profile Manually
                                    </button> */}
                                    <button
                                        className="bg-[#2f65b9] text-white px-8 py-2 rounded-md font-semibold"
                                        onClick={handleSkip}
                                    >
                                        Skip for Now
                                    </button>
                                </div>
                            </div>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default CrawlLinkedin
