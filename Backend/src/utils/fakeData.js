import {User, Project, FounderProfile, ChatInvitation, ProjectRequest} from '@/models'

import {faker} from '@faker-js/faker'

const generateFakeData = async () => {
    // Fake data for User và FounderProfile
    const users = []
    const founderProfiles = []

    for (let i = 0; i < 30; i++) {
        const user = await User.create({
            name: faker.name.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            phone: faker.phone.number(),
            avatar: faker.image.avatar(), // Thay đổi từ imageUrl() thành avatar()
            background: faker.image.avatar(), // Dùng image.nature() thay vì imageUrl()
            facebook: faker.internet.url(),
            linkedin: faker.internet.url(),
            region: faker.address.state(),
            city: faker.address.city(),
            language: [faker.helpers.arrayElement(['Vietnamese', 'English', 'Spanish'])],
            role: faker.helpers.arrayElement(['user', 'admin']),
            is_active: true,
        })
        const founderProfile = await FounderProfile.create({
            user_id: user._id,
            industry: [faker.commerce.department(), faker.commerce.department()],
            experience_level: faker.helpers.arrayElement(['Beginner', 'Intermediate', 'Expert']),
            degree: faker.helpers.arrayElement(['Bachelor', 'Master', 'PhD']),
            areas_of_expertise: {
                accounting_and_finance: [faker.finance.accountName()],
                human_resource: [faker.name.jobTitle()],
                international: [faker.company.catchPhrase()],
                law_and_legal: [faker.name.jobTitle()],
                management: [faker.name.jobTitle()],
                marketing: [faker.name.jobTitle()],
                operations: [faker.name.jobTitle()],
                sales: [faker.name.jobTitle()],
                starting_up: [faker.name.jobTitle()],
                sustainability: [faker.name.jobTitle()],
                technology_and_internet: [faker.name.jobTitle()],
            },
            professional_summary: faker.lorem.paragraph(),
            career_goals: faker.lorem.sentence(),
            offer: faker.lorem.sentence(),
            expectation: faker.lorem.sentence(),
            availability: faker.helpers.arrayElement([
                'Exploring',
                'Full-time',
                'Part-time',
                'All-In',
                'Freelance',
            ]),
        })

        users.push(user)
        founderProfiles.push(founderProfile)
    }
    console.log('Fake users created:', users.length)
    console.log('Fake founder profiles created:', founderProfiles.length)

    // Tạo 10 dự án và FounderProfiles
    const projects = []
    for (let i = 0; i < 10; i++) {
        const user = faker.helpers.arrayElement(users) // Chọn một user ngẫu nhiên làm chủ sở hữu dự án

        const project = await Project.create({
            user_id: user._id,
            name: faker.company.name(),
            logo: faker.image.avatar(),
            background: faker.image.avatar(),
            landing_page_url: faker.internet.url(),
            related_industries: [faker.commerce.department(), faker.commerce.department()],
            stage: faker.helpers.arrayElement(['idea', 'prototype', 'funding', 'launched']),
            problem: faker.lorem.sentence(),
            solution: faker.lorem.sentence(),
            project_demo_url: faker.internet.url(),
            team_intro_url: faker.internet.url(),
            pitch_deck: faker.internet.url(),
            statistics: faker.lorem.sentence(),
            target_money: faker.finance.amount(),
            target_audience: faker.lorem.word(),
            competitors: faker.company.name(),
            competitive_advantage: faker.lorem.sentence(),
            why_now: faker.lorem.sentence(),
            strategy: faker.lorem.sentence(),
            milestones: faker.lorem.sentence(),
            about_opennezt: faker.lorem.sentence(),
        })
        projects.push(project)
    }

    // Tạo 20 ChatInvitations
    const chatInvitations = []
    for (let i = 0; i < 20; i++) {
        const sender = faker.helpers.arrayElement(users)
        const receiver = faker.helpers.arrayElement(users)
        const chatInvitation = await ChatInvitation.create({
            sender_id: sender._id,
            sender_name: sender.name,
            receiver_id: receiver._id,
            receiver_name: receiver.name,
            status: faker.helpers.arrayElement(['pending', 'waiting', 'accepted', 'rejected']),
        })
        chatInvitations.push(chatInvitation)
    }
    console.log('Fake chat invitations created:', chatInvitations.length)

    // Tạo 30 ProjectRequests
    const projectRequests = []
    for (let i = 0; i < 30; i++) {
        const sender = faker.helpers.arrayElement(users)
        const receiver = faker.helpers.arrayElement(users)
        const project = faker.helpers.arrayElement(projects)

        const projectRequest = await ProjectRequest.create({
            sender_id: sender._id,
            receiver_id: receiver._id,
            sender_name: sender.name,
            receiver_name: receiver.name,
            project_id: project._id,
            project_name: project.name,
            role: faker.helpers.arrayElement([
                'founder',
                'co-founder',
                'talent',
                'investor',
                'advisor',
                'mentor',
            ]),
            status: faker.helpers.arrayElement([
                'pending',
                'waiting',
                'accepted',
                'rejected',
                'expired',
                'blocked',
            ]),
        })
        projectRequests.push(projectRequest)
    }

    console.log('Fake project requests created:', projectRequests.length)
}

// Gọi hàm tạo dữ liệu giả
generateFakeData()
    .then(() => console.log('Fake data generation complete'))
    .catch((err) => console.error('Error generating fake data:', err))

export default generateFakeData
