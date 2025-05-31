import { Box, Stat } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Chart, useChart } from '@chakra-ui/charts'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Tooltip } from 'recharts'
import { BreakdownProps } from '~/types'
import { OPENNEZT_LOGO, OPENNEZT_LOGO_BLACK, OPENNEZT_LOGO_WHITE, RIGHT_SIDEBAR_BANNER } from '~/utils/constants'

interface StatisticalProps {
   percent_match: number
   breakdown: BreakdownProps
}

const Statistical: React.FC<StatisticalProps> = ({ percent_match, breakdown }) => {
   const [animatedPercentage, setAnimatedPercentage] = useState<number>(0)

   const chart = useChart({
      data: [
         { point: breakdown?.skills_fit || 0, criteria: 'Skill fit' },
         { point: breakdown?.experience_level || 0, criteria: 'Experience level' },
         { point: breakdown?.industry_alignment || 0, criteria: 'Industry alignment' },
         { point: breakdown?.availability || 0, criteria: 'Availability' },
         { point: breakdown?.vision_alignment || 0, criteria: 'Vision alignment' },
         { point: breakdown?.career_goals || 0, criteria: 'Career goals' },
         { point: breakdown?.work_expectations || 0, criteria: 'Work expectations' },
         { point: breakdown?.vision_and_culture || 0, criteria: 'Vision and culture' },
      ],
      series: [{ name: 'point', color: 'teal.solid' }],
   })

   useEffect(() => {
      const targetPercentage = percent_match || 0
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
   }, [percent_match])

   // Calculate SVG properties for circular progress
   const circleRadius = 40
   const circleStrokeWidth = 8
   const circleCenterPoint = 50
   const circleCircumference = 2 * Math.PI * circleRadius
   const offset = circleCircumference - (animatedPercentage / 100) * circleCircumference

   return (
      <div className="flex flex-col w-1/4 h-full p-4 bg-white rounded-md">
         <Stat.Root className="flex flex-col items-center justify-center w-full">
            <Stat.Label className="text-xl font-semibold">Compatibility Overview</Stat.Label>
            <Box
               position="relative"
               w="180px"
               h="180px"
               display="flex"
               alignItems="center"
               justifyContent="center"
               className="mt-6"
            >
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
                        transition: 'stroke-dashoffset 0.3s ease',
                     }}
                  />

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
         <button className="bg-[#F4F5F6] px-3 py-[2px] border rounded-full">Hover for Weights</button>
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
         <div className="relative w-full ">
            <img src={RIGHT_SIDEBAR_BANNER} alt="logo-fb_img" className="w-full rounded-md" />
            <div className="absolute top-0 h-3/4 flex flex-col items-center justify-center bg-gradient-to-b from-[#000000] to-[#00000000] rounded-md px-20 gap-4">
               <img src={OPENNEZT_LOGO_WHITE} alt="logo-opennezt" />
               <div className="items-center text-center text-white">
                  Feel free to reach us anytime. we are avaliable 24 hours
               </div>
               <button className="bg-[#ffffff] px-4 py-2.5 text-black font-medium rounded-md">CONTACT US</button>
            </div>
         </div>
      </div>
   )
}

export default Statistical
