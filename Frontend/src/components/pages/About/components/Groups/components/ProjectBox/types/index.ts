interface User {
   name?: string
   avatar?: string
}

interface Member {
   user?: User
}

interface Project {
   _id?: string
   name: string
   background: string
   logo: string
   articles?: any[]
   members?: Member[]
}

interface ProjectBoxProps {
   project: Project
}

export type { User, Member, Project, ProjectBoxProps }