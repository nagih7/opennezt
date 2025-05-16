import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLocation } from '../../../store/modules/app'
import LazyLoading from 'components/UI/LazyLoading'
import banner from '../../../assets/images/background/banner_auth_layout.jpg'

AuthLayout.propTypes = {
   title: PropTypes.string,
   path: PropTypes.string,
   children: PropTypes.node,
}

AuthLayout.defaultProps = {
   title: '',
}

function AuthLayout(props) {
   const { children, title, path } = props
   const location = useSelector((state) => state.app.location)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   useEffect(() => {
      if (location.pathName !== location.prevPathName) {
         dispatch(
            setLocation({
               pathName: location.pathName,
               payload: location.payload,
               prevPathName: location.pathName,
            })
         )
         navigate(location.pathName)
      }
   }, [location, navigate, dispatch])

   return (
      <div className={styles.layoutAuthWrap}>
         {path === 'login' && (
            <div className={styles.mainWrap}>
               <LazyLoading>{children}</LazyLoading>
               <div className={styles.bannerWrap}>
                  <div className={styles.banner}>
                     <img src={banner} alt="banner" />
                  </div>
                  <div className={styles.bannerContent}>
                     <h3 className={styles.authSlogan}>Connecting Visionaries, Building Futures</h3>
                     <p className={styles.authDescription}>
                        OpenNezt is a platform that connects founders with talented individuals, enabling easy
                        collaboration to build strong teams and bring ideas to life.
                     </p>
                  </div>
               </div>
            </div>
         )}
         {path === 'register' && (
            <div className={styles.mainWrap}>
               <div className={styles.bannerWrap}>
                  <div className={styles.banner}>
                     <img src={banner} alt="banner" />
                  </div>
                  <div className={styles.bannerContent}>
                     <h3 className={styles.authSlogan}>Connecting Visionaries, Building Futures</h3>
                     <p className={styles.authDescription}>
                        OpenNezt is a platform that connects founders with talented individuals, enabling easy
                        collaboration to build strong teams and bring ideas to life.
                     </p>
                  </div>
               </div>
               <LazyLoading>{children}</LazyLoading>
            </div>
         )}
         {path === 'forgot-password' && (
            <div className={styles.mainWrap}>
               <LazyLoading>{children}</LazyLoading>
               <div className={styles.bannerWrap}>
                  <div className={styles.banner}>
                     <img src={banner} alt="banner" />
                  </div>
                  <div className={styles.bannerContent}>
                     <h3 className={styles.authSlogan}>Connecting Visionaries, Building Futures</h3>
                     <p className={styles.authDescription}>
                        OpenNezt is a platform that connects founders with talented individuals, enabling easy
                        collaboration to build strong teams and bring ideas to life.
                     </p>
                  </div>
               </div>
            </div>
         )}
         {path === 'verify' && <LazyLoading>{children}</LazyLoading>}
         {path === 'reset-password' && <LazyLoading>{children}</LazyLoading>}
      </div>
   )
}

export default AuthLayout
