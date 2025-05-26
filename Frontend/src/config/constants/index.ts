export * from './routes'

export const Auth = {
   LOGIN: 'login',
   REGISTER: 'register',
   FORGOT_PASSWORD: 'forgot_password',
   RESET_PASSWORD: 'reset_password',
   VERIFY: 'verify',
}

export const Sidebar = {
   ACTIVITY: 'Activity',
   ADMIN: 'Admin',
   HOME: 'Home',
   ABOUT_ME: 'About Me',
   PROJECT: 'Project',
   RECRUIT_TALENTS: 'Recruit Talents',
   SEEK_PROJECTS: 'Seek Projects',
   MESSAGES: 'Messages',
   NOTIFICATIONS: 'Notifications',
}

export const Action = {
   CONFIRM: 'Confirm',
   DELETE: 'Delete',
   SEND: 'Send',
   CANCEL: 'Cancel',
}

export const Status = {
   WAITING: 'Waiting',
   CONFIRM: 'Confirm',
   DELETE: 'Delete',
}

export const NotificationType = {
   NOTIFICATION: 'notification',
   FRIEND_REQUEST: 'friend_request',
   PROJECT_INVITATION: 'project_invitation',
   PROJECT_APPLICATION: 'project_application',
   CONFIRM_FRIEND_REQUEST: 'confirm_friend_request',
   CONFIRM_PROJECT_INVITATION: 'confirm_project_invitation',
}
