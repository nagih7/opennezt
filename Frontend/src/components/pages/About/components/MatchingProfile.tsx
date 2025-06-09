import React from 'react'
import { Button } from '~/components/UI/button'
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '~/components/UI/dialog'
import { BsStars } from 'react-icons/bs'
import { Alert, AlertDescription } from '~/components/UI/alert'
import { AlertCircleIcon } from 'lucide-react'
import { IconlyFolder, IconlyLocation } from '~/components/UI/Iconly'
import { MatchingProjectProps } from '~/types'
import { OPENNEZT_LOGO_GRADIENT } from '~/config/constants'
import { Avatar, AvatarImage } from '~/components/UI/avatar'
import { Badge } from '~/components/UI/badge'
import ProjectDetails from '~/components/common/ProjectByMatching'
import Statistical from '~/components/common/Statistical'
import { useMatching } from '~/contexts'

const MatchingProfile: React.FC = () => {
   const {
      matches,
      loading,
      openModalConfirm,
      showMatches,
      matchSelected,
      showProject,

      setOpenModalConfirm,
      setShowMatches,
      setShowProject,
      handleShowProject,
      handleComfirmMatchingProjects,
   } = useMatching()

   if (matches.length > 0)
      return (
         <>
            <Dialog open={showMatches} onOpenChange={(open) => setShowMatches(open)}>
               <DialogTrigger asChild>
                  <Button
                     className="flex items-center gap-2 bg-gradient-to-r from-[#0606AFCC] to-[#AE2135E5] cursor-pointer py-2 px-[15px] rounded-xl"
                     // onClick={() => dispatch(setOpenModalMatchingProjects(true))}
                  >
                     <IconlyFolder color={'#ffffff'} size={15} />
                     View matching matches
                  </Button>
               </DialogTrigger>
               <DialogContent className="flex flex-col max-w-[1000px] h-50vh max-h-[80vh] color-black">
                  <DialogHeader>
                     <DialogTitle>Startup Suggestions</DialogTitle>
                     <DialogDescription>
                        Discover promising startups that match your expertise and shared values
                     </DialogDescription>
                  </DialogHeader>
                  {matches.map((match: MatchingProjectProps) => (
                     <div
                        key={match.id}
                        className="flex gap-4 p-4 transition-colors duration-200 border-b border-gray-200 shadow-sm cursor-pointer hover:bg-gray-100"
                        onClick={() => handleShowProject(match)}
                     >
                        <div className="w-[300px] h-[150px] overflow-hidden rounded-md mb-4 relative">
                           <img
                              className="object-cover w-full h-full"
                              alt={match.project.name}
                              src={match.project.background || OPENNEZT_LOGO_GRADIENT}
                              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                 e.currentTarget.src = OPENNEZT_LOGO_GRADIENT
                              }}
                           />

                           <Avatar className="absolute w-16 h-16 border-2 border-white bottom-2 left-2">
                              <AvatarImage
                                 src={match.project.logo || undefined}
                                 alt={match.project.name}
                                 className="object-cover w-full h-full rounded-full"
                              />
                              <AvatarImage
                                 src={OPENNEZT_LOGO_GRADIENT}
                                 alt={match.project.name}
                                 className="object-cover w-full h-full rounded-full"
                              />
                           </Avatar>
                        </div>
                        <div className="flex flex-col flex-1 gap-2">
                           <div className="flex items-center justify-between">
                              <p className="font-bold text-md">{match.project.name}</p>
                              <span className="flex flex-col items-center justify-center">
                                 <Badge className="bg-gradient-to-r from-[#0606AFCC] to-[#AE2135E5] text-white rounded-md px-2 py-1">
                                    {match.percent_match}%
                                 </Badge>
                                 <p className="text-xs font-semibold text-gray-500">Compatibility</p>
                              </span>
                           </div>
                           <p className="flex items-center gap-1 text-sm text-gray-600">
                              <IconlyLocation color={'#6b7280 '} size={15} />
                              Hanoi, Vietnam
                           </p>
                           <p className="text-sm text-gray-700">{match.project.description}</p>
                        </div>
                     </div>
                  ))}
               </DialogContent>
            </Dialog>
            {matchSelected && (
               <Dialog open={showProject} onOpenChange={(open) => setShowProject(open)}>
                  <DialogContent className="flex max-w-full max-h-full w-[100vw] h-[100vh] overflow-auto">
                     <ProjectDetails project={matchSelected.project} />
                     <Statistical percent_match={matchSelected.percent_match} breakdown={matchSelected.breakdown} />
                  </DialogContent>
               </Dialog>
            )}
         </>
      )

   return (
      <>
         <Dialog open={openModalConfirm} onOpenChange={(open) => setOpenModalConfirm(open)}>
            <DialogTrigger asChild>
               <Button
                  className="flex items-center gap-2 bg-gradient-to-r from-[#0606AFCC] to-[#AE2135E5] cursor-pointer py-2 px-[15px] rounded-xl"
                  onClick={() => setOpenModalConfirm(true)}
                  loading={loading}
               >
                  {!loading && <BsStars className="text-[#ffffff] w-5 h-5" />}
                  {loading ? 'Matching...' : 'Apply with AI'}
               </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
               <DialogHeader>
                  <DialogTitle>Matching matches with AI</DialogTitle>
                  <DialogDescription>
                     Use AI matching matches for your profile here. Click confirm when you're done.
                  </DialogDescription>
               </DialogHeader>
               <div className="grid gap-4">
                  <div>
                     <p className="mb-2 text-sm font-semibold text-gray-800">
                        To provide you with the most accurate and relevant matches, our AI system needs to analyze the
                        following:
                     </p>
                     <p className="text-sm ">
                        - Your project profile, including its description, goals, tractions and requirements.
                     </p>
                     <p className="text-sm ">
                        - Profiles of your founding team and core team, including skills, roles, and expertise.
                     </p>
                  </div>
                  <p className="text-sm italic">
                     This information will only be used to enhance the matching process and recommend talents who best
                     align with your needs. Your data will remain confidential and protected under our Privacy Policy.
                  </p>
               </div>
               <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertDescription>
                     <p>
                        Do you consent to allowing our AI system to access this information for the purpose of
                        generating matches?
                     </p>
                  </AlertDescription>
               </Alert>
               <DialogFooter>
                  <DialogClose asChild>
                     <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                     type="submit"
                     onClick={handleComfirmMatchingProjects}
                     className="text-white bg-main-color hover:bg-blue-700"
                  >
                     Confirm
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </>
   )
}

export default MatchingProfile
