import React, { ChangeEvent, useMemo, useState } from 'react'
import { MatchingContextType, MatchingProviderProps } from './types'
import { MatchingContext } from './MatchingContext'
import { BaseApiResponse, MatchingProjectProps } from '~/types'
import { toast } from 'sonner'
import { setHideLinkedinNotification } from '~/utils/localStorage'
import { matchingProjects, scrapLinkedIn } from '~/api/artificialIntelligence'

export const MatchingProvider: React.FC<MatchingProviderProps> = ({ children }) => {
   // LinkedIn scrap
   const [loading, setLoading] = useState<boolean>(false)
   const [linkedinUsername, setLinkedinUsername] = useState<string>('')
   const [confirmed, setIsConfirmed] = useState<boolean>(false)
   const [hideNotification, setHideNotification] = useState<boolean>(false)

   // Matching projects
   const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false)
   const [openModalScrapLinkedin, setOpenModalScrapLinkedin] = useState<boolean>(false)
   const [loadingMatching, setLoadingMatching] = useState<boolean>(false)
   const [matches, setMatches] = useState<MatchingProjectProps[]>([])
   const [showMatches, setShowMatches] = useState<boolean>(false)
   const [matchSelected, setMatchSelected] = useState<MatchingProjectProps | null>(null)
   const [showProject, setShowProject] = useState<boolean>(false)

   const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
      setLinkedinUsername(e.target.value)
   }

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         e.preventDefault()
         handleSubmit()
      }
      if (e.key === 'Escape') {
         setOpenModalScrapLinkedin(false)
      }
   }

   const handleConfirmationChange = (e: ChangeEvent<HTMLInputElement>) => {
      setIsConfirmed(e.target.checked)
   }

   const handleHideNotificationChange = (e: ChangeEvent<HTMLInputElement>) => {
      setHideNotification(e.target.checked)
   }

   const verifyAndSubmit = (): boolean => {
      if (!linkedinUsername.trim()) {
         toast.error('LinkedIn username is required')
         return false
      }

      if (!confirmed) {
         toast.error('Please confirm this is your LinkedIn account')
         return false
      }
      return true
   }

   const handleSubmit = async () => {
      if (verifyAndSubmit()) {
         setOpenModalScrapLinkedin(false)
         setLoading(true)
         try {
            toast.loading('Scrapping LinkedIn profile...')
            const response: BaseApiResponse = await scrapLinkedIn(linkedinUsername)
            if (response && response.success) {
               toast.dismiss()
               toast.success('LinkedIn profile scrapped successfully!')
               setShowMatches(true)
            } else {
               toast.dismiss()
               toast.error('Failed to scrap LinkedIn profile. Please try again.')
            }
         } catch (error) {
            toast.dismiss()
            console.error('Error scrapping LinkedIn profile:', error)
            toast.error('An error occurred while scrapping LinkedIn profile. Please try again.')
         } finally {
            setLoading(false)
         }
      }
   }

   const handleComfirmMatchingProjects = async () => {
      setOpenModalConfirm(false)
      setLoadingMatching(true)
      try {
         toast.loading('Matching projects, please wait...')
         const response = await matchingProjects(linkedinUsername)
         if (response && response.data) {
            setMatches(response.data)
            toast.success('Projects matched successfully!')
            setShowMatches(true)
         } else {
            toast.error('No projects matched. Please try again.')
         }
      } catch (error) {
         console.error('Error matching projects:', error)
         toast.error('Failed to match projects. Please try again.')
      } finally {
         setLoadingMatching(false)
         toast.dismiss()
      }
   }

   const handleSkip = async () => {
      if (hideNotification) {
         setHideLinkedinNotification(true)
      }
      setOpenModalScrapLinkedin(false)
   }

   const handleShowProject = (match: MatchingProjectProps) => {
      setMatchSelected(match)
      setShowProject(true)
   }

   const contextValue = useMemo<MatchingContextType>(
      () => ({
         // LinkedIn scrap
         loading,
         openModalScrapLinkedin,
         linkedinUsername,
         confirmed,
         hideNotification,

         handleUsernameChange,
         handleKeyDown,
         handleConfirmationChange,
         handleHideNotificationChange,
         handleSubmit,
         handleSkip,
         handleShowProject,

         // Matching projects
         matches,
         openModalConfirm,
         showMatches,
         loadingMatching,
         matchSelected,
         showProject,

         setLoadingMatching: (value: boolean) => setLoadingMatching(value),
         setMatches: (newProjects: any[]) => setMatches(newProjects),
         setOpenModalConfirm: (value: boolean) => setOpenModalConfirm(value),
         setOpenModalScrapLinkedin: (value: boolean) => setOpenModalScrapLinkedin(value),
         setShowMatches: (value: boolean) => setShowMatches(value),
         setShowProject: (value: boolean) => setShowProject(value),

         handleComfirmMatchingProjects,
      }),
      [
         matches,
         loading,
         openModalConfirm,
         showMatches,
         openModalScrapLinkedin,
         linkedinUsername,
         confirmed,
         hideNotification,
         matchSelected,
         showProject,
         loadingMatching,
      ]
   )

   return <MatchingContext.Provider value={contextValue}>{children}</MatchingContext.Provider>
}
