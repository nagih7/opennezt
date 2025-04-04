import React from 'react'
import { Separator, Tabs } from '@chakra-ui/react'
import RoleRequirement from './components/RoleRequirement'
import SectorRequirement from './components/SectorRequirement'
import SkillRequirement from './components/SkillRequirement'

const ProjectRequirements = () => {
    // ========= RENDER  ========== //
    return (
        <Tabs.Content pt="0" value="Project Requirement">
            <RoleRequirement />
            <Separator size={'lg'} />
            <SectorRequirement />
            <Separator size={'lg'} />
            <SkillRequirement />
        </Tabs.Content>
    )
}

export default ProjectRequirements
