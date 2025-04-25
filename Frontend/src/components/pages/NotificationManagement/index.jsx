import { ActionBar, Button, Kbd, Portal, Spinner, Table, Tabs } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import RightSidebar from 'components/common/RightSidebar'
import store from 'states/configureStore'
import moment from 'moment'
import {
    CONFIRM_FRIEND_REQUEST_NOTIFICATION,
    CONFIRM_PROJECT_INVITATION_NOTIFICATION,
    CONFIRM_STATUS,
    FRIEND_REQUEST_NOTIFICATION,
    PROJECT_APPLICATION_NOTIFICATION,
    PROJECT_INVITATION_NOTIFICATION,
    WAITING_STATUS,
} from 'utils/constants'
import ConfirmFriendRequestNotification from 'components/layouts/AppLayout/Header/components/PopoverNotification/components/ConfirmFriendRequestNotification'
import ProjectApplicationNotification from 'components/layouts/AppLayout/Header/components/PopoverNotification/components/ProjectApplicationNotification'
import ConfirmProjectInvitationNoitification from 'components/layouts/AppLayout/Header/components/PopoverNotification/components/ConfirmProjectInvitationNoitification'
import ProjectInvitationNotification from 'components/layouts/AppLayout/Header/components/PopoverNotification/components/ProjectInvitationNotification'
import FriendRequestNotification from 'components/layouts/AppLayout/Header/components/PopoverNotification/components/FriendRequestNotification'
import Actions from 'components/layouts/AppLayout/Header/components/PopoverNotification/components/Actions'
import { markAsRead, replyNotification } from 'api/notification'
import { postProjectDetailsActivitiesNewMember } from 'api/activity'

function NotificationProject() {
    const dispatch = useDispatch()
    // ========= STATE FROM REDUX STORE ========== //
    const { notifications, isLoadingReplyNotification } = useSelector((state) => state.notification)
    // ========= STATE ========== //
    const [unread, setUnread] = useState([])
    const [read, setRead] = useState([])

    // ========= USE EFFECT ========== //
    useEffect(() => {
        if (notifications && notifications.length > 0) {
            setRead(
                notifications.filter((notification) => notification.metadata && notification.metadata.read === true)
            )
            setUnread(
                notifications.filter((notification) => !notification.metadata || notification.metadata.read === false)
            )
        }
    }, [notifications])

    // ========== HANDLE REPLY NOTIFICATION ========== //
    const handleReplyNotification = async (notification_id, action) => {
        await store.dispatch(replyNotification(notification_id, action))
        await store.dispatch(getConversations())
        if (action === 'confirm') {
            await postProjectDetailsActivitiesNewMember(notification_id, {})
        }
    }
    // ========== HANDLE MARK AS READ ========== //
    const handleMarkAsRead = async (notification) => {
        if (notification.metadata?.read === false) {
            await store.dispatch(markAsRead(notification._id))
        }
    }

    // ========== STATE ========== //
    const [selection, setSelection] = useState([])
    const hasSelection = selection.length > 0
    // const indeterminate = hasSelection && selection.length < unread.length
    const allRows = notifications.map((notification, index) => (
        <Table.Row
            key={notification._id}
            data-selected={selection.includes(notification._id) ? '' : undefined}
            onClick={() => {
                // Chỉ áp dụng handleMarkAsRead nếu thông báo chưa đọc
                if (notification.metadata?.read === false) {
                    handleMarkAsRead(notification)
                }
            }}
            className={notification.metadata?.read === false ? 'cursor-pointer hover:bg-gray-50' : ''}
        >
            {/* <Table.Cell>
                <Checkbox.Root
                    size="sm"
                    top="0.5"
                    aria-label="Select row"
                    checked={selection.includes(notification._id)}
                    onCheckedChange={(changes) => {
                        setSelection((prev) =>
                            changes.checked ? [...prev, notification._id] : selection.filter((_id) => _id !== notification._id)
                        )
                    }}
                >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                </Checkbox.Root>
            </Table.Cell> */}
            <Table.Cell className="py-4 pl-8 ">
                {(() => {
                    switch (notification.type?.name) {
                        case PROJECT_INVITATION_NOTIFICATION:
                            return <ProjectInvitationNotification notification={notification} />
                        case FRIEND_REQUEST_NOTIFICATION:
                            return <FriendRequestNotification notification={notification} />
                        case CONFIRM_FRIEND_REQUEST_NOTIFICATION:
                            return <ConfirmFriendRequestNotification notification={notification} />
                        case PROJECT_APPLICATION_NOTIFICATION:
                            return <ProjectApplicationNotification notification={notification} />
                        case CONFIRM_PROJECT_INVITATION_NOTIFICATION:
                            return <ConfirmProjectInvitationNoitification notification={notification} />
                        default:
                            return (
                                <div className="text-[#6f7f92] text-sm font-medium">
                                    {notification.message || 'New notification'}
                                </div>
                            )
                    }
                })()}
            </Table.Cell>
            <Table.Cell>{moment(notification.timestamp).fromNow()}</Table.Cell>
            <Table.Cell
                justifyContent={'center'}
                textAlign="center"
                display={'flex'}
                alignItems={'center'}
                height={'68px'}
            >
                {/* <button
                    onClick={() => markAsRead(notification._id)}
                    className="p-2 bg-gray-200 rounded hover:bg-gray-300 w-[2.5rem] h-[2.5rem] mx-1"
                >
                    <EyeOutlined className="text-gray-600 " />
                </button>
                <button
                    className="p-2 bg-red-100 rounded hover:bg-red-200 w-[2.5rem] h-[2.5rem] mx-1"
                    // onClick={() => deleteNotification(notification.id)}
                >
                    <DeleteOutlined className="text-red-600" />
                </button> */}
                {(() => {
                    switch (notification._id) {
                        case index:
                            switch (isLoadingReplyNotification) {
                                case true:
                                    return <Spinner size="md" />
                                default:
                                    switch (notification.metadata.status) {
                                        case WAITING_STATUS:
                                            return (
                                                <Actions
                                                    notification={notification}
                                                    handleReplyNotification={handleReplyNotification}
                                                    index={index}
                                                />
                                            )
                                        case CONFIRM_STATUS:
                                            return null
                                        default:
                                            return null
                                    }
                            }
                        default:
                            switch (notification.metadata.status) {
                                case WAITING_STATUS:
                                    return (
                                        <Actions
                                            notification={notification}
                                            handleReplyNotification={handleReplyNotification}
                                            index={index}
                                        />
                                    )
                                case CONFIRM_STATUS:
                                    return null
                                default:
                                    return null
                            }
                    }
                })()}
            </Table.Cell>
        </Table.Row>
    ))
    const unreadRows = unread.map((notification, index) => (
        <Table.Row
            key={notification._id}
            data-selected={selection.includes(notification._id) ? '' : undefined}
            onClick={() => handleMarkAsRead(notification)}
            className="cursor-pointer hover:bg-gray-50"
        >
            {/* <Table.Cell>
                <Checkbox.Root
                    size="sm"
                    top="0.5"
                    aria-label="Select row"
                    checked={selection.includes(notification._id)}
                    onCheckedChange={(changes) => {
                        setSelection((prev) =>
                            changes.checked ? [...prev, notification._id] : selection.filter((_id) => _id !== notification._id)
                        )
                    }}
                >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                </Checkbox.Root>
            </Table.Cell> */}
            <Table.Cell className="py-4 pl-8 ">
                {(() => {
                    switch (notification.type?.name) {
                        case PROJECT_INVITATION_NOTIFICATION:
                            return <ProjectInvitationNotification notification={notification} />
                        case FRIEND_REQUEST_NOTIFICATION:
                            return <FriendRequestNotification notification={notification} />
                        case CONFIRM_FRIEND_REQUEST_NOTIFICATION:
                            return <ConfirmFriendRequestNotification notification={notification} />
                        case PROJECT_APPLICATION_NOTIFICATION:
                            return <ProjectApplicationNotification notification={notification} />
                        case CONFIRM_PROJECT_INVITATION_NOTIFICATION:
                            return <ConfirmProjectInvitationNoitification notification={notification} />
                        default:
                            return (
                                <div className="text-[#6f7f92] text-sm font-medium">
                                    {notification.message || 'New notification'}
                                </div>
                            )
                    }
                })()}
            </Table.Cell>
            <Table.Cell>{moment(notification.timestamp).fromNow()}</Table.Cell>
            <Table.Cell textAlign="center">
                {/* <button
                    onClick={() => markAsRead(notification._id)}
                    className="p-2 bg-gray-200 rounded hover:bg-gray-300 w-[2.5rem] h-[2.5rem] mx-1"
                >
                    <EyeOutlined className="text-gray-600 " />
                </button>
                <button
                    className="p-2 bg-red-100 rounded hover:bg-red-200 w-[2.5rem] h-[2.5rem] mx-1"
                    // onClick={() => deleteNotification(notification.id)}
                >
                    <DeleteOutlined className="text-red-600" />
                </button> */}
                {(() => {
                    switch (notification._id) {
                        case index:
                            switch (isLoadingReplyNotification) {
                                case true:
                                    return <Spinner size="md" />
                                default:
                                    switch (notification.metadata.status) {
                                        case WAITING_STATUS:
                                            return (
                                                <Actions
                                                    notification={notification}
                                                    handleReplyNotification={handleReplyNotification}
                                                    index={index}
                                                />
                                            )
                                        case CONFIRM_STATUS:
                                            return null
                                        default:
                                            return null
                                    }
                            }
                        default:
                            switch (notification.metadata.status) {
                                case WAITING_STATUS:
                                    return (
                                        <Actions
                                            notification={notification}
                                            handleReplyNotification={handleReplyNotification}
                                            index={index}
                                        />
                                    )
                                case CONFIRM_STATUS:
                                    return null
                                default:
                                    return null
                            }
                    }
                })()}
            </Table.Cell>
        </Table.Row>
    ))
    const readRows = read.map((notification, index) => (
        <Table.Row key={notification._id} data-selected={selection.includes(notification._id) ? '' : undefined}>
            <Table.Cell className="py-4 pl-8 ">
                {(() => {
                    switch (notification.type?.name) {
                        case PROJECT_INVITATION_NOTIFICATION:
                            return <ProjectInvitationNotification notification={notification} />
                        case FRIEND_REQUEST_NOTIFICATION:
                            return <FriendRequestNotification notification={notification} />
                        case CONFIRM_FRIEND_REQUEST_NOTIFICATION:
                            return <ConfirmFriendRequestNotification notification={notification} />
                        case PROJECT_APPLICATION_NOTIFICATION:
                            return <ProjectApplicationNotification notification={notification} />
                        case CONFIRM_PROJECT_INVITATION_NOTIFICATION:
                            return <ConfirmProjectInvitationNoitification notification={notification} />
                        default:
                            return (
                                <div className="text-[#6f7f92] text-sm font-medium">
                                    {notification.message || 'New notification'}
                                </div>
                            )
                    }
                })()}
            </Table.Cell>
            <Table.Cell>{moment(notification.timestamp).fromNow()}</Table.Cell>
            <Table.Cell textAlign="center">
                {(() => {
                    switch (notification._id) {
                        case index:
                            switch (isLoadingReplyNotification) {
                                case true:
                                    return <Spinner size="md" />
                                default:
                                    switch (notification.metadata.status) {
                                        case WAITING_STATUS:
                                            return (
                                                <Actions
                                                    notification={notification}
                                                    handleReplyNotification={handleReplyNotification}
                                                    index={index}
                                                />
                                            )
                                        case CONFIRM_STATUS:
                                            return null
                                        default:
                                            return null
                                    }
                            }
                        default:
                            switch (notification.metadata.status) {
                                case WAITING_STATUS:
                                    return (
                                        <Actions
                                            notification={notification}
                                            handleReplyNotification={handleReplyNotification}
                                            index={index}
                                        />
                                    )
                                case CONFIRM_STATUS:
                                    return null
                                default:
                                    return null
                            }
                    }
                })()}
            </Table.Cell>
        </Table.Row>
    ))

    // ========== RENDER ========== //
    return (
        <>
            <div className="flex w-full gap-8 mt-[1rem] px-[16px] flex-1">
                <Tabs.Root className="flex flex-col w-10/12" defaultValue="all">
                    <Tabs.List>
                        <div className="flex justify-between w-full p-4 font-bold bg-white">
                            <div className="flex">
                                <Tabs.Trigger className="text-black" value="all">
                                    All
                                </Tabs.Trigger>
                                <Tabs.Trigger className="text-black" value="unread">
                                    Unread
                                </Tabs.Trigger>
                                <Tabs.Trigger className="text-black" value="read">
                                    Read
                                </Tabs.Trigger>
                            </div>

                            {/* <div className="flex items-center space-x-2 2xl:ml-[31.5rem] ">
                                <span className="text-black ">Order By:</span>
                                <select
                                    className="text-sm font-medium text-gray-600 bg-transparent outline-none border border-[#F3F3F3] w-[10rem] h-[2rem] rounded-sm"
                                    defaultValue="Newest First"
                                >
                                    <option value="Newest First">Newest First</option>
                                    <option value="Oldest First">Oldest First</option>
                                </select>
                            </div> */}
                        </div>
                    </Tabs.List>
                    <div className="my-[2.5rem] bg-white flex-1">
                        <Tabs.Content value="all" className="flex flex-col w-full h-full p-0">
                            <Table.Root size="sm" striped>
                                <Table.Header>
                                    <Table.Row bg="#2F65B9">
                                        {/* <Table.ColumnHeader color="white" w="1/12">
                                            <Checkbox.Root
                                                size="sm"
                                                top="0.5"
                                                aria-label="Select all rows"
                                                checked={indeterminate ? 'indeterminate' : selection.length > 0}
                                                onCheckedChange={(changes) => {
                                                    setSelection(changes.checked ? unread.map((item) => item.name) : [])
                                                }}
                                            >
                                                <Checkbox.HiddenInput />
                                                <Checkbox.Control />
                                            </Checkbox.Root>
                                        </Table.ColumnHeader> */}
                                        <Table.ColumnHeader color="white" w="6/12" className="py-3 pl-8">
                                            Notification
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader color="white" w="4/12">
                                            Timestamp
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader color="white" w="2/12" textAlign="center">
                                            Actions
                                        </Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>{allRows}</Table.Body>
                            </Table.Root>
                            {/* <ActionBar.Root open={hasSelection}>
                                <Portal>
                                    <ActionBar.Positioner>
                                        <ActionBar.Content>
                                            <ActionBar.SelectionTrigger>
                                                {selection.length} selected
                                            </ActionBar.SelectionTrigger>
                                            <ActionBar.Separator />
                                            <Button variant="outline" size="sm">
                                                Delete <Kbd>⌫</Kbd>
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                Share <Kbd>T</Kbd>
                                            </Button>
                                        </ActionBar.Content>
                                    </ActionBar.Positioner>
                                </Portal>
                            </ActionBar.Root> */}
                        </Tabs.Content>
                        <Tabs.Content value="unread" className="flex flex-col w-full h-full p-0">
                            <Table.Root size="sm" striped>
                                <Table.Header>
                                    <Table.Row bg="#2F65B9">
                                        <Table.ColumnHeader color="white" w="6/12" className="py-3 pl-8">
                                            Notification
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader color="white" w="4/12">
                                            Timestamp
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader color="white" w="2/12" textAlign="center">
                                            Actions
                                        </Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>{unreadRows}</Table.Body>
                            </Table.Root>
                            <ActionBar.Root open={hasSelection}>
                                <Portal>
                                    <ActionBar.Positioner>
                                        <ActionBar.Content>
                                            <ActionBar.SelectionTrigger>
                                                {selection.length} selected
                                            </ActionBar.SelectionTrigger>
                                            <ActionBar.Separator />
                                            <Button variant="outline" size="sm">
                                                Delete <Kbd>⌫</Kbd>
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                Share <Kbd>T</Kbd>
                                            </Button>
                                        </ActionBar.Content>
                                    </ActionBar.Positioner>
                                </Portal>
                            </ActionBar.Root>
                        </Tabs.Content>
                        <Tabs.Content value="read" className="flex flex-col w-full h-full p-0">
                            <Table.Root size="sm" striped>
                                <Table.Header>
                                    <Table.Row bg="#2F65B9">
                                        <Table.ColumnHeader color="white" w="6/12" className="py-3 pl-8">
                                            Notification
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader color="white" w="4/12">
                                            Timestamp
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader color="white" w="2/12" textAlign="center">
                                            Actions
                                        </Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>{readRows}</Table.Body>
                            </Table.Root>
                            <ActionBar.Root open={hasSelection}>
                                <Portal>
                                    <ActionBar.Positioner>
                                        <ActionBar.Content>
                                            <ActionBar.SelectionTrigger>
                                                {selection.length} selected
                                            </ActionBar.SelectionTrigger>
                                            <ActionBar.Separator />
                                            <Button variant="outline" size="sm">
                                                Delete <Kbd>⌫</Kbd>
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                Share <Kbd>T</Kbd>
                                            </Button>
                                        </ActionBar.Content>
                                    </ActionBar.Positioner>
                                </Portal>
                            </ActionBar.Root>
                        </Tabs.Content>
                    </div>
                </Tabs.Root>
                <RightSidebar />
            </div>
        </>
    )
}

export default NotificationProject
