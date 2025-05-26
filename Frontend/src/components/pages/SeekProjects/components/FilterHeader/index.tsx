import { Button, Popover, Portal, Stack, StackSeparator } from '@chakra-ui/react'
import { SearchOutlined } from '@mui/icons-material'
import { seekProjects } from 'api/project'
import { getIndustryFramework, getStageFramework } from 'api/user'
import { IconlyFilter } from 'components/UI/Iconly'
import SelectCustom from 'components/UI/SelectCustom'
import { FC, useEffect, useState, KeyboardEvent, ChangeEvent } from 'react'
import { setFilterSeekProjects } from '~/store/modules/project'
import { useAppDispatch, useAppSelector } from '~/store/hooks'

interface FilterHeaderProps {
   action: 'grid' | 'list'
   setAction: (action: 'grid' | 'list') => void
}

interface SelectEvent {
   value: string[]
}

interface FilterState {
   keySearch: string
   industry: string
   stage: string
   page: number
   perPage: number
}

const FilterHeader: FC<FilterHeaderProps> = ({ action, setAction }) => {
   const dispatch = useAppDispatch()

   const { isLoadingSeekProjects, filterSeekProjects } = useAppSelector((state) => state.project)
   const { industryFramework, stageFramework } = useAppSelector((state) => state.user)

   const [dataFilter, setDataFilter] = useState<FilterState>({
      keySearch: filterSeekProjects?.keySearch || '',
      industry: filterSeekProjects?.industry || '',
      stage: filterSeekProjects?.stage || '',
      page: filterSeekProjects?.page || 1,
      perPage: filterSeekProjects?.perPage || 6,
   })

   // Load initial projects when component mounts
   useEffect(() => {
      dispatch(seekProjects(dataFilter))
   }, []) // Empty dependency array to only run once on mount

   // Load frameworks if needed
   useEffect(() => {
      if (!industryFramework?.items?.length) {
         dispatch(getIndustryFramework())
      }
      if (!stageFramework?.items?.length) {
         dispatch(getStageFramework())
      }
   }, [dispatch, industryFramework?.items?.length, stageFramework?.items?.length])

   const onChangeFilter = (event: SelectEvent, name: 'industry' | 'stage') => {
      const value = event.value[0] || ''
      setDataFilter((prev) => ({
         ...prev,
         [name]: value,
         page: 1, // Reset page when filter changes
      }))
   }

   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setDataFilter((prev) => ({
         ...prev,
         keySearch: value,
         page: 1, // Reset page when search changes
      }))
   }

   const handleSaveFilter = () => {
      if (!isLoadingSeekProjects) {
         dispatch(seekProjects(dataFilter))
         dispatch(setFilterSeekProjects(dataFilter))
      }
   }

   const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && !isLoadingSeekProjects) {
         handleSaveFilter()
      }
   }

   return (
      <div className="flex flex-col items-center justify-between gap-4 p-4 ml-0 bg-white rounded-lg shadow-sm md:flex-row">
         <div className="flex flex-1 text-lg text-gray-600">
            {/* <div className="flex">All Projects</div> */}
            <Popover.Root>
               <Popover.Trigger asChild>
                  <Button
                     size="sm"
                     variant="outline"
                     className="bg-[#2F65B9] px-4 py-2 text-white  rounded-sm border-[#2F65B9]"
                  >
                     Filter
                     <span>
                        <IconlyFilter size={24} color={'white'} />
                     </span>
                  </Button>
               </Popover.Trigger>
               <Portal>
                  <Popover.Positioner>
                     <Popover.Content className="bg-white">
                        <Popover.Body>
                           <Stack separator={<StackSeparator />} className="p-4">
                              <SelectCustom
                                 onChange={(e) => onChangeFilter(e, 'industry')}
                                 label="Industry"
                                 collection={industryFramework}
                                 height="40px"
                                 value={[dataFilter.industry]}
                              />
                              <SelectCustom
                                 onChange={(e) => onChangeFilter(e, 'stage')}
                                 label="Stage"
                                 collection={stageFramework}
                                 height="40px"
                                 value={[dataFilter.stage]}
                              />
                              <Button
                                 loading={isLoadingSeekProjects}
                                 onClick={handleSaveFilter}
                                 borderRadius={4}
                                 loadingText="Loading..."
                                 spinnerPlacement="start"
                                 className="bg-[#2F65B9] text-white"
                              >
                                 Apply
                              </Button>
                           </Stack>
                        </Popover.Body>
                     </Popover.Content>
                  </Popover.Positioner>
               </Portal>
            </Popover.Root>
         </div>

         <div className="flex gap-2 md:w-auto">
            <div className="flex items-center overflow-hidden border rounded-sm">
               <input
                  height={'100%'}
                  type="text"
                  placeholder="Search project..."
                  className="px-3 py-2 outline-none w-64 bg-white border-none  md:w-[13rem]"
                  onChange={(e) => setDataFilter({ ...dataFilter, keySearch: e.target.value })}
                  onKeyDown={(e) => handleKeyDown(e)}
               />
               <Button
                  loading={isLoadingSeekProjects}
                  onClick={handleSaveFilter}
                  className="bg-[#2F65B9] px-4 py-2 text-white"
               >
                  <SearchOutlined />
               </Button>
            </div>
            <button
               onClick={() => setAction('grid')}
               className={`px-2 py-2 rounded ${
                  action === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
               }`}
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-grid"
                  viewBox="0 0 16 16"
               >
                  {' '}
                  <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
               </svg>
            </button>
            <button
               onClick={() => setAction('list')}
               className={`px-2 py-2 rounded ${
                  action === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
               }`}
            >
               <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
               </svg>
            </button>
         </div>
      </div>
   )
}

export default FilterHeader
