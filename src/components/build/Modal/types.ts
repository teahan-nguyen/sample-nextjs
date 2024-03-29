export interface ModalProps {
  open: boolean
  headerText: string
  Content?: any
  onConfirm: any
  onClose: any
  closeWhenClickOutside?: boolean
  textCancelButton?: string
  textOkButton?: string
  customFooter?: JSX.Element
  typeButtonOk?: 'submit' | 'button'
  submitting?: boolean
  children?: any
  variant?: 'neutral' | 'info' | 'danger' | 'warning'
  classNameButtonWrapper?: string
  className?: string
}
