type TabType = 'About' | 'Friends' | 'Groups' | 'Timeline' | 'Badges' | 'Messages' | 'Notifications' | 'Courses'

interface ProfileMenuProps {
   changeTab: TabType
   setChangeTab: (tab: TabType) => void
}

export type { TabType, ProfileMenuProps }