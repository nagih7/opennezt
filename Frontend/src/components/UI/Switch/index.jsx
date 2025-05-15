import React from 'react'
import { Switch } from 'antd'
import PropTypes from 'prop-types'
import './styles.scss'

SwitchMASQ.propTypes = {
    onChange: PropTypes.func,
    status: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    type: PropTypes.string,
}

SwitchMASQ.defaultProps = {
    status: false,
    disabled: false,
}

function SwitchMASQ(props) {
    return (
        <div className={`${props.type !== 'TABLE' ? 'switch-style-custom' : 'switch-table-style-custom'}`}>
            <Switch
                size={'small'}
                disabled={props.disabled}
                checked={props.status}
                onChange={(e) => props.onChange(e)}
            />
        </div>
    )
}

export default SwitchMASQ
