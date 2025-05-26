interface Friend {
   user: {
      _id: string
      name: string
      email: string
      avatar: string
   }
   created_at: string
}

interface Notification {
   _id: string
   type?: {
      name: string
   }
   metadata?: {
      status: string
   }
   user: {
      name: string
      avatar: string
      _id: string
   }
   timestamp: string
}

type OrderByType = 'Newest' | 'Oldest' | 'Active'


export type { Friend, Notification, OrderByType }