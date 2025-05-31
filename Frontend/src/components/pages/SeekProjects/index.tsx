import { useState } from 'react'
import AccessLog from './components/AccessLog'
import FilterHeader from './components/FilterHeader'
import ListProjects from './components/ListProjects'

type ViewAction = 'grid' | 'list'

const SeekProjects = () => {
   // ========== STATE  ========== //
   const [action, setAction] = useState<ViewAction>('grid')

   return (
      <div className="p-[16px] flex gap-8 w-full">
         <div className="relative w-10/12 bg-gray-100">
            <FilterHeader action={action} setAction={setAction} />
            <ListProjects action={action} />
         </div>
         <AccessLog />
      </div>
   )
}

export default SeekProjects
