import { Tabs } from '@chakra-ui/react'
import RightSidebar from "components/common/RightSidebar";

import React from "react";
import TimelinePost from './TimelinePost';
const Timeline = () => {
    return (<>
        <div className="flex gap-8">
            <div className="w-10/12">
                <Tabs.Root className="h-4" defaultValue="All Post">
                    <div className="2xl:w-full w-full">
                        <Tabs.List>
                            <div className="flex justify-between bg-white  p-4 font-bold w-full">
                                <div className='flex'>
                                    <Tabs.Trigger className="text-black" value="All Post">
                                        All Post
                                    </Tabs.Trigger>

                                </div>


                            </div>
                        </Tabs.List>
                        <div className="mt-2">
                            <Tabs.Content value="All Post">
                                <>
                                    <TimelinePost />
                                </>
                            </Tabs.Content>



                        </div>
                    </div>
                </Tabs.Root>
            </div>
            <RightSidebar />
        </div>
    </>)
}
export default Timeline