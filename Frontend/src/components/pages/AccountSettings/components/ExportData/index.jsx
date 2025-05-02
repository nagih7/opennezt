import React from 'react'
import AccountSettingsMenu from '../AccountSettingsMenu'
import ActionBarSettings from '../ActionBarSettings'
import AccountSettingsCard from '../AccountSettingsCard'

const ExportData = () => {
    return (
        <div className="w-full h-full py-8">
            <div className="px-[16px] w-full flex flex-col md:flex-row md:gap-8">
                {/* Account Settings Menu */}
                <AccountSettingsMenu />
                <div className="w-full md:w-8/12">
                    <div className="bg-[#ffffff] md:block hidden p-8 rounded-md">
                        <ActionBarSettings />
                        <AccountSettingsCard />
                    </div>
                    <div className="bg-[#ffffff] p-8 rounded-md mt-8">
                        <div className="pb-[20px] mb-8 border-b-[1px] border-gray-200">
                            <span className="text-2xl font-medium">Data Export</span>
                        </div>
                        <div className='text-[#6f7f92]'>
                            <p>You previously requested an export of your personal data on July 26, 2022.</p>
                            <p className='mb-0'>
                            You will receive a link to download your export via email once we are able to fulfill your request.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExportData
