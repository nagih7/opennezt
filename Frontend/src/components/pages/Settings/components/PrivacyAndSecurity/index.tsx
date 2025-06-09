import React from 'react'
import AccountSettingsMenu from '../AccountSettingsMenu'
import ActionBarSettings from '../ActionBarSettings'
import AccountSettingsCard from '../AccountSettingsCard'

const PrivacyAndSecurity = (): React.ReactElement => {
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
                            <span className="text-2xl font-medium">Account Privacy</span>
                        </div>
                        <div className="flex flex-col">
                            <div className="w-full">
                                <ul className="mb-0 pl-0">
                                    <li className="px-[32px] py-[21px] mb-[20px] bg-[#f8f9fa] rounded-md">
                                        <div className="pr-[13px]">
                                            <input type="checkbox" className="mr-[10px] w-[16px] h-[16px]" />
                                            <label htmlFor="">Private account</label>
                                            <p className="mb-0 text-[#6f7f92]">
                                                When your account is private, only your friends can see your profile and
                                                activities.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex justify-end">
                                <button className="px-[28px] mt-[14px] py-[12px] bg-[#2f65b9] text-sm rounded-md text-[#ffffff] font-semibold">
                                    SAVE SETTINGS
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrivacyAndSecurity
