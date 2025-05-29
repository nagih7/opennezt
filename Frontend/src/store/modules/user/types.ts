// Define a generic Collection type
export type Collection<T> = Record<string, T>

export interface UserState {
   // STAGES
   stageFramework: Collection<any>
   isLoadingGetStageFramework: boolean
   // PROJECT ROLE
   projectRoleFramework: Collection<any>
   projectTeamRoleFramework: Collection<any>
   isLoadingGetProjectRoleFramework: boolean
}
