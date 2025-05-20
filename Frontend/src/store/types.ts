import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'

// Import state types for each reducer
import { AuthState } from 'store/modules/auth/types'
import { AppState } from 'store/modules/app/types'
// import { ProfileState } from 'store/modules/profile/types'
// import { HomeState } from 'store/modules/home/types'
// import { EmployeeState } from 'store/modules/employee/types'
// import { ManageState } from 'store/modules/manage/types'
// import { TalentState } from 'store/modules/talent/types'
import { ProjectState } from 'store/modules/project/types'
// import { ChatState } from 'store/modules/chat/types'
// import { NotificationState } from 'store/modules/notification/types'
// import { AIState } from 'store/modules/artificialIntelligence/types'
// import { ArticleState } from 'store/modules/article/types'
import { ActivityState } from 'store/modules/activity/types'
// import { LinkPreviewState } from 'store/modules/linkPreview/types'
// import { InterviewState } from 'store/modules/interview/types'
import { UserState } from 'store/modules/user/types'

// Define the root state type
export interface RootState {
   app: AppState
   auth: AuthState
   // article: ArticleState
   user: UserState
   // manage: ManageState
   // profile: ProfileState
   // home: HomeState
   // employee: EmployeeState
   // talent: TalentState
   project: ProjectState
   // chat: ChatState
   // notification: NotificationState
   // artificialIntelligence: AIState
   activity: ActivityState
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
