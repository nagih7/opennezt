import React from 'react'
import { useSelector } from 'react-redux'
import { WelcomeSection } from './components/WelcomeSection'
import { InterviewCard } from './components/InterviewCard'

const Home = () => {
    const { authUser } = useSelector((state) => state.auth)

    return (
        <div className="mt-[2px] ml-[16px] p-8 bg-[#ffffff] w-full h-100vh 2xl:h-full">
            <WelcomeSection user={authUser} />
            <div className="flex flex-col mt-8">
                <span className="text-2xl font-bold">Practice interviews</span>
                <span className="text-[#6f7f92]">Practice real interview questions and pave your startup journey</span>
                <div className="grid grid-cols-3 2xl:gap-10 gap-8 mt-4 pb-8">
                    <InterviewCard
                        title="Growth Hacker"
                        description="Plan and strategize a product launch"
                        time="30m"
                        color="pink"
                    />
                    <InterviewCard
                        title="Financial Modelling Analyst"
                        description="Discuss building financial models"
                        time="40m"
                        color="blue"
                    />
                    <InterviewCard
                        title="DevOps Engineer"
                        description="Deployment, scaling, infrastructure"
                        time="25m"
                        color="purple"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
