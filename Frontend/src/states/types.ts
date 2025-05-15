import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'

// Import state types for each reducer
import { AuthState } from 'states/modules/auth/types'
import { AppState } from 'states/modules/app/types'
// import { ProfileState } from 'states/modules/profile/types'
// import { HomeState } from 'states/modules/home/types'
// import { EmployeeState } from 'states/modules/employee/types'
// import { ManageState } from 'states/modules/manage/types'
// import { TalentState } from 'states/modules/talent/types'
// import { ProjectState } from 'states/modules/project/types'
// import { ChatState } from 'states/modules/chat/types'
// import { NotificationState } from 'states/modules/notification/types'
// import { AIState } from 'states/modules/artificialIntelligence/types'
// import { ArticleState } from 'states/modules/article/types'
// import { ActivityState } from 'states/modules/activity/types'
// import { LinkPreviewState } from 'states/modules/linkPreview/types'
// import { InterviewState } from 'states/modules/interview/types'

// Define the root state type
export interface RootState {
   app: AppState
   auth: AuthState
   // article: ArticleState
   // user: UserState
   // manage: ManageState
   // profile: ProfileState
   // home: HomeState
   // employee: EmployeeState
   // talent: TalentState
   // project: ProjectState
   // chat: ChatState
   // notification: NotificationState
   // artificialIntelligence: AIState
   // activity: ActivityState
   // linkPreview: LinkPreviewState
   // interview: InterviewState
}

// Define common Redux types
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

// Common action types
export interface Action<T = any> {
   type: string
   payload?: T
}

// Standard async action types
export type AsyncActionTypes = [string, string, string]

// Generate async action types helper
export const createAsyncTypes = (base: string): AsyncActionTypes => [
   `${base}_REQUEST`,
   `${base}_SUCCESS`,
   `${base}_FAILURE`,
]
