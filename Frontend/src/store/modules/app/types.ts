// App module state types
export interface AppState {
   isShowSideBar: boolean
   isThemeLight: boolean
   title: string
   language: string
   // Web push related state
   isLoadingWebPush: boolean
   isSubscribed: boolean
   subscription: any | null
   registration: any | null
   stats: any | null
   error: any | null
   // Any additional state properties that appear in reducers
   [key: string]: any
}
