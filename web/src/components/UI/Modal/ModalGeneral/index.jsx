import React from 'react'
import styles from './styles.module.scss'
import './styles.scss'
import { Dialog, DialogContent } from '../../../UI/dialog'
import PropTypes from 'prop-types'

ModalGeneral.prototype = {
   isModalOpen: PropTypes.bool.isRequired,
   configModal: PropTypes.object.isRequired,
   onClose: PropTypes.func,
   onConfirm: PropTypes.func,
}

ModalGeneral.defaultProps = {
   isModalOpen: false,
   textBtnConfirm: 'OK',
   configModal: {
      title: 'Title',
      type: 'CREATE',
   },
}

function ModalGeneral(props) {
   const { children, isModalOpen, configModal } = props

   return (
      <Dialog
         open={isModalOpen}
         onOpenChange={(open) => {
            if (!open) props.onClose()
         }}
      >
         <DialogContent className="rounded-md">
            <div className="flex pb-8 items-center justify-between">
               <span> </span>
               <span className="text-xl font-semibold">{configModal.title}</span>
               <div onClick={() => props.onClose()} className={`${styles.btnClose} cursor-pointer`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M10.707 1.293a1 1 0 0 0-1.414 0L6 4.586 2.707 1.293a1 1 0 0 0-1.414 1.414L4.586 6 1.293 9.293a1 1 0 1 0 1.414 1.414L6 7.414l3.293 3.293a1 1 0 0 0 1.414-1.414L7.414 6l3.293-3.293a1 1 0 0 0 0-1.414Z"
                        fill="#212121"
                     />
                  </svg>
               </div>
            </div>

            <div className={styles.mainDialog}>{children}</div>
         </DialogContent>
      </Dialog>
   )
}

export default ModalGeneral
