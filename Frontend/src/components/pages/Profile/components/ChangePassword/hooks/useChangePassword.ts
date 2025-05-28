import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangePassword } from '~/api/profile'

interface DataChangePassword {
   currentPassword: string
   password: string
   confirmPassword: string
}

const useChangePassword = () => {
    const authUser = useSelector((state: any) => state.auth.authUser)
    const [dataChangePassword, setDataChangePassword] = useState<DataChangePassword>({
        currentPassword: '',
        password: '',
        confirmPassword: '',
    })
    const loadingBtnChangePassword = useSelector((state: any) => state.profile.loadingBtnChangePassword)
    const dispatch = useDispatch()

    useEffect(() => {
        setDataChangePassword({
            currentPassword: '',
            password: '',
            confirmPassword: '',
        })
    }, [authUser])

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>, type: keyof DataChangePassword) => {
        setDataChangePassword((prev) => ({
            ...prev,
            [type]: e.target.value,
        }))
    }

    const handleConfirmChangePassword = () => {
        const data = new FormData()
        data.append('current_password', dataChangePassword.currentPassword)
        data.append('password', dataChangePassword.password)
        data.append('password_confirmation', dataChangePassword.confirmPassword)
        dispatch(handleChangePassword(data) as any)
    }
    return {
        dataChangePassword,
        setDataChangePassword,
        loadingBtnChangePassword,
        handleChangeInput,
        handleConfirmChangePassword,
    }
}

export default useChangePassword
