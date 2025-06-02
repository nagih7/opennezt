import React from 'react'
import { Tabs } from '@chakra-ui/react'
import RightSidebar from '~/components/common/RightSidebar'

const Timeline: React.FC = () => {
   return (
      <>
         <div className="flex gap-3">
            <div className="w-full lg:w-10/12">
               <Tabs.Root className="h-4" defaultValue="All Post">
                  <div className="w-full 2xl:w-full">
                     <Tabs.List>
                        <div className="flex justify-between w-full p-4 font-bold bg-white">
                           <div className="flex">
                              <Tabs.Trigger className="text-black" value="All Post">
                                 All Post
                              </Tabs.Trigger>
                           </div>
                        </div>
                     </Tabs.List>
                     <div className="mt-2">
                        <Tabs.Content value="All Post">
                           <>{/* <TimelinePost /> */}</>
                        </Tabs.Content>
                     </div>
                  </div>
               </Tabs.Root>
            </div>
            <RightSidebar activities={[]} action={() => {}} />
         </div>
      </>
   )
}
export default Timeline
