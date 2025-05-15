import React from 'react'
import './styles.scss'
import { Select } from 'antd'
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
        <Select
            value={value}
            style={style}
            className={`select-custom className="p-[16px]  w-full outline-none border-gray-200 rounded-md "`}
            defaultValue={value}
            onChange={onChange}
            options={options}
        />
    )
}

export default SelectCustom
