import { Button, Popover, Portal, Stack, StackSeparator } from '@chakra-ui/react'
import { SearchOutlined } from '@mui/icons-material'
import { seekProjects } from 'api/project'
import { getIndustryFramework, getStageFramework } from 'api/user'
import { IconlyFilter } from 'components/UI/Iconly'
import SelectCustom from 'components/UI/SelectCustom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterSeekProjects } from 'store/modules/project'

const FilterHeader = ({ action, setAction }) => {
   const dispatch = useDispatch()
   // ========== STATE FROM REDUX ========== //
   const { industryFramework, stageFramework } = useSelector((state) => state.user)
   const { isLoadingSeekProjects } = useSelector((state) => state.project)

   // ========== STATE ========== //
   const [dataFilter, setDataFilter] = useState({
      keySearch: '',
      industry: '',
      stage: '',
      page: 1,
      perPage: 6,
   })

   // ========== USE EFFECT ========== //
   useEffect(() => {
      dispatch(seekProjects(dataFilter))
      // eslint-disable-next-line
   }, [dispatch])

   useEffect(() => {
      if (industryFramework.items.length === 0) {
         dispatch(getIndustryFramework())
      }
   }, [dispatch, industryFramework.items])

   useEffect(() => {
      if (stageFramework.items.length === 0) {
         dispatch(getStageFramework())
      }
   }, [dispatch, stageFramework.items])

   // ========== HANDLE FUNCTION ========== //
   const onChangeFilter = (event, name) => {
      setDataFilter({
         ...dataFilter,
         [name]: event.value[0],
      })
   }

   const handleSaveFilter = () => {
      dispatch(seekProjects(dataFilter))
      dispatch(setFilterSeekProjects(dataFilter))
   }

   const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
         handleSaveFilter()
      }
   }

   // ========== RENDER ========== //
   return (
      <div className="flex flex-col items-center justify-between gap-4 p-4 ml-0 bg-white border rounded-lg shadow-sm md:flex-row">
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
