import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import EditProfile from './components/EditProfile'
import ChangePassword from './components/ChangePassword'
import store from 'states/configureStore'
import { useSelector } from 'react-redux'
import { changeAvatar, changeBackground } from 'api/profile'
import { Upload, Col, Row, Tabs, message } from 'antd'
import AvatarDefault from 'assets/images/default/AvatarDefault.png'
import BackgroundDefault from 'assets/images/default/BackgroundDefault.png'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import resizeLogo from 'utils/files/resizeLogo'
import resizeBackground from 'utils/files/resizeBackground'

// import Order from "./components/Order";

function Profile() {
    const authUser = useSelector((state) => state.auth.authUser)
    const [avatar, setAvatar] = useState('')
    const [background, setBackground] = useState('')
    const [keyTable, setKeyTable] = useState('1')
    const items = [
        {
            key: '1',
            label: 'Edit profile',
        },
        {
            key: '2',
            label: 'Change password',
        },
    ]

    useEffect(() => {
        if (authUser.avatar) {
            setAvatar(authUser.avatar)
        }
        if (authUser.background) {
            setBackground(authUser.background)
        }
    }, [authUser])

    const onChange = (key) => {
        setKeyTable(key)
    }

    const propsAvatar = {
        name: 'file',
        customRequest: async ({ file }) => {
            const avatar = await resizeLogo(file)
            const formData = new FormData()
            formData.append('avatar', avatar)
            await store.dispatch(changeAvatar(formData))
            setAvatar(URL.createObjectURL(avatar))
            message.success('Change avatar success')
        },
        multiple: false,
        maxCount: 1,
        showUploadList: false,
    }

    const propsBackground = {
        name: 'file',
        customRequest: async ({ file }) => {
            const background = await resizeBackground(file)
            const formData = new FormData()
            formData.append('background', background)
            await store.dispatch(changeBackground(formData))
            setBackground(URL.createObjectURL(background))
            message.success('Change background success')
        },
        multiple: false,
        maxCount: 1,
        showUploadList: false,
    }

    return (
        <div className={styles.profileWrap}>
            <Row gutter={20}>
                <Col span={24}>
                    <div className={`${styles.profileItem} rounded-md`}>
                        <div className={styles.informationWrap}>
                            <div className={styles.backgroundWrap}>
                                <img src={background || BackgroundDefault} className="rounded-md" />
                                <div className={styles.buttonChangeBackground}>
                                    <Upload {...propsBackground}>
                                        <CameraAltIcon fontSize="2rem" />
                                        <span className={styles.btnWrap}>Update Background</span>
                                    </Upload>
                                </div>
                            </div>
                            <div className={styles.infomationContent}>
                                <div className={styles.avatarWrap}>
                                    <div className={styles.btnChangeAvatar}>
                                        <Upload {...propsAvatar}>
                                            <CameraAltIcon fontSize="12px" />
                                        </Upload>
                                    </div>
                                    <img
                                        src={avatar || AvatarDefault}
                                        onError={(e) => {
                                            e.target.onerror = null
                                            e.target.src = AvatarDefault
                                        }}
                                        alt={authUser.name}
                                    />
                                </div>
                                <div className={styles.infoWrap}>
                                    <div className={styles.name}>{authUser.name}</div>

                                    <div className={styles.btnWrap}></div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.tabWrap} tab-custom`}>
                            <Tabs defaultActiveKey={keyTable} items={items} onChange={onChange} />
                        </div>
                    </div>
                </Col>

                {keyTable === '1' ? (
                    <Col span={24}>
                        <EditProfile />
                    </Col>
                ) : (
                    ''
                )}

                {keyTable === '2' ? (
                    <Col span={24}>
                        <ChangePassword />
                    </Col>
                ) : (
                    ''
                )}
            </Row>
        </div>
    )
}

export default Profile
