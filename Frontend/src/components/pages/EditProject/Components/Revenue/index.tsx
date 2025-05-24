import React from 'react'
import { Button, createListCollection } from '@chakra-ui/react'
import { GoPlus } from 'react-icons/go'
import ActionBar from '../../../EditProfile/components/ActionBar'
import ProjectEditMenu from '../ProjectEditMenu'
import ProjectCard from '../ProjectCard'
import InputCustom from 'components/UI/InputCustom'
import SelectCustom from 'components/UI/SelectCustom'
import { IconlyDelete } from 'components/UI/Iconly'
import { CURRENCY } from 'utils/constants'
import { useEditRevenue } from './useEditRevenue'

const currencyFramework = createListCollection({
   items: CURRENCY['EN'],
})

const EditRevenue: React.FC = () => {
   const {
      // Data
      formData,
      isLoadingUpdateMyProject,

      // Functions
      handleChange,
      handleAddRevenue,
      handleRemoveForm,
      handleSaveChanges,
   } = useEditRevenue()

   return (
      <div className="flex gap-8 w-full py-8 px-[16px]">
         <ProjectEditMenu />
         <div className="w-8/12">
            <div className="bg-[#ffffff] p-8 rounded-md">
               <ProjectCard />
               <ActionBar />
            </div>
            <div className="bg-[#ffffff] p-8 rounded-md mt-8">
               <div className="flex justify-end">
                  <div
                     className="flex items-center gap-1 cursor-pointer bg-[#2f65b9] rounded-md text-[#ffffff] px-[20px] py-2 mb-[14px]"
                     onClick={handleAddRevenue}
                  >
                     <GoPlus className="text-[#ffffff]" />
                     <button className="text-xs bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold">
                        ADD REVENUE
                     </button>
                  </div>
               </div>

               {formData?.map((item, index) => (
                  <div key={index} className="relative flex flex-col gap-6 mb-12 rounded-md">
                     <div className="flex flex-col gap-12">
                        <InputCustom
                           type="month"
                           onChange={(e: any) => handleChange(e, index)}
                           value={item.date}
                           name="date"
                           required
                           label="Date"
                           placeholder="Ex: 2025-01"
                        />
                        <InputCustom
                           type="number"
                           onChange={(e: any) => handleChange(e, index)}
                           value={item.amount}
                           name="amount"
                           required
                           label="Amount"
                           placeholder="Ex: 1000"
                           min="0"
                           step="0.01"
                        />
                        <SelectCustom
                           onChange={(e: any) => handleChange(e, index, 'currency')}
                           value={item.currency}
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

export default EditRevenue
