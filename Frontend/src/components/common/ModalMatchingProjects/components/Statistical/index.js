import { Badge, HStack, Stack, Stat } from '@chakra-ui/react'
import ProjectGrid from 'components/pages/SeekProjects/components/ListProjects/ProjectGrid'
import React, { useCallback } from 'react'
import { Chart, useChart } from '@chakra-ui/charts'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Tooltip } from 'recharts'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { accessToProject } from 'api/activity'

const Statistical = ({ project }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // ========== HANDLER ========== //
    const handleViewProjectDetails = useCallback(
        (project) => {
            dispatch(accessToProject(project._id))
            navigate(`/projects/${project._id}/details`)
            dispatch(setOpenModalMatchingProjects(false))
        },
        [dispatch, navigate]
    )

    const chart = useChart({
        data: [
            { point: project?.breakdown?.skills_fit, criteria: 'Skill fit' },
            { point: project?.breakdown?.experience_level, criteria: 'Experience level' },
            { point: project?.breakdown?.industry_alignment, criteria: 'Industry alignment' },
            { point: project?.breakdown?.availability, criteria: 'Availability' },
            { point: project?.breakdown?.vision_alignment, criteria: 'Vision alignment' },
            { point: project?.breakdown?.career_goals, criteria: 'Career goals' },
            { point: project?.breakdown?.work_expectations, criteria: 'Work expectations' },
            { point: project?.breakdown?.vision_and_culture, criteria: 'Vision and culture' },
        ],
        series: [{ name: 'point', color: 'teal.solid' }],
    })

    // ========== RENDER ========== //
    return (
        <Stack className="flex flex-row w-full h-full p-4 bg-white rounded-md">
            {/* <div className="flex-1 pr-4 border-r-2 border-gray-200">
                <ProjectGrid project={project} handleViewProjectDetails={() => handleViewProjectDetails(project)} />
            </div> */}
            <Stack className="flex items-center justify-center w-full p-4">
                <Stat.Root className="flex flex-col items-center justify-center w-full">
                    <Stat.Label>statistical</Stat.Label>
                    <HStack>
                        <Badge colorPalette="green" gap="0">
                            <Stat.UpIndicator />
                            {project?.percent_match}%
                        </Badge>
                    </HStack>
                </Stat.Root>
                <Chart.Root maxW="sm" chart={chart} mx="auto">
                    <RadarChart data={chart.data}>
                        <PolarGrid
                            stroke="none"
                            style={{
                                fill: chart.color('teal.solid'),
                                fillOpacity: 0.2,
                            }}
                        />
                        <PolarAngleAxis dataKey={chart.key('criteria')} />
                        <Tooltip content={<Chart.Tooltip />} />
                        {chart.series.map((item) => (
                            <Radar
                                dot={{ fillOpacity: 1 }}
                                isAnimationActive={true}
                                key={item.name}
                                name={item.name}
                                dataKey={chart.key(item.name)}
                                stroke={chart.color(item.color)}
                                fill={chart.color(item.color)}
                                fillOpacity={0.5}
                            />
                        ))}
                    </RadarChart>
                </Chart.Root>
            </Stack>
        </Stack>
    )
}

export default Statistical
