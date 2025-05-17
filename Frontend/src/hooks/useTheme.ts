import { useState, useEffect } from 'react'
import useLocalStorage from './useLocalStorage'

type ThemeType = 'light' | 'dark' | 'system'

interface UseThemeReturn {
   theme: ThemeType
   isDarkMode: boolean
   setTheme: (theme: ThemeType) => void
   toggleTheme: () => void
}

/**
 * Custom hook for managing application theme
 * @returns Theme state and functions to modify it
 */
const useTheme = (): UseThemeReturn => {
   const [theme, setTheme] = useLocalStorage<ThemeType>('app-theme', 'system')
   const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

   // Handle system preference changes
   useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      const handleChange = () => {
         if (theme === 'system') {
            setIsDarkMode(mediaQuery.matches)
            updateThemeClass(mediaQuery.matches)
         }
      }

      // Initial setup
      if (theme === 'system') {
         setIsDarkMode(mediaQuery.matches)
      } else {
         setIsDarkMode(theme === 'dark')
      }

      // Add listener for system preference changes
      mediaQuery.addEventListener('change', handleChange)

      // Clean up
      return () => mediaQuery.removeEventListener('change', handleChange)
   }, [theme])

   // Apply theme class to document
   useEffect(() => {
      let isDark: boolean

      if (theme === 'system') {
         isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      } else {
         isDark = theme === 'dark'
      }

      setIsDarkMode(isDark)
      updateThemeClass(isDark)
   }, [theme])

   // Update the HTML class for theming
   const updateThemeClass = (isDark: boolean) => {
      if (isDark) {
         document.documentElement.classList.add('dark')
      } else {
         document.documentElement.classList.remove('dark')
      }
   }

   // Toggle between light and dark (ignoring system)
   const toggleTheme = () => {
      if (theme === 'system') {
         setTheme(isDarkMode ? 'light' : 'dark')
      } else {
         setTheme(theme === 'dark' ? 'light' : 'dark')
      }
   }

   return {
      theme,
      isDarkMode,
      setTheme,
      toggleTheme,
   }
}

export default useTheme
