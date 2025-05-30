import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Input } from 'components/UI/input'
import { Button } from '~/components/UI/button'
import _ from 'lodash'
// import { handleCheckValidateConfirm } from '~/utils/helper'
import ModalGeneralComponent from '~/components/UI/Modal/ModalGeneral'
import { useDispatch, useSelector } from 'react-redux'
import { setErrorCreateOrUpdateEmployee, setVisibleModalCreateOrUpdateEmployee } from '~/store/modules/employee'
import { handleCreateEmployee, handleUpdateEmployee } from '~/api/employee'

// Type for Redux dispatch with async actions
type AppDispatch = any

// Type declaration for JavaScript ModalGeneral component
const ModalGeneral: React.FC<{
   isModalOpen: boolean
   onClose: () => void
   configModal: ConfigModal
   children: React.ReactNode
}> = ModalGeneralComponent as any

interface Employee {
   id: string
   name: string
   email: string
   phone: string
}

interface ConfigModal {
   title: string
   type: 'CREATE' | 'UPDATE'
}

interface CreateOrUpdateProps {
   employee: Employee
   configModal: ConfigModal
}

interface DataCreateOrUpdate {
   name: string
   email: string
   phone: string
   password: string
   confirmPassword: string
}

interface ErrorCreateOrUpdate {
   name: string
   email: string
   phone: string
   password: string
   confirmPassword: string
}

const CreateOrUpdate: React.FC<CreateOrUpdateProps> = ({ employee, configModal }) => {
   const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState<DataCreateOrUpdate>({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
   })
   const visibleModalCreateOrUpdateEmployee = useSelector(
      (state: any) => state.employee.visibleModalCreateOrUpdateEmployee
   )
   const isLoadingBtnCreateOrUpdateEmployee = useSelector(
      (state: any) => state.employee.isLoadingBtnCreateOrUpdateEmployee
   )
   const errorCreateOrUpdateEmployee = useSelector((state: any) => state.employee.errorCreateOrUpdateEmployee)
   const dispatch = useDispatch<AppDispatch>()

   useEffect(() => {
      handleReloadData()
   }, [visibleModalCreateOrUpdateEmployee])

   useEffect(() => {
      dispatch(
         setErrorCreateOrUpdateEmployee({
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
         })
      )
   }, [dataCreateOrUpdate, dispatch])

   useEffect(() => {
      setDataCreateOrUpdate({
         name: employee.name,
         email: employee.email,
         phone: employee.phone,
         password: '',
         confirmPassword: '',
      })
   }, [employee])

   const handleReloadData = (): void => {
      setDataCreateOrUpdate({
         name: '',
         email: '',
         phone: '',
         password: '',
         confirmPassword: '',
      })
   }

   const handleChangeInput = (
      valueInput: React.ChangeEvent<HTMLInputElement>,
      type: keyof DataCreateOrUpdate
   ): void => {
      let value = valueInput.target.value
      let data = _.cloneDeep(dataCreateOrUpdate)
      data[type] = value
      setDataCreateOrUpdate(data)
   }

   const validateBlur = (_type: keyof ErrorCreateOrUpdate): boolean => {
      // let validate = isValidate(dataCreateOrUpdate, type, errorCreateOrUpdateEmployee)
      // dispatch(setErrorCreateOrUpdateEmployee(validate.error))
      // return validate.isError
      return false // Placeholder for validation logic
   }

   const handleConfirmCreateOrUpdateUser = (): void => {
      let data = new FormData()
      data.append(`name`, dataCreateOrUpdate.name)
      data.append(`email`, dataCreateOrUpdate.email)
      data.append(`phone`, dataCreateOrUpdate.phone)
      data.append(`status`, '1')

      if (configModal.type === 'CREATE') {
         data.append(`password`, dataCreateOrUpdate.password)
      }

      // let validate = handleCheckValidateConfirm(dataValidate, errorCreateOrUpdateEmployee)
      // dispatch(setErrorCreateOrUpdateEmployee(validate.dataError))
      // if (!validate.isError) {
      if (configModal.type === 'CREATE') {
         dispatch(handleCreateEmployee(data))
      } else {
         dispatch(handleUpdateEmployee(data, employee.id))
      }
      // }
   }

   return (
      <ModalGeneral
         isModalOpen={visibleModalCreateOrUpdateEmployee}
         onClose={() => dispatch(setVisibleModalCreateOrUpdateEmployee(false))}
         configModal={configModal}
      >
         <div className={styles.mainModalWrap}>
            <div className="relative mb-8">
               <Input
                  type={'text'}
                  placeholder={'Enter name...'}
                  onChange={(e) => handleChangeInput(e, 'name')}
                  onBlur={() => validateBlur('name')}
                  value={dataCreateOrUpdate.name}
                  className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
                  error={errorCreateOrUpdateEmployee.name}
               />
               <label
                  htmlFor=""
                  className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
               >
                  Name *
               </label>
            </div>

            <div className="relative mb-8">
               <Input
                  type={'text'}
                  placeholder={'Enter email...'}
                  onChange={(e) => handleChangeInput(e, 'email')}
                  onBlur={() => validateBlur('email')}
                  value={dataCreateOrUpdate.email}
                  className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
                  error={errorCreateOrUpdateEmployee.email}
               />
               <label
                  htmlFor=""
                  className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
               >
                  Email *
               </label>
            </div>

            <div className="relative mb-8">
               <Input
                  type={'text'}
                  placeholder={'Enter phone...'}
                  onChange={(e) => handleChangeInput(e, 'phone')}
                  onBlur={() => validateBlur('phone')}
                  value={dataCreateOrUpdate.phone}
                  className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
                  error={errorCreateOrUpdateEmployee.phone}
               />
               <label
                  htmlFor=""
                  className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
               >
                  Phone *
               </label>
            </div>

            {configModal.type === 'CREATE' ? (
               <div className="relative mb-8">
                  <Input
                     type={'password'}
                     placeholder={'Enter password...'}
                     onChange={(e) => handleChangeInput(e, 'password')}
                     onBlur={() => validateBlur('password')}
                     value={dataCreateOrUpdate.password}
                     className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
                     error={errorCreateOrUpdateEmployee.password}
                  />
                  <label
                     htmlFor=""
                     className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                  >
                     Password *
                  </label>
               </div>
            ) : (
               ''
            )}

            {configModal.type === 'CREATE' ? (
               <div className="relative mb-8">
                  <Input
                     type={'password'}
                     placeholder={'Enter password...'}
                     onChange={(e) => handleChangeInput(e, 'confirmPassword')}
                     onBlur={() => validateBlur('confirmPassword')}
                     value={dataCreateOrUpdate.confirmPassword}
                     className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
                     error={errorCreateOrUpdateEmployee.confirmPassword}
                  />
                  <label
                     htmlFor=""
                     className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                  >
                     ConfirmPassword *
                  </label>
               </div>
            ) : (
               ''
            )}

            <div className={styles.btnWrap}>
               <Button
                  textBtn={'Save'}
                  loading={isLoadingBtnCreateOrUpdateEmployee}
                  onClick={() => handleConfirmCreateOrUpdateUser()}
                  disable={false}
                  style={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}
               />
            </div>
         </div>
      </ModalGeneral>
   )
}

export default CreateOrUpdate
