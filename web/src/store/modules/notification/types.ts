export interface NotificationState {
   // =========== Get Notification =========== //
   notifications: any[]
   isLoadingGetNotifications: boolean
   // =========== Reply Notification =========== //
   requestAddFriend: any
   paginationListNotification: {
      currentPage: number
      perPage: number
      totalPage: number
      totalRecord: number
   }
   totalFriends: number
   loadingGetNotifications: boolean
   loadingSendRequestAddFriend: boolean
   isLoadingReplyNotification: boolean
   loadingMarkAsRead: boolean
}
