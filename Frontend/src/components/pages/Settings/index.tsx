import React from 'react'
import ActionBarSettings from './components/ActionBarSettings'
import AccountSettingsCard from './components/AccountSettingsCard'
import AccountSettingsMenu from './components/AccountSettingsMenu'
import { Switch } from '@chakra-ui/react'
import { HiCheck, HiX } from 'react-icons/hi'
import type { IconType } from 'react-icons'

// Component wrapper với cast type
const IconWrapper = ({ icon: Icon, ...props }: { icon: IconType; [key: string]: any }) => {
   // Sử dụng Type Assertion để ép TypeScript chấp nhận Icon như một JSX component
   return React.createElement(Icon as unknown as React.ComponentType<React.SVGProps<SVGSVGElement>>, props)
}

function Settings() {
   return (
      <div className="w-full h-full py-8">
         <div className="px-[16px] w-full flex flex-col md:flex-row md:gap-8">
            {/* Account Settings Menu */}
            <AccountSettingsMenu />
            <div className="w-full md:w-8/12">
               <div className="bg-[#ffffff] hidden md:block p-8 rounded-md">
                  <ActionBarSettings />
                  <AccountSettingsCard />
               </div>
               <div className="bg-[#ffffff] p-8 rounded-md mt-8">
                  <div className="pb-[20px] mb-8 border-b-[1px] border-gray-200">
                     <span className="text-2xl font-medium">Notification settings</span>
                  </div>
                  <div className="flex flex-col">
                     <div className="flex flex-col">
                        <ul className="pl-0 mb-0">
                           <li className="flex items-center justify-between px-[32px] py-[21px] mb-[20px] bg-[#f8f9fa] rounded-md">
                              <div className="pr-[13px] font-semibold">
                                 <span>Someone accepts your membership invitation</span>
                              </div>

                              <Switch.Root color="green" size="lg">
                                 <Switch.HiddenInput />
                                 <Switch.Control>
                                    <Switch.Thumb>
                                       <Switch.ThumbIndicator fallback={<IconWrapper icon={HiX} color="red" />}>
                                          <IconWrapper icon={HiCheck} />
                                       </Switch.ThumbIndicator>
                                    </Switch.Thumb>
                                 </Switch.Control>
                              </Switch.Root>
                           </li>
                           <li className="flex items-center justify-between px-[32px] py-[21px] mb-[20px] bg-[#f8f9fa] rounded-md">
                              <div className="pr-[13px] font-semibold">
                                 <span>Mentions Notifications</span>
                              </div>

                              <Switch.Root color="green" size="lg">
                                 <Switch.HiddenInput />
                                 <Switch.Control>
                                    <Switch.Thumb>
                                       <Switch.ThumbIndicator fallback={<IconWrapper icon={HiX} color="red" />}>
                                          <IconWrapper icon={HiCheck} />
                                       </Switch.ThumbIndicator>
                                    </Switch.Thumb>
                                 </Switch.Control>
                              </Switch.Root>
                           </li>
                           <li className="flex items-center justify-between px-[32px] py-[21px] mb-[20px] bg-[#f8f9fa] rounded-md">
                              <div className="pr-[13px] font-semibold">
                                 <span>Replies Notifications</span>
                              </div>

                              <Switch.Root color="green" size="lg">
                                 <Switch.HiddenInput />
                                 <Switch.Control>
                                    <Switch.Thumb>
                                       <Switch.ThumbIndicator fallback={<IconWrapper icon={HiX} color="red" />}>
                                          <IconWrapper icon={HiCheck} />
                                       </Switch.ThumbIndicator>
                                    </Switch.Thumb>
                                 </Switch.Control>
                              </Switch.Root>
                           </li>
                           <li className="flex items-center justify-between px-[32px] py-[21px] mb-[20px] bg-[#f8f9fa] rounded-md">
                              <div className="pr-[13px] font-semibold">
                                 <span>Share on activity Notifications</span>
                              </div>

                              <Switch.Root color="green" size="lg">
                                 <Switch.HiddenInput />
                                 <Switch.Control>
                                    <Switch.Thumb>
                                       <Switch.ThumbIndicator fallback={<IconWrapper icon={HiX} color="red" />}>
                                          <IconWrapper icon={HiCheck} />
                                       </Switch.ThumbIndicator>
                                    </Switch.Thumb>
                                 </Switch.Control>
                              </Switch.Root>
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

export default Settings
