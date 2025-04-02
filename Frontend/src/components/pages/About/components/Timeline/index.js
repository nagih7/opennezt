import { Tabs } from '@chakra-ui/react'
import RightSidebar from "components/common/RightSidebar";
import React from "react";
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
                        <div className="mt-5 bg-white ">
                            <Tabs.Content value="All Post">
                                <>
                                    <div className="bg-white rounded-lg p-6">

                                    </div>
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