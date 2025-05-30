import React from 'react'
import ProjectActivity from '../ProjectActivity'
import { Tabs } from '@chakra-ui/react'
import ProjectRequirements from './ProjectRequirements'
import ProjectDelete from './ProjectDelete'

const ProjectManage: React.FC = () => {
   return (
      <div className="px-[16px]">
         <div className="flex w-full gap-8">
            <div className="lg:w-10/12 w-full">
               <Tabs.Root defaultValue="Project Requirement" variant="plain">
                  <div className="p-8 bg-[#ffffff] rounded-md">
                     <Tabs.List className="gap-6">
                        <Tabs.Trigger value="Project Requirement">Project Requirement</Tabs.Trigger>
                        <Tabs.Trigger value="delete">Delete</Tabs.Trigger>
                        <Tabs.Indicator rounded="l2" />
                     </Tabs.List>
                  </div>
                  <div className="p-8 mt-8 bg-[#ffffff] rounded-md">
                     <ProjectRequirements />
                     <ProjectDelete />
                  </div>
               </Tabs.Root>
            </div>
            <ProjectActivity />
         </div>
      </div>
   )
}

export default ProjectManage
