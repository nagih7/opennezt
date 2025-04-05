import { Tabs } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { EyeInvisibleOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import RightSidebar from 'components/common/RightSidebar'
import { getNotifications, replyNotification, readRoot } from 'api/notification'
import moment from 'moment'

function NotificationProject() {
    const dispatch = useDispatch()
    const { language } = useSelector((state) => state.app)
    const { notifications } = useSelector((state) => state.notification)
    
    const [dataFilter, setDataFilter] = useState({
        page: 1,
        perPage: 10,
        order: 'desc', // Default to newest first
    })
    
    const [unreadNotifications, setUnreadNotifications] = useState([])
    const [readNotifications, setReadNotifications] = useState([])
    const [selected, setSelected] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    // Fetch notifications from API
    useEffect(() => {
        const fetchNotifications = async () => {
            setIsLoading(true)
            try {
                // Call the readRoot API with current filters
                await dispatch(readRoot(dataFilter))
                // Also fetch regular notifications
                await dispatch(getNotifications())
            } catch (error) {
                console.error('Error fetching notifications:', error)
            } finally {
                setIsLoading(false)
            }
        }
        
        fetchNotifications()
    }, [dispatch, dataFilter])
    
    // Process notifications from API response
    useEffect(() => {
        if (notifications) {
            // Filter notifications into read and unread
            const read = notifications.filter(notification => 
                notification.metadata && notification.metadata.read === true
            )
            
            const unread = notifications.filter(notification => 
                !notification.metadata || notification.metadata.read === false
            )
            
            setReadNotifications(read.map(notification => ({
                id: notification.id,
                name: notification.user?.name || 'Unknown User',
                message: notification.message || '',
                time: moment(notification.timestamp).fromNow(),
                raw: notification // Keep the raw notification for API calls
            })))
            
            setUnreadNotifications(unread.map(notification => ({
                id: notification.id,
                name: notification.user?.name || 'Unknown User',
                message: notification.message || '',
                time: moment(notification.timestamp).fromNow(),
                raw: notification // Keep the raw notification for API calls
            })))
        }
    }, [notifications])
    
    // Handle sort order change
    const handleSortChange = (e) => {
        const newOrder = e.target.value === 'Newest First' ? 'desc' : 'asc'
        setDataFilter({
            ...dataFilter,
            order: newOrder
        })
    }
    
    const toggleSelectAll = (e) => {
        const currentTab = document.querySelector('[data-state="active"]').getAttribute('value')
        const notificationsToSelect = currentTab === 'Unread' ? unreadNotifications : readNotifications
        
        if (e.target.checked) {
            setSelected(notificationsToSelect.map((notification) => notification.id))
        } else {
            setSelected([])
        }
    }
    
    // Mark as unread API call
    const markAsUnread = async (id) => {
        const notificationToMove = readNotifications.find((n) => n.id === id)
        
        if (notificationToMove) {
            try {
                // Call API to mark as unread
                await dispatch(replyNotification(id, 'mark_as_unread'))
                
                // Update local state
                setUnreadNotifications([...unreadNotifications, notificationToMove])
                setReadNotifications(readNotifications.filter((n) => n.id !== id))
            } catch (error) {
                console.error('Error marking notification as unread:', error)
            }
        }
    }
    
    // Mark as read API call
    const markAsRead = async (id) => {
        const notificationToMove = unreadNotifications.find((n) => n.id === id)
        
        if (notificationToMove) {
            try {
                // Call API to mark as read
                await dispatch(replyNotification(id, 'mark_as_read'))
                
                // Update local state
                setReadNotifications([...readNotifications, notificationToMove])
                setUnreadNotifications(unreadNotifications.filter((n) => n.id !== id))
            } catch (error) {
                console.error('Error marking notification as read:', error)
            }
        }
    }
    
    const toggleSelect = (id) => {
        setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    }
    
    // Delete notification API call
    const deleteNotification = async (id) => {
        try {
            // Call API to delete notification
            await dispatch(replyNotification(id, 'delete'))
            
            // Update local state
            setReadNotifications(readNotifications.filter((notification) => notification.id !== id))
            setUnreadNotifications(unreadNotifications.filter((notification) => notification.id !== id))
        } catch (error) {
            console.error('Error deleting notification:', error)
        }
    }
    
    // Apply bulk actions
    const applyBulkAction = async () => {
        const action = document.querySelector('select[value="Bulk Actions"]').value
        
        if (selected.length === 0 || action === 'Bulk Actions') return
        
        try {
            // Process each selected notification
            for (const id of selected) {
                if (action === 'Mark Unread') {
                    await dispatch(replyNotification(id, 'mark_as_unread'))
                } else if (action === 'Delete') {
                    await dispatch(replyNotification(id, 'delete'))
                }
            }
            
            // Refresh notifications after bulk action
            dispatch(readRoot(dataFilter))
            dispatch(getNotifications())
            
            // Clear selection
            setSelected([])
        } catch (error) {
            console.error('Error applying bulk action:', error)
        }
    }
    
    return (
        <>
            <div className="flex w-full gap-8 mt-[1rem] px-[16px]">
                <Tabs.Root className="w-10/12 h-4" defaultValue="Unread">
                    <div className="w-full 2xl:w-full">
                        <Tabs.List>
                            <div className="flex justify-between w-full p-4 font-bold bg-white">
                                <div className="flex">
                                    <Tabs.Trigger className="text-black" value="Unread">
                                        Unread
                                    </Tabs.Trigger>
                                    <Tabs.Trigger className="text-black" value="Read">
                                        Read
                                    </Tabs.Trigger>
                                </div>

                                <div className="flex items-center space-x-2 2xl:ml-[31.5rem] ">
                                    <span className="text-black ">Order By:</span>
                                    <select 
                                        className="text-sm font-medium text-gray-600 bg-transparent outline-none border border-[#F3F3F3] w-[10rem] h-[2rem] rounded-sm"
                                        onChange={handleSortChange}
                                        defaultValue="Newest First"
                                    >
                                        <option value="Newest First">Newest First</option>
                                        <option value="Oldest First">Oldest First</option>
                                    </select>
                                </div>
                            </div>
                        </Tabs.List>
                        <div className="mt-[2.5rem] bg-white ">
                            <Tabs.Content value="Unread">
                                <div className="p-4">
                                    {isLoading ? (
                                        <div className="flex justify-center p-4">
                                            <div className="loader">Loading...</div>
                                        </div>
                                    ) : unreadNotifications.length === 0 ? (
                                        <div className="bg-[#E3F1F6] p-3 border-l-2 border-[#0098CB] text-[#1599CC]">
                                            You have no unread notifications.
                                        </div>
                                    ) : (
                                        <div className="w-full max-w-4xl mx-auto overflow-hidden border rounded-lg">
                                            <table className="w-full border-collapse">
                                                <thead>
                                                    <tr className="bg-[#2F65B9] text-white">
                                                        <th className="p-3 text-left">
                                                            {' '}
                                                            <input
                                                                type="checkbox"
                                                                onChange={toggleSelectAll}
                                                                checked={
                                                                    selected.length === unreadNotifications.length && 
                                                                    unreadNotifications.length > 0
                                                                }
                                                            />
                                                        </th>
                                                        <th className="p-3 text-left">Notification</th>
                                                        <th className="p-3 text-left">Date Received</th>
                                                        <th className="p-3 text-center">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {unreadNotifications.map((notification) => (
                                                        <tr
                                                            key={notification.id}
                                                            className="border-b hover:bg-gray-100"
                                                        >
                                                            <td className="p-3">
                                                                {' '}
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selected.includes(notification.id)}
                                                                    onChange={() => toggleSelect(notification.id)}
                                                                />
                                                            </td>
                                                            <td className="p-3">
                                                                {notification.name} {notification.message}
                                                            </td>
                                                            <td className="p-3">{notification.time}</td>
                                                            <td className="flex justify-center gap-2 p-3">
                                                                <button
                                                                    onClick={() => markAsRead(notification.id)}
                                                                    className="p-2 bg-gray-200 rounded hover:bg-gray-300 h-[2.25rem] w-[2.25rem]"
                                                                >
                                                                    <EyeOutlined className="text-gray-600 " />
                                                                </button>
                                                                <button
                                                                    className="p-2 bg-red-100 rounded hover:bg-red-200 h-[2.25rem] w-[2.25rem]"
                                                                    onClick={() => deleteNotification(notification.id)}
                                                                >
                                                                    <DeleteOutlined className="text-red-600" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </Tabs.Content>

                            <Tabs.Content value="Read">
                                <>
                                    <div className="p-4">
                                        {isLoading ? (
                                            <div className="flex justify-center p-4">
                                                <div className="loader">Loading...</div>
                                            </div>
                                        ) : readNotifications.length === 0 ? (
                                            <div className="bg-[#E3F1F6] p-3 border-l-2 border-[#0098CB] text-[#1599CC]">
                                                You have no read notifications.
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-full max-w-4xl mx-auto overflow-hidden border rounded-lg">
                                                    <table className="w-full border-collapse">
                                                        <thead>
                                                            <tr className="bg-[#2F65B9] text-white">
                                                                <th className="p-3 text-left">
                                                                    {' '}
                                                                    <input
                                                                        type="checkbox"
                                                                        onChange={toggleSelectAll}
                                                                        checked={
                                                                            selected.length === readNotifications.length &&
                                                                            readNotifications.length > 0
                                                                        }
                                                                    />
                                                                </th>
                                                                <th className="p-3 text-left">Notification</th>
                                                                <th className="p-3 text-left">Date Received</th>
                                                                <th className="p-3 text-center">Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {readNotifications.map((notification) => (
                                                                <tr
                                                                    key={notification.id}
                                                                    className="border-b hover:bg-gray-100"
                                                                >
                                                                    <td className="p-3">
                                                                        {' '}
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={selected.includes(notification.id)}
                                                                            onChange={() =>
                                                                                toggleSelect(notification.id)
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td className="p-3">
                                                                        {notification.name} {notification.message}
                                                                    </td>
                                                                    <td className="p-3">{notification.time}</td>
                                                                    <td className="flex justify-center gap-2 p-3">
                                                                        <button
                                                                            onClick={() =>
                                                                                markAsUnread(notification.id)
                                                                            }
                                                                            className="p-2 bg-gray-200 rounded hover:bg-gray-300 h-[2.25rem] w-[2.25rem]"
                                                                        >
                                                                            <EyeInvisibleOutlined className="text-gray-600 " />
                                                                        </button>
                                                                        <button
                                                                            className="p-2 bg-red-100 rounded hover:bg-red-200 h-[2.25rem] w-[2.25rem]"
                                                                            onClick={() =>
                                                                                deleteNotification(notification.id)
                                                                            }
                                                                        >
                                                                            <DeleteOutlined className="text-red-600" />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="flex justify-between mt-3">
                                                    <select className="bg-[#F8F9FA] text-[#6F7F92] h-[3.25rem] border-[#F6F6F6] border-1 rounded-[0.4rem] ml-3">
                                                        <option value="Bulk Actions">Bulk Actions</option>
                                                        <option value="Mark Unread">Mark Unread</option>
                                                        <option value="Delete">Delete</option>
                                                    </select>
                                                    <button 
                                                        className="bg-[#2F65B9] text-white w-[6rem] h-[3rem] rounded-[0.4rem] mr-3"
                                                        onClick={applyBulkAction}
                                                    >
                                                        Apply
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </>
                            </Tabs.Content>
                        </div>
                    </div>
                </Tabs.Root>
                <RightSidebar />
            </div>
        </>
    )
}

export default NotificationProject;