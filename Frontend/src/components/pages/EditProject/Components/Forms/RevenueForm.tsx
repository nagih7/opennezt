import React from 'react'
import { Button, createListCollection } from '@chakra-ui/react'
import { GoPlus } from 'react-icons/go'
import { IconlyDelete } from 'components/UI/Iconly'
import InputCustom from 'components/UI/InputCustom'
import SelectCustom from 'components/UI/SelectCustom'
import { CURRENCY } from 'utils/constants'
import { useEditRevenue } from '../Revenue/useEditRevenue'

const currencyFramework = createListCollection({
   items: CURRENCY['EN'],
})

const RevenueForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
   const { formData, isLoadingUpdateMyProject, handleChange, handleAddRevenue, handleRemoveForm, handleSaveChanges } =
      useEditRevenue()

   const handleSave = async () => {
      await handleSaveChanges()
      onClose()
   }

   return (
      <div className="w-[600px] max-w-[95vw] max-h-[80vh] overflow-y-auto p-6">
         <div className="pb-4 mb-4 border-b border-gray-200">
            <h4 className="text-lg font-semibold">Revenue Information</h4>
         </div>

         <div className="flex flex-col gap-6">
            {/* Add button */}
            <div className="flex justify-end">
               <div
                  className="flex items-center gap-1 cursor-pointer bg-[#2f65b9] rounded-md text-[#ffffff] px-[16px] py-2"
                  onClick={handleAddRevenue}
               >
                  <GoPlus className="text-[#ffffff]" size={16} />
                  <span className="text-xs font-semibold">ADD REVENUE</span>
               </div>
            </div>

            {/* Revenue items */}
            {formData?.map((item, index) => (
               <div key={index} className="relative flex flex-col gap-4 p-4 border border-gray-200 rounded-md">
                  <InputCustom
                     type="month"
                     onChange={(e: any) => handleChange(e, index)}
                     value={item.date}
                     name="date"
                     required
                     label="Month/Year"
                     placeholder="Select month and year"
                  />
                  <InputCustom
                     onChange={(e: any) => handleChange(e, index)}
                     value={item.amount}
                     name="amount"
                     required
                     label="Amount"
                     placeholder="Ex: 10000"
                     type="number"
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

                  {formData.length > 1 && (
                     <div className="flex justify-end">
                        <span onClick={() => handleRemoveForm(index)} className="cursor-pointer">
                           <IconlyDelete size={20} color={'#ef4444'} />
                        </span>
                     </div>
                  )}
               </div>
            ))}

            <div className="flex gap-2 pt-4 border-t border-gray-200">
               <Button
                  onClick={handleSave}
                  loading={isLoadingUpdateMyProject}
                  className="bg-[#2f65b9] text-white flex-1"
                  size="sm"
               >
                  Save Changes
               </Button>
               <Button onClick={onClose} variant="outline" className="flex-1" size="sm">
                  Cancel
               </Button>
            </div>
         </div>
      </div>
   )
}

export default RevenueForm
