import React from "react";
import AccountSettingsMenu from "../AccountSettingsMenu";
import ActionBarSettings from "../ActionBarSettings";
import AccountSettingsCard from "../AccountSettingsCard";

const BlockList = () => {
    return (
        <div className="w-full h-full py-8">
        <div className="px-[16px] w-full flex  gap-8">
            {/* Account Settings Menu */}
            <AccountSettingsMenu />
            <div className="w-8/12">
                <div className="bg-[#ffffff] p-8 rounded-md">
                    <ActionBarSettings />
                    <AccountSettingsCard />
                </div>
                <div className="bg-[#ffffff]  rounded-md mt-8">
                    <div className="border-b-[1px] p-8 border-gray-200">
                        <span className="text-2xl font-medium">Blocked List</span>
                    </div>
                    <div className="p-12 text-[#6f7f92]">
                    No blocked user found !
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default BlockList;