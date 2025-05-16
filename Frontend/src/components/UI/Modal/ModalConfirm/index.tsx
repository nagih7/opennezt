import React from 'react'
import styles from './styles.module.scss'
import './styles.scss'
import { Modal } from 'antd'
import ButtonMASQ from '../../Button'

interface ModalConfirmProps {
   isModalOpen: boolean
   title: string
   description: string
   onClose?: () => void
   onConfirm?: () => void
   textBtnConfirm: string
   textBtnCancel: string
   loadingBtnConfirm: boolean
   type: 'DEFAULT' | 'CUSTOM' | string
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
   isModalOpen = false,
   title = 'Delete %record name%?',
   description = 'Are you sure you want to delete %record name%? Your action can not be undone.',
   onClose = () => {},
   onConfirm = () => {},
   textBtnConfirm = 'OK',
   textBtnCancel = 'Cancel',
   loadingBtnConfirm = false,
   type = 'DEFAULT',
}) => {
   return (
      <Modal open={isModalOpen} footer={false} className={`general-dialog-wrap`} closable={false}>
         <div className={styles.headerDialogWrap}>
            {type === 'DEFAULT' ? <span className={styles.title}>Confirmation</span> : ''}
            <div onClick={() => onClose()} className={`${styles.btnClose} cursor-pointer`}>
               <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M10.707 1.293a1 1 0 0 0-1.414 0L6 4.586 2.707 1.293a1 1 0 0 0-1.414 1.414L4.586 6 1.293 9.293a1 1 0 1 0 1.414 1.414L6 7.414l3.293 3.293a1 1 0 0 0 1.414-1.414L7.414 6l3.293-3.293a1 1 0 0 0 0-1.414Z"
                     fill="#212121"
                  />
               </svg>
            </div>
         </div>

         <div className={styles.mainDialog}>
            <span className={styles.titleMainDialog}>{title}</span>
            <div className={styles.descriptionMainDialog}>{description}</div>
         </div>

         <div className={styles.btnWrap}>
            {textBtnConfirm.length > 0 ? (
               <ButtonMASQ textBtn={textBtnConfirm} onClick={() => onConfirm()} loading={loadingBtnConfirm} />
            ) : (
               ''
            )}

            <ButtonMASQ
               textBtn={textBtnCancel}
               onClick={() => onClose()}
               style={{
                  background: '#6B7F8D',
               }}
            />
         </div>
      </Modal>
   )
}

export default ModalConfirm
