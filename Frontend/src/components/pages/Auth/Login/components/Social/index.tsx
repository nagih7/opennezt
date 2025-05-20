import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { Tooltip } from 'antd'
import { loginWithSocial } from 'api/auth'
import { useNavigate } from 'react-router-dom'

const Social: React.FC = () => {
   const navigate = useNavigate()

   useEffect(() => {
      const params = new URLSearchParams(window.location.search)
      const token = params.get('access_token')

      if (token) {
         localStorage.setItem('token', token)
      }
      navigate('/login')
   }, [navigate])

   const loginWithLinkedIn = (): void => {
      loginWithSocial('linkedin')
   }
   const loginWithGoogle = (): void => {
      loginWithSocial('google')
   }

   return (
      <div className={styles.socialWrap}>
         <div className={styles.titleWrap}>
            <div className={styles.breakWrap} />
            <div className={styles.boxTitleWrap}>
               <span className={styles.title}>Login with socials</span>
            </div>
         </div>

         <div className={styles.listSocialWrap}>
            <Tooltip title="LinkedIn" placement="top">
               <div className={styles.socialItemWrap} onClick={loginWithLinkedIn}>
                  <div className={styles.imgWrap}>
                     <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 32 32">
                        <path d="M 8.6425781 4 C 7.1835781 4 6 5.181625 6 6.640625 C 6 8.099625 7.182625 9.3085938 8.640625 9.3085938 C 10.098625 9.3085938 11.283203 8.099625 11.283203 6.640625 C 11.283203 5.182625 10.101578 4 8.6425781 4 z M 21.535156 11 C 19.316156 11 18.0465 12.160453 17.4375 13.314453 L 17.373047 13.314453 L 17.373047 11.310547 L 13 11.310547 L 13 26 L 17.556641 26 L 17.556641 18.728516 C 17.556641 16.812516 17.701266 14.960938 20.072266 14.960938 C 22.409266 14.960937 22.443359 17.145609 22.443359 18.849609 L 22.443359 26 L 26.994141 26 L 27 26 L 27 17.931641 C 27 13.983641 26.151156 11 21.535156 11 z M 6.3632812 11.310547 L 6.3632812 26 L 10.923828 26 L 10.923828 11.310547 L 6.3632812 11.310547 z"></path>
                     </svg>
                  </div>
               </div>
            </Tooltip>
            <Tooltip title="Google" placement="top">
               <div className={styles.socialItemWrap} onClick={loginWithGoogle}>
                  <div className={styles.imgWrap}>
                     <svg className={styles.google} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                        <path
                           fill="currentColor"
                           d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                        />
                     </svg>
                  </div>
               </div>
            </Tooltip>
            <Tooltip title="Coming soon" placement="top">
               <div className={styles.socialItemWrap}>
                  <div className={styles.imgWrap}>
                     <svg className={styles.face} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path
                           fill="currentColor"
                           d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                        />
                     </svg>
                  </div>
               </div>
            </Tooltip>
            <Tooltip title="Coming soon" placement="top">
               <div className={styles.socialItemWrap}>
                  <div className={styles.imgWrap}>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                           fill="currentColor"
                           d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                        />
                     </svg>
                  </div>
               </div>
            </Tooltip>
         </div>
      </div>
   )
}

export default Social
