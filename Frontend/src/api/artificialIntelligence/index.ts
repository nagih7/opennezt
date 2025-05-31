import callApi from '../callApi'

export const matchingProjects = (linkedInUsername: string) => {
   let path = `ai/matching/projects`
   if (linkedInUsername) {
      path += `?linkedin_username=${linkedInUsername}`
   }
   return callApi({
      method: 'get',
      apiPath: path,
      variables: {},
   })
}
