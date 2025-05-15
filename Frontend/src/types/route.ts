/**
 * Interface for application route configuration
 */
export interface RouteConfig {
   label: string
   icon: React.ReactElement
   path: string
   routeActive: string[]
   permissions: string[]
   children?: RouteConfig[]
}
