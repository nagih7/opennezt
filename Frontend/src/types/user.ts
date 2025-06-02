export interface BaseUserProps {
   _id: string
   email: string
   name: string
   avatar?: string | null
   createdAt?: string
   updatedAt?: string
}

export interface BaseMemberProps {
   _id: string
   name: string
   avatar?: string
}

export interface MemberProjectProps extends BaseMemberProps {
   role: string
   team_role: string
}
