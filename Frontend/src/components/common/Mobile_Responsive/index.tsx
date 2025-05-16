import React, { useEffect } from 'react'
import styles from './styles.module.scss'

const Mobile_Responsive: React.FC = () => {
   useEffect(() => {
      document.title = 'This website is not available on mobile devices'
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
         metaDescription.setAttribute('content', 'This website is only available on desktop devices')
      }
   }, [])

   return (
      <div className={styles.container}>
         <svg
            className={styles.artwork}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1120 700"
            width="1120"
            height="700"
         >
            <circle cx="292.61" cy="213" r="213" fill="#f2f2f2" />
         </svg>
         <h1>This website is not available on mobile devices</h1>
         <p>Please access this website from a desktop computer or laptop.</p>
         <p>Mobile version coming soon.</p>
         <a href="https://opennezt.com" className={styles.link}>
            Join our Landing Page
         </a>
      </div>
   )
}

export default Mobile_Responsive
