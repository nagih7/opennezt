import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { resetRegister, resetAuthRegister } from 'store/modules/auth'
import MailIcon from '@mui/icons-material/Mail'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const Verify = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { authRegister } = useSelector((state) => state.auth)

   useEffect(() => {
      dispatch(resetRegister)
      // eslint-disable-next-line
   }, [])

   useEffect(() => {
      if (authRegister && !authRegister.email) {
         navigate('/login')
      }
   }, [authRegister, navigate])

   const handleNavigateToLogin = () => {
      dispatch(resetAuthRegister())
      navigate('/login')
   }

   return (
      <div className={styles.verifyAuthenticationWrap}>
         <div className={styles.verifyContent}>
            <div className={styles.verifyIcon}>
               <MailIcon className={styles.verifyIcon} />
            </div>
            <div className={styles.verifyTitle}>Verify your email address</div>
            <div className={styles.verifyText}>
               <span>
                  We have sent an email to{' '}
                  <a href="https://gmail.com" target="_blank" rel="noopener noreferrer">
                     {authRegister.email}
                  </a>
               </span>
               <span className={styles.verifyText}>Please check your email to verify your account.</span>
            </div>
            <div className={styles.verifyButton}>
               <Button className={styles.btn} onClick={handleNavigateToLogin}>
                  Back to sign in
               </Button>
            </div>
         </div>
      </div>
   )
}

export default Verify
