import React from 'react'
import ReactModal from 'react-modal'

import { ModalProps } from './types'
import { cn } from '@/lib/tailwind/utils'
import Button from '../Button'
import clsx from 'clsx'

const Modal = ({
  typeButtonOk = 'button',
  customFooter,
  open,
  headerText,
  Content,
  children,
  onConfirm,
  onClose,
  closeWhenClickOutside = false,
  textCancelButton = 'Cancel',
  textOkButton = 'Confirm',
  submitting = false,
  variant = 'neutral',
  classNameButtonWrapper,
  className,
}: ModalProps) => {
  return (
    <ReactModal
      ariaHideApp={false}
      shouldCloseOnOverlayClick={closeWhenClickOutside}
      isOpen={open}
      onRequestClose={() => {
        onClose()
      }}
      contentLabel="Example Modal"
      className={cn(
        `min-h-[100px] z-40 bg-white p-0 rounded-[8px]
        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
         w-full max-w-[350px] lg:max-w-[440px] max-h-screen overflow-y-visible
         focus-visible:outline-none `,
        className
      )}
      portalClassName=""
      overlayClassName="fixed inset-0 bg-black bg-opacity-40 z-40"
      bodyOpenClassName=""
      htmlOpenClassName=""
    >
      <>
        {headerText && (
          <div
            className={clsx(
              'h-10 px-4 py-3 text-[16px] leading-[100%] font-semibold tracking-tightest rounded-t-[8px] mb-4 bg-[#F8F8F8]'
            )}
          >
            {headerText}
            <button
              type="button"
              className="absolute right-2 top-2"
              onClick={onClose}
            >
              X
            </button>
          </div>
        )}
        <div className="mb-10 px-4 whitespace-pre-line">{!!Content ? Content : children}</div>

        {customFooter ? (
          customFooter
        ) : (
          <div
            className={cn(
              `px-4 flex gap-4 mb-4`,
              variant === 'danger' ? 'justify-center' : 'justify-end',
              classNameButtonWrapper
            )}
          >
            <Button
              width={120}
              type="Tertiary"
              children={textCancelButton}
              onClick={onClose}
              disabled={submitting}
            />

            <Button
              width={120}
              type={variant === 'danger' ? 'PrimaryDanger' : 'Primary'}
              children={textOkButton}
              loading={submitting}
              htmlType={typeButtonOk}
              onClick={onConfirm}
            />
          </div>
        )}
      </>
    </ReactModal>
  )
}

export default Modal
