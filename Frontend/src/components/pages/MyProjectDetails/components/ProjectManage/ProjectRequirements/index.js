import React from 'react'
import { Tabs } from '@chakra-ui/react'
import RoleRequirement from './components/RoleRequirement'
import SectorRequirement from './components/SectorRequirement'
import SkillRequirement from './components/SkillRequirement'

const ProjectRequirements = () => {
    // ========= RENDER  ========== //
    return (
        <Tabs.Content pt="0" value="Project Requirement">
            <RoleRequirement />
            <SectorRequirement />
            <SkillRequirement />
        </Tabs.Content>
    )
}

export default ProjectRequirements
