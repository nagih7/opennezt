import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

ButtonMASQ.propTypes = {
   onClick: PropTypes.func.isRequired,
   textBtn: PropTypes.string.isRequired,
   style: PropTypes.object,
   disabled: PropTypes.bool,
   variant: PropTypes.string,
   size: PropTypes.string,
}

ButtonMASQ.defaultProps = {
   style: {},
   disabled: false,
   variant: 'default',
   size: 'default',
   onClick: () => {
      /* noop */
   },
}

function ButtonMASQ(props) {
   const [isHovered, setIsHovered] = useState(false)
   const colorMappings = {
      '#2F65B9': '#3B82F6',
      '#2F4858': '#374B63',
      '#6B7F8D': '#A1A7B3',
      '#D5DADD': '#E3EBEF',
      '#EBEDF3': '#F5F8FF',
      '#FFF': '#F8F8F8',
   }
   const defaultBackgroundColor = '#2F65B9'
   const initialBackground = props.style.background || props.style.backgroundColor || defaultBackgroundColor
   const style = {
      ...props.style,
      background: isHovered ? colorMappings[initialBackground] || initialBackground : initialBackground,
      backgroundColor: isHovered ? colorMappings[initialBackground] || initialBackground : initialBackground,
   }

   return (
      <div className={styles.btnWrap}>
         <Button
            disabled={props.disabled}
            variant={props.variant}
            size={props.size}
            className={styles.btn}
            style={style || ''}
            onClick={() => props.onClick()}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
         >
            {props.textBtn}
         </Button>
      </div>
   )
}

export default ButtonMASQ
