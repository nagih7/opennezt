import React from 'react'
import { Button, createListCollection } from '@chakra-ui/react'
import ActionBar from '../../../EditProfile/components/ActionBar'
import ProjectEditMenu from '../ProjectEditMenu'
import { GoPlus } from 'react-icons/go'
import ProjectCard from '../ProjectCard'
import { IconlyDelete } from 'components/UI/Iconly'
import SelectCustom from 'components/UI/SelectCustom'
import InputCustom from 'components/UI/InputCustom'
import { CURRENCY, FUNDING_SOURCES } from '~/config/constants'
import { useEditFundingSources } from './useEditFundingSources'

const currencyFramework = createListCollection({
   items: CURRENCY['EN'],
})
const fundingSourceFramework = createListCollection({
   items: FUNDING_SOURCES['EN'],
})

const EditFundingSources: React.FC = () => {
   // Use custom hook for all logic
   const {
      formData,
      isLoadingUpdateMyProject,
      handleChange,
      handleAddFundingSource,
      handleRemoveForm,
      handleSaveChanges,
   } = useEditFundingSources()
   // ========== COMPONENT RENDER ========== //
   return (
      <div className="flex gap-8 w-full py-8 px-[16px]">
         <ProjectEditMenu />
         <div className="w-8/12">
            <div className="bg-[#ffffff] p-8 rounded-md">
               <ProjectCard />
               <ActionBar />
            </div>
            <div className="bg-[#ffffff] p-8 rounded-md mt-8">
               <div className="flex justify-end ">
                  <div
                     className="flex items-center gap-1 cursor-pointer bg-[#2f65b9] rounded-md text-[#ffffff] px-[20px] py-2 mb-[14px]"
                     onClick={handleAddFundingSource}
                  >
                     <GoPlus className="text-[#ffffff]" />
                     <button height={50} className="text-xs bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold">
                        ADD FUNDING SOURCE
                     </button>
                  </div>
               </div>
               {formData?.map((_, index) => (
                  <div key={index} className="relative flex flex-col gap-6 mb-12 rounded-md ">
                     <div className="flex flex-col gap-12">
                        <SelectCustom
                           onChange={(e: any) => handleChange(e, index, 'name')}
                           value={formData[index].name}
                           name="name"
                           required
                           label="Name"
                           placeholder="Ex: Angel"
                           collection={fundingSourceFramework}
                        />
                        <InputCustom
                           onChange={(e: any) => handleChange(e, index)}
                           value={formData[index].amount}
                           name="amount"
                           required
                           label="Amount"
                           placeholder="Ex: 10000"
                        />
                        <SelectCustom
                           onChange={(e: any) => handleChange(e, index, 'currency')}
                           value={formData[index].currency}
                           name="currency"
                           required
                           label="Currency"
                           placeholder="Select Currency"
                           collection={currencyFramework}
                        />
                     </div>
                     {formData.length > 1 && (
                        <div className="flex justify-end">
                           <span onClick={() => handleRemoveForm(index)} className="cursor-pointer">
                              <IconlyDelete size={24} color={'#000'} />
                           </span>
                        </div>
                     )}
                  </div>
               ))}
               <div className="px-[16px] flex justify-end">
                  <Button
                     onClick={handleSaveChanges}
                     height={50}
                     className="mt-[14px] px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                     borderRadius={4}
                     loading={isLoadingUpdateMyProject}
                     loadingText="Loading..."
                     spinnerPlacement="start"
                  >
                     SAVE CHANGES
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default EditFundingSources
