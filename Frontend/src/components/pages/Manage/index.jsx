import React, { useEffect, useState } from 'react'
import { IconlyActivity, IconlyChart, IconlyUser, IconlyWallet } from 'components/UI/Iconly'
import { useSelector } from 'react-redux'
import { getTotalUsers } from 'api/manage'
import store from 'store/configureStore'
import { useNavigate } from 'react-router-dom'

function Manage() {
   const navigate = useNavigate()
   const [totalUsersView, setTotalUsers] = useState(0)
   const totalUsers = useSelector((state) => state.manage.totalUsers)

   useEffect(() => {
      store.dispatch(getTotalUsers())
   }, [])

   useEffect(() => {
      if (totalUsers !== 0) {
         setTotalUsers(totalUsers)
      }
   }, [totalUsers])

   const stats = [
      {
         label: 'Total Users',
         value: totalUsersView,
         subtitle: 'last week',
         icon: <IconlyUser color={'#3b82f6'} size={48} />,
      },
      {
         label: 'Total Users',
         value: '44,278',
         subtitle: 'last year',
         icon: <IconlyActivity color={'#10b981'} size={48} />,
      },
      {
         label: 'Total Users',
         value: '44,278',
         subtitle: 'last 9 days',
         icon: <IconlyChart color={'#f59e0b'} size={48} />,
      },
      {
         label: 'Total Money',
         value: '$44,278',
         subtitle: 'last 6 days',
         icon: <IconlyWallet color={'#8b5cf6'} size={48} />,
      },
   ]

   const manageItems = [
      { label: 'User Manage', route: 'users' },
      { label: 'Role Manage', route: 'roles' },
      { label: 'Type Manage', route: 'types' },
      { label: 'Industry Manage', route: 'industries' },
      { label: 'Experience Level Manage', route: 'experience-levels' },
      { label: 'Category Manage', route: 'categories' },
      { label: 'Skill Manage', route: 'skills' },
      { label: 'Organization Manage', route: 'organizations' },
      { label: 'Article Manage', route: 'articles' },
   ]

   return (
      <div className="p-6 flex flex-col gap-10 w-full ">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
               <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center hover:shadow-lg transition-all"
               >
                  <div className="flex flex-col gap-1">
                     <span className="text-sm text-gray-500">{stat.label}</span>
                     <span className="text-2xl font-semibold">{stat.value}</span>
                     <span className="text-xs text-gray-400">{stat.subtitle}</span>
                  </div>
                  <div>{stat.icon}</div>
               </div>
            ))}
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {manageItems.map((item, index) => (
               <div
                  key={index}
                  onClick={() => navigate(item.route)}
                  className="bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition-all border border-gray-200 p-4 rounded-lg cursor-pointer shadow-sm"
               >
                  <span className="font-medium text-gray-800">{item.label}</span>
               </div>
            ))}
         </div>
      </div>
   )
}

export default Manage
