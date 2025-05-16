import { Badge, Box, HStack, Stack, Stat, Text } from '@chakra-ui/react'
import ProjectGrid from 'components/pages/SeekProjects/components/ListProjects/ProjectGrid'
import React, { useCallback, useEffect, useState } from 'react'
import { Chart, useChart } from '@chakra-ui/charts'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Tooltip } from 'recharts'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { accessToProject } from 'api/activity'

const Statistical = ({ project }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [animatedPercentage, setAnimatedPercentage] = useState(0)

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

    useEffect(() => {
        const targetPercentage = project?.percent_match || 0
        setAnimatedPercentage(0)

        const duration = 1200
        const steps = 60
        const stepValue = targetPercentage / steps
        const stepTime = duration / steps

        let currentStep = 0
        const timer = setInterval(() => {
            currentStep++
            if (currentStep >= steps) {
                setAnimatedPercentage(targetPercentage)
                clearInterval(timer)
            } else {
                setAnimatedPercentage((prev) => Math.min(prev + stepValue, targetPercentage))
            }
        }, stepTime)

        return () => clearInterval(timer)
    }, [project?.percent_match])

    // Calculate SVG properties for circular progress
    const circleRadius = 40
    const circleStrokeWidth = 8
    const circleCenterPoint = 50
    const circleCircumference = 2 * Math.PI * circleRadius
    const offset = circleCircumference - (animatedPercentage / 100) * circleCircumference

    return (
        <Stack className="flex flex-row w-full h-full p-4 bg-white rounded-md">
            {/* <div className="flex-1 pr-4 border-r-2 border-gray-200">
                <ProjectGrid project={project} handleViewProjectDetails={() => handleViewProjectDetails(project)} />
            </div> */}
            <Stack className="flex items-center justify-center w-full p-4">
                <Stat.Root className="flex flex-col items-center justify-center w-full">
                    <Stat.Label className='text-xl font-semibold'>Compatibility Overview</Stat.Label>
                    <Box position="relative" w="180px" h="180px" display="flex" alignItems="center" justifyContent="center" className='mt-6'>
                        <svg width="100%" height="100%" viewBox="0 0 100 100">
                            {/* Background circle */}
                            <circle
                                cx={circleCenterPoint}
                                cy={circleCenterPoint}
                                r={circleRadius}
                                fill="transparent"
                                stroke="#E2E8F0" // Light gray background
                                strokeWidth={circleStrokeWidth}
                            />
                            
                            {/* Progress circle with animation */}
                            <circle
                                cx={circleCenterPoint}
                                cy={circleCenterPoint}
                                r={circleRadius}
                                fill="transparent"
                                stroke="#48BB78" // Chakra green.500
                                strokeWidth={circleStrokeWidth}
                                strokeDasharray={circleCircumference}
                                strokeDashoffset={offset}
                                strokeLinecap="round"
                                transform={`rotate(-90 ${circleCenterPoint} ${circleCenterPoint})`}
                                style={{
                                    transition: "stroke-dashoffset 0.3s ease"
                                }}
                            />
                            
                            {/* Small arrow indicator */}
                            {/* <text
                                x={circleCenterPoint}
                                y={circleCenterPoint - 10}
                                textAnchor="middle"
                                fill="#48BB78"
                                fontFamily="sans-serif"
                                fontSize="12"
                                fontWeight="bold"
                            >
                                ↑
                            </text> */}
                            
                            {/* Percentage text */}
                            <text
                                x={circleCenterPoint}
                                y={circleCenterPoint + 5}
                                textAnchor="middle"
                                fill="#48BB78"
                                fontFamily="sans-serif"
                                fontSize="18"
                                fontWeight="bold"
                            >
                                {Math.round(animatedPercentage)}%
                            </text>
                        </svg>
                    </Box>
                </Stat.Root>
                <button className='bg-[#F4F5F6] px-3 py-[2px] border rounded-full'>
                    Hover for Weights
                </button>
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
