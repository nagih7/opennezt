import callApi from './callApi'

export const scrapLinkedIn = (linkedInUsername: string) => {
   return callApi({
      method: 'post',
      apiPath: 'ai/scrap/linkedin',
      variables: { linkedin_username: linkedInUsername },
   })
}

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
