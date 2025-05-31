import { Button, Dialog, Portal, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Statistical from './components/Statistical'
import fb_img from 'assets/images/background/left-banner.webp'
import Logo from 'assets/images/logo/opennezt_full_black_old.png'
import ProjectDetails from './components/ProjectDetails'

interface Project {
   // Define the project object structure according to your application
   id: string
   [key: string]: any
}

interface ProjectMatch {
   project: Project
   score?: number
   [key: string]: any
}

const ModalMatchingProjects: React.FC = () => {
   const dispatch = useDispatch()
   // ========== STATE FROM REDUX ========== //
   // const { projects, isOpenModalMatchingProjects } = useSelector((state: RootState) => state.artificialIntelligence)
   // ========== STATE ========== //
   const [projectSelected, setProjectSelected] = useState<ProjectMatch | null>(null)

   // ========== EFFECT ========== //
   // useEffect(() => {
   //    if (projects.length > 0) {
   //       setProjectSelected(projects[0])
   //    }
   // }, [projects])

   // ========== RENDER ========== //
   return (
      <>
         {/* <Dialog.Root
            scrollBehavior="inside"
            size="full"
            motionPreset="slide-in-bottom"
            open={isOpenModalMatchingProjects}
            placement={'center'}
         >
            <Portal>
               <Dialog.Backdrop />
               <Dialog.Positioner>
                  <Dialog.Content className="bg-[#f4f5f6] max-h-full p-0 m-0 ">
                     <Dialog.Body className="px-[16px] pt-[16px]">
                        <div className="flex w-full">
                           <div className="w-10/12">
                              <ProjectDetails project={projectSelected?.project} />
                           </div>
                           <div className="w-4/12">
                              <Stack className="w-full bg-gray-100 ">
                                 <Statistical project={projectSelected} />
                                 <div className="relative w-full">
                                    <img src={fb_img} alt="logo-fb_img" className="w-full h-[450px] rounded-md mt-4" />
                                    <img
                                       src={Logo}
                                       alt="logo-opennezt"
                                       className={`$styles.logo, absolute top-0 py-14 px-12 left-0`}
                                    />
                                    <div className="absolute left-0 flex flex-col items-center gap-3 px-12 text-center text-white xl:left-5 2xl:mt-8 xl:px-20 top-32">
                                       Feel free to reach us anytime. we are avaliable 24 hours
                                       <button className="bg-[#ffffff] px-3 py-3 text-black font-medium rounded-md">
                                          CONTACT US
                                       </button>
                                    </div>
                                 </div>
                              </Stack>
                           </div>
                        </div>
                     </Dialog.Body>
                     <Dialog.Footer>
                        <Button
                           className="border-[#F4F5F6] bg-[#2F65B9] text-white"
                           onClick={() =>
                              setProjectSelected(
                                 projects[projects.indexOf(projectSelected as ProjectMatch) - 1] || projects[0]
                              )
                           }
                           borderRadius={4}
                           loading={false}
                        >
                           Previous
                        </Button>
                        <Button
                           className="border-[#F4F5F6] bg-[#2F65B9] text-white"
                           onClick={() =>
                              setProjectSelected(
                                 projects[projects.indexOf(projectSelected as ProjectMatch) + 1] || projects[0]
                              )
                           }
                           borderRadius={4}
                           loading={false}
                        >
                           Next
                        </Button>
                        <Button
                           className="border-[#F4F5F6] bg-[#2F65B9] text-white"
                           onClick={() => dispatch(setOpenModalMatchingProjects(false))}
                           borderRadius={4}
                           loading={false}
                        >
                           OK
                        </Button>
                     </Dialog.Footer>
                  </Dialog.Content>
               </Dialog.Positioner>
            </Portal>
         </Dialog.Root> */}
      </>
   )
}

export default ModalMatchingProjects
