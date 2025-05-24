/**
 * Interface for application route configuration
 */
export interface RouteConfig {
   label: string
   icon?: React.ReactElement<{ size?: number; color?: string }>
   path: string
   routeActive: string[]
   permissions?: string[]
   children?: RouteConfig[]
}

export interface Location {
   pathName: string
   payload: any
   prevPathName: string
}

export interface LoaderArgs {
   request: Request
   params?: Record<string, string | undefined>
}
