// Import all reducers
import appReducer from './modules/app'
import authReducer from './modules/auth'
import userReducer from './modules/user'
import profileReducer from './modules/profile'
import homeReducer from './modules/home'
import employeeReducer from './modules/employee'
import manageReducer from './modules/manage'
import talentReducer from './modules/talent'
import projectReducer from './modules/project'
import notificationReducer from './modules/notification'
import artificialIntelligenceReducer from './modules/artificialIntelligence'
import articleReducer from './modules/article'
import activityReducer from './modules/activity'
import linkPreviewReducer from './modules/linkPreview'
import interviewReducer from './modules/interview'

// Define the root reducer with TypeScript typing
const rootReducer = {
   app: appReducer,
   auth: authReducer,
   article: articleReducer,
   user: userReducer,
   manage: manageReducer,
   profile: profileReducer,
   home: homeReducer,
   employee: employeeReducer,
   talent: talentReducer,
   project: projectReducer,
   notification: notificationReducer,
   artificialIntelligence: artificialIntelligenceReducer,
   activity: activityReducer,
   linkPreview: linkPreviewReducer,
   interview: interviewReducer,
}

export default rootReducer
