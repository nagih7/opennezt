import { Image, Dialog, Portal } from '@chakra-ui/react'
import React, { useState } from 'react'
import { OPENNEZT_LOGO_GRADIENT, OPENNEZT_LOGO } from 'utils/constants'
import LogoForm from '../../../EditProject/Components/Forms/LogoForm'
import BackgroundForm from '../../../EditProject/Components/Forms/BackgroundForm'
import BasicForm from '../../../EditProject/Components/Forms/BasicForm'
import { IconlyCamera, IconlyImage2, IconlyEdit } from '~/components/UI/Iconly'

interface ProjectCardProps {
   project: {
      name: string
      background?: string
      logo?: string
      description?: string
   }
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
   const [backgroundError, setBackgroundError] = useState<boolean>(false)
   const [logoError, setLogoError] = useState<boolean>(false)
   const [activeDialog, setActiveDialog] = useState<'logo' | 'background' | 'basic' | null>(null)

   const openLogoDialog = () => setActiveDialog('logo')
   const openBackgroundDialog = () => setActiveDialog('background')
   const openBasicDialog = () => setActiveDialog('basic')
   const closeDialog = () => setActiveDialog(null)

   return (
      <>
         <div className="w-full relative">
            {!backgroundError && project.background ? (
               <>
                  <Image
                     src={project.background}
                     alt={project.name}
                     aspectRatio={10 / 3}
                     width="100%"
                     objectFit="cover"
                     onError={() => setBackgroundError(true)}
                  />
                  {/* Icon đổi background */}
                  <button
                     className="absolute bottom-3 right-3 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
                     title="Change your project background"
                     onClick={openBackgroundDialog}
                  >
                     <IconlyImage2 size={20} color="#4374c0" />
                  </button>
               </>
            ) : (
               <div className="flex items-center justify-center bg-[#EAEFF8] relative" style={{ aspectRatio: '10/3' }}>
                  <Image src={OPENNEZT_LOGO_GRADIENT} alt="OpenNezt" className="h-[480px] w-full object-contain" />{' '}
                  {/* Icon đổi background */}
                  <button
                     className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
                     title="Change your project background"
                     onClick={openBackgroundDialog}
                  >
                     <IconlyImage2 size={20} color="#4374c0" />
                  </button>
               </div>
            )}
         </div>
         <div className="p-8 bg-[#ffffff]">
            <div className="flex justify-between flex-col md:flex-row w-full px-[16px]">
               <div className="flex-1 item-left">
                  <div className="flex gap-3">
                     <div className="p-[4px] mt-[-60px] rounded-md bg-[#ffffff] relative">
                        {!logoError && project.logo ? (
                           <>
                              <Image
                                 src={project.logo}
                                 className="w-[150px] h-[150px] rounded-md"
                                 alt={project.name}
                                 aspectRatio={4 / 4}
                                 width="100%"
                                 objectFit="cover"
                                 onError={() => setLogoError(true)}
                              />{' '}
                              {/* Icon đổi logo */}
                              <button
                                 className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
                                 title="Change your project logo"
                                 onClick={openLogoDialog}
                              >
                                 <IconlyCamera size={20} color="#4374c0" />
                              </button>
                           </>
                        ) : (
                           <div className="h-[150px] w-[150px] flex items-center justify-center bg-[#EAEFF8] rounded-md p-4 relative">
                              {' '}
                              <Image src={OPENNEZT_LOGO} alt="OpenNezt" className="h-full w-full object-contain" />
                              {/* Icon đổi logo */}
                              <button
                                 className="absolute bottom-2 right-2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
                                 title="Change your project logo"
                                 onClick={openLogoDialog}
                              >
                                 <IconlyCamera size={20} color="#4374c0" />
                              </button>
                           </div>
                        )}
                     </div>{' '}
                     <div className="flex items-start justify-between">
                        <div className="flex-1">
                           <h5 className="text-2xl font-bold">{project.name}</h5>
                           {project.description && (
                              <div>
                                 <p className="italic font-medium text-gray-500 text-md">{project.description}</p>
                              </div>
                           )}
                        </div>{' '}
                        <button
                           className="ml-4 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                           title="Edit project name and description"
                           onClick={openBasicDialog}
                        >
                           <IconlyEdit size={16} color="#4374c0" backgroundColor="none" />
                        </button>
                     </div>
                  </div>
               </div>
               <div className="item-right mt-5 md:mt-0">
                  <ul className="flex flex-wrap items-center justify-center gap-5 p-0 m-0">
                     <li className="flex flex-col items-center">
                        <h5>0</h5>
                        Public
                     </li>
                     <li className="flex flex-col items-center">
                        <h5>0</h5>
                        Posts
                     </li>
                     <li className="flex flex-col items-center">
                        <h5>1</h5>
                        Member
                     </li>
                  </ul>{' '}
               </div>
            </div>
         </div>
         {/* Logo Dialog */}
         <Dialog.Root size="lg" placement="center" open={activeDialog === 'logo'} motionPreset="slide-in-bottom">
            <Portal>
               <Dialog.Backdrop />
               <Dialog.Positioner>
                  <Dialog.Content className="w-[600px] max-w-[95vw] p-0 mx-auto shadow-2xl border border-gray-200/50 rounded-xl bg-white/95 backdrop-blur-sm">
                     <LogoForm onClose={closeDialog} />
                  </Dialog.Content>
               </Dialog.Positioner>
            </Portal>
         </Dialog.Root>{' '}
         {/* Background Dialog */}
         <Dialog.Root size="lg" placement="center" open={activeDialog === 'background'} motionPreset="slide-in-bottom">
            <Portal>
               <Dialog.Backdrop />
               <Dialog.Positioner>
                  <Dialog.Content className="w-[600px] max-w-[95vw] p-0 mx-auto shadow-2xl border border-gray-200/50 rounded-xl bg-white/95 backdrop-blur-sm">
                     <BackgroundForm onClose={closeDialog} />
                  </Dialog.Content>
               </Dialog.Positioner>
            </Portal>
         </Dialog.Root>
         {/* Basic Form Dialog */}
         <Dialog.Root size="lg" placement="center" open={activeDialog === 'basic'} motionPreset="slide-in-bottom">
            <Portal>
               <Dialog.Backdrop />
               <Dialog.Positioner>
                  <Dialog.Content className="w-[600px] max-w-[95vw] p-0 mx-auto shadow-2xl border border-gray-200/50 rounded-xl bg-white/95 backdrop-blur-sm">
                     <BasicForm onClose={closeDialog} />
                  </Dialog.Content>
               </Dialog.Positioner>
            </Portal>
         </Dialog.Root>
      </>
   )
}

export default ProjectCard
