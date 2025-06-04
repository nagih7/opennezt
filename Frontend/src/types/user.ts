export interface BaseUserProps {
   _id: string
   email: string
   name: string
   avatar?: string | undefined
   createdAt?: string
   updatedAt?: string
}

export interface UserDetailsProps extends BaseUserProps {
   background?: string
   phone: string
   facebook?: string
   linkedin?: string
   region?: string
   city?: string
   languages?: string[]
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
