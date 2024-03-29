import { MouseEventHandler, ReactNode } from 'react'

export interface ButtonProps {
  size?: 'L' | 'M' | 'S'
  children?: ReactNode
  disabled?: boolean
  loading?: boolean
  htmlType?: 'button' | 'submit' | 'reset'
  type?:
    | 'Primary'
    | 'Secondary'
    | 'Tertiary'
    | 'Text'
    | 'Link'
    | 'PrimaryDanger'
    | 'SecondaryDanger'
    | 'TextDanger'
  icon?: ReactNode
  className?: string
  href?: string
  onClick?: MouseEventHandler<HTMLElement> | undefined
  block?: boolean | undefined
  width?: number
  isActive?: boolean
  id?: string
}
