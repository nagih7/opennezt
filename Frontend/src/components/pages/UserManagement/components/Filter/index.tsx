import React from 'react'
import styles from './styles.module.scss'
import SelectCustom from '../../../../../components/UI/Select/index'
import { STATUS_USER } from '../../../../../utils/constants/app'

interface FilterProps {
   onClose?: () => void
   onChangeStatus?: (value: string) => void
   statusUser?: string
}

const Filter: React.FC<FilterProps> = ({ onChangeStatus = () => {}, statusUser = '' }) => {
   return (
      <div>
         <div className={styles.filterWrap}>
            <div className="flex flex-wrap -mx-2">
               <div className="w-full px-2">
                  <div className={styles.inputWrap}>
                     <div className={styles.label}>Filter by user status</div>
                     <SelectCustom
                        value={statusUser}
                        onChange={onChangeStatus}
                        options={[
                           {
                              value: '',
                              label: 'All',
                           },
                           {
                              value: STATUS_USER.ACTIVATE.toString(),
                              label: 'Active',
                           },
                           {
                              value: STATUS_USER.INACTIVATE.toString(),
                              label: 'Inactive',
                           },
                        ]}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Filter
