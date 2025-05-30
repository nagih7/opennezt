// App module state types
export interface AppState {
   isShowSideBar: boolean
   isThemeLight: boolean
   title: string
   language: string
   // Any additional state properties that appear in reducers
   [key: string]: any
}
