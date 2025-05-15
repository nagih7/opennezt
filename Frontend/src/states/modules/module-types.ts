// Basic state type definitions for other Redux modules
// These are placeholder interfaces that should be expanded as needed

export interface UserState {
    users: any[]
    currentUser: any | null
    isLoading: boolean
    error: any
}

export interface ProfileState {
    profile: any | null
    isLoading: boolean
    error: any
}

export interface HomeState {
    feeds: any[]
    isLoading: boolean
    error: any
}

export interface EmployeeState {
    employees: any[]
    isLoading: boolean
    error: any
}

export interface ManageState {
    data: any
    isLoading: boolean
    error: any
}

export interface TalentState {
    talents: any[]
    isLoading: boolean
    error: any
}

export interface ProjectState {
    projects: any[]
    currentProject: any | null
    isLoading: boolean
    error: any
}

export interface ChatState {
    conversations: any[]
    currentChat: any | null
    messages: any[]
    isLoading: boolean
    error: any
}

export interface NotificationState {
    notifications: any[]
    unreadCount: number
    isLoading: boolean
    error: any
}

export interface AIState {
    models: any[]
    currentPrompt: string
    results: any[]
    isLoading: boolean
    error: any
}

export interface ArticleState {
    articles: any[]
    currentArticle: any | null
    isLoading: boolean
    error: any
}

export interface ActivityState {
    activities: any[]
    isLoading: boolean
    error: any
}

export interface LinkPreviewState {
    previews: Record<string, any>
    isLoading: boolean
    error: any
}

export interface InterviewState {
    interviews: any[]
    currentInterview: any | null
    isLoading: boolean
    error: any
}
