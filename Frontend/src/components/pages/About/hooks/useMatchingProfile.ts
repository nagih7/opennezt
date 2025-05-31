import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { matchingProjects } from '~/api/artificialIntelligence'
import { MatchingProjectProps, ProjectDetailsProps } from '~/types'
import { setHideLinkedinNotification } from '~/utils/localStorage'

const useMatchingProfile = () => {
   // State
   const [matches, setMatches] = useState<MatchingProjectProps[]>([])
   const [loading, setLoading] = useState<boolean>(false)
   const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false)
   const [openModalScrapLinkedin, setOpenModalScrapLinkedin] = useState<boolean>(false)
   const [showMatches, setShowMatches] = useState<boolean>(false)
   const [matchSelected, setMatchSelected] = useState<MatchingProjectProps | null>(null)
   const [showProject, setShowProject] = useState<boolean>(false)

   const [linkedinUsername, setLinkedinUsername] = useState<string>('')
   const [confirmed, setIsConfirmed] = useState<boolean>(false)
   const [hideNotification, setHideNotification] = useState<boolean>(false)

   // Check localStorage on component mount
   // useEffect(() => {
   //    if (openModalScrapLinkedin) {
   //       const savedPreference = getHideLinkedinNotification()
   //       if (savedPreference) handleSkip()
   //    }
   // }, [openModalScrapLinkedin])

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
         if (hideNotification) {
            setHideLinkedinNotification(true)
         }
         setOpenModalConfirm(false)
         setOpenModalScrapLinkedin(false)
         setLoading(true)
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
            setLoading(false)
            toast.dismiss()
         }
      }
   }

   const handleSkip = async () => {
      await handleSubmit()
   }

   const handleShowProject = (match: MatchingProjectProps) => {
      setMatchSelected(match)
      setShowProject(true)
   }

   return {
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

      setMatches: (newProjects: any[]) => setMatches(newProjects),
      setOpenModalConfirm: (value: boolean) => setOpenModalConfirm(value),
      setOpenModalScrapLinkedin: (value: boolean) => setOpenModalScrapLinkedin(value),
      setShowMatches: (value: boolean) => setShowMatches(value),
      setShowProject: (value: boolean) => setShowProject(value),

      handleUsernameChange,
      handleKeyDown,
      handleConfirmationChange,
      handleHideNotificationChange,
      handleSubmit,
      handleSkip,
      handleShowProject,
   }
}

export default useMatchingProfile
