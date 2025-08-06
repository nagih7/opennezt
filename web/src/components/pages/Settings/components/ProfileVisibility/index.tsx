import React from 'react'
import AccountSettingsMenu from '../AccountSettingsMenu'
import ActionBarSettings from '../ActionBarSettings'
import AccountSettingsCard from '../AccountSettingsCard'

const ProfileVisibility = (): React.ReactElement => {
    return (
        <div className="w-full h-full py-8">
            <div className="px-[16px] w-full flex md:flex-row flex-col md:gap-8">
                {/* Account Settings Menu */}
                <AccountSettingsMenu />
                <div className="w-full md:w-8/12">
                    <div className="bg-[#ffffff] md:block hidden p-8 rounded-md">
                        <ActionBarSettings />
                        <AccountSettingsCard />
                    </div>
                    <div className="bg-[#ffffff] p-8 rounded-md mt-8">
                        <div className="pb-[20px] mb-8 border-b-[1px] border-gray-200">
                            <span className="text-2xl font-medium">Profile Visibility Settings</span>
                        </div>
                        <div className="flex flex-col gap-[20px]">
                            <div className="border border-gray-200 rounded-md">
                                <table className="w-full rounded-md">
                                    <thead>
                                        <tr className="bg-[#2f65b9] font-medium text-[#ffffff] rounded-t-md">
                                            <th className="p-[16px] rounded-tl-md">Personal Information</th>
                                            <th className="p-[16px] rounded-tr-md">Visibility</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[#6f7f92]">
                                        <tr className="border-b-[1px] border-gray-200 px-[16px]">
                                            <td className="p-[16px]">Profile Picture</td>
                                            <td className="p-[16px]">Public</td>
                                        </tr>
                                        <tr className="border-b-[1px] border-gray-200 px-[16px]">
                                            <td className="p-[16px]">Username</td>
                                            <td className="p-[16px]">Public</td>
                                        </tr>
                                        <tr>
                                            <td className="p-[16px]">Email Address</td>
                                            <td className="p-[16px]">Private</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="border border-gray-200 rounded-md">
                                <table className="w-full rounded-md">
                                    <thead>
                                        <tr className="bg-[#2f65b9] font-medium text-[#ffffff] rounded-t-md">
                                            <th className="p-[16px] rounded-tl-md">Hobbies And Interest</th>
                                            <th className="p-[16px] rounded-tr-md">Visibility</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[#6f7f92]">
                                        <tr className="border-b-[1px] border-gray-200 px-[16px]">
                                            <td className="p-[16px]">Profile Picture</td>
                                            <td className="p-[16px]">Public</td>
                                        </tr>
                                        <tr className="border-b-[1px] border-gray-200 px-[16px]">
                                            <td className="p-[16px]">Username</td>
                                            <td className="p-[16px]">Public</td>
                                        </tr>
                                        <tr>
                                            <td className="p-[16px]">Email Address</td>
                                            <td className="p-[16px]">Private</td>
                                        </tr>
                                    </tbody>
                                </table>
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

export default ProfileVisibility
