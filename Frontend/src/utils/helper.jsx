import React from 'react'
import store from '~/store'
import moment from 'moment'
import { toast } from '~/components/UI/toast'
import CloseIcon from 'assets/images/icon/close.svg'
import success from 'assets/images/icon/notification/success_16x16.svg'
import error from 'assets/images/icon/notification/error_16x16.svg'
import warning from 'assets/images/icon/notification/warning_16x16.svg'

export const VALIDATE_EMAIL_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9_.+-]{1,}@[a-z0-9]{1,}(\.[a-z0-9]{1,}){1,2}$/
export const VALIDATE_PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,50}$/
export const VALIDATE_PHONE_REGEX_RULE = /^[0-9]{3}[0-9]{3}[0-9]{4}$/

export const handleCheckRoute = (routes, currentRoute) => {
   if (routes && routes.length > 0) {
      return routes.includes(currentRoute)
   }
}

export const hasPermission = (permissions) => {
   let { auth } = store.getState()
   let isPermission = false
   if (permissions) {
      permissions.map((permission) => {
         if (
            auth.authUser &&
            auth.authUser.permissions &&
            (auth.authUser.permissions.includes('super-admin') || auth.authUser.permissions.includes(permission))
         ) {
            isPermission = true
         }
      })
   }

   return isPermission
}

export const isValidEmail = (email) => {
   let result = false
   if (email && typeof email === 'string') {
      const regex = RegExp(VALIDATE_EMAIL_REGEX)
      result = regex.test(email.trim())
   }
   return result
}

export const isValidPassword = (password) => {
   let result = false
   if (password && typeof password === 'string') {
      const regex = RegExp(VALIDATE_PASSWORD_REGEX)
      result = regex.test(password.trim())
   }
   return result
}

export const isValidPhone = (phone) => {
   let result = false

   if (phone && typeof phone === 'string') {
      let trimPhone = phone.trim()

      if (trimPhone) {
         const regexRule = RegExp(VALIDATE_PHONE_REGEX_RULE)

         let ruleMatchs = trimPhone.match(regexRule)

         if (ruleMatchs && ruleMatchs.length > 0) {
            result = ruleMatchs[0] === trimPhone
         }
      }
   }
   return result
}

export const handleCheckValidateConfirm = (data, errors) => {
   let isError = false
   let dataError = { ...errors }

   // Reset all errors first
   Object.keys(dataError).forEach((key) => {
      dataError[key] = ''
   })

   // Check each field in data
   Object.keys(data).forEach((key) => {
      const value = data[key]

      if (!value || (typeof value === 'string' && value.trim() === '')) {
         dataError[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
         isError = true
      } else {
         // Specific validation for different fields
         if (key === 'email' && !isValidEmail(value)) {
            dataError[key] = 'Please enter a valid email address'
            isError = true
         }

         if (key === 'password' && !isValidPassword(value)) {
            dataError[key] =
               'Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character and be 6-50 characters long'
            isError = true
         }

         if (key === 'phone' && !isValidPhone(value)) {
            dataError[key] = 'Please enter a valid phone number'
            isError = true
         }
      }
   })

   return {
      isError,
      dataError,
      error: dataError,
   }
}

export { toast } from 'sonner'

toast.success('Thành công!')
toast.error('Có lỗi xảy ra!')
