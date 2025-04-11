import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import store from 'states/configureStore'
import { logout } from 'api/auth'
import { IconlyLogout, IconlySetting, IconlyUser } from 'components/UI/Iconly'
import { Stack } from '@chakra-ui/react'

function PopoverProfile() {
    const navigate = useNavigate()
    const isAuthSuccess = useSelector((state) => state.auth.isAuthSuccess)
    const authUser = useSelector((state) => state.auth.authUser)

    useEffect(() => {
        if (!isAuthSuccess) {
            navigate('/login')
        }
    }, [isAuthSuccess, navigate])

    const handleConfirmLogOut = async () => {
        await store.dispatch(logout())
        window.location.reload()
    }

    return (
        <Stack className="bg-[#ffffff] rounded-md gap-0" direction={'column'} spacing={0}>
            <Stack className="mx-2 p-[16px] border-b border-gray-200 text-md font-bold ">
                <div className={styles.name}>{authUser?.name}</div>
            </Stack>
            <Stack
                direction={'row'}
                spacing={2}
                align={'center'}
                className="p-[15px] hover:bg-[#f6f5f5] cursor-pointer"
                onClick={() => navigate('/profile')}
            >
                <IconlyUser color={'#374151'} size={12} />
                Profile
            </Stack>

            <Stack
                direction={'row'}
                spacing={2}
                align={'center'}
                className="p-[15px] hover:bg-[#f6f5f5] cursor-pointer"
                onClick={() => navigate('/account-settings')}
            >
                <IconlySetting color={'#374151'} size={12} />
                <span>Account Settings</span>
            </Stack>
            <Stack
                direction={'row'}
                spacing={2}
                align={'center'}
                className="p-[15px] hover:bg-[#f6f5f5] cursor-pointer"
                onClick={() => handleConfirmLogOut()}
            >
                <IconlyLogout color={'#374151'} size={12} />
                <span>Log out</span>
            </Stack>
        </Stack>
    )
}

export default PopoverProfile
