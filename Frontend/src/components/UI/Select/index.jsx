import React from 'react'
import './styles.scss'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../../../ui/select'
import PropTypes from 'prop-types'

SelectCustom.propTypes = {
   onChange: PropTypes.func,
   value: PropTypes.string,
   options: PropTypes.array.isRequired,
   style: PropTypes.object,
}

SelectCustom.defaultProps = {
   options: [],
   value: '',
}

function SelectCustom(props) {
   let { style, onChange, value, options } = props

   return (
      <Select value={value} onValueChange={onChange}>
         <SelectTrigger style={style} className="select-custom p-[16px] w-full outline-none border-gray-200 rounded-md">
            <SelectValue placeholder="Select..." />
         </SelectTrigger>
         <SelectContent>
            {options.map((opt) => (
               <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}

export default SelectCustom
