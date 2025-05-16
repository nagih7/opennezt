import React from 'react'
import { Tabs as ChakraTabs } from '@chakra-ui/react'
import RightSidebar from 'components/common/RightSidebar'

const BookmarkedArticle: React.FC = () => <div>Bookmarked Articles Component</div>
const BookmarkTalent: React.FC = () => <div>Bookmark Talent Component</div>
const BookmarkProject: React.FC = () => <div>Bookmark Project Component</div>

const Tabs: {
   Root: React.FC<{ defaultValue: string; className?: string; children: React.ReactNode }>
   List: React.FC<{ className?: string; children: React.ReactNode }>
   Trigger: React.FC<{ value: string; className?: string; children: React.ReactNode }>
   Content: React.FC<{ value: string; className?: string; children: React.ReactNode }>
} = {
   Root: (props) => <div {...props} />,
   List: (props) => <div {...props} />,
   Trigger: (props) => <button {...props} />,
   Content: (props) => <div {...props} />,
}

// Mock activities for RightSidebar
const mockActivities: any[] = []

const Badges: React.FC = () => {
   return (
      <>
         <div className="flex gap-3">
            <div className="w-10/12">
               <Tabs.Root defaultValue="Articles">
                  <div className="rounded-lg ">
                     <Tabs.List>
                        <div className="flex justify-between w-full p-4 font-bold bg-white">
                           <div className="flex">
                              <Tabs.Trigger className="text-lg font-semibold" value="Articles">
                                 Articles
                              </Tabs.Trigger>
                              <Tabs.Trigger value="Project" className="text-lg font-semibold">
                                 Project
                              </Tabs.Trigger>
                              <Tabs.Trigger value="Talent" className="text-lg font-semibold">
                                 Talent
                              </Tabs.Trigger>
                           </div>
                        </div>
                     </Tabs.List>

                     <Tabs.Content value="Articles">
                        <BookmarkedArticle />
                     </Tabs.Content>

                     <Tabs.Content value="Project" className="flex flex-wrap gap-6 mt-4">
                        <BookmarkProject />
                     </Tabs.Content>

                     <Tabs.Content value="Talent" className="flex flex-wrap gap-6 mt-4">
                        <BookmarkTalent />
                     </Tabs.Content>
                  </div>
               </Tabs.Root>
            </div>
            <RightSidebar activities={mockActivities} action={() => <div>viewed your badges</div>} />
         </div>
      </>
   )
}

export default Badges
