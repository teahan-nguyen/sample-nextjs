import { useState } from 'react'

import Button from '@/components/build/Button'
import ModalLogin from '../ModalLogin'
import { ButtonLoginProps } from './types'

const ButtonLogin = ({}: ButtonLoginProps) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <ModalLogin
        open={open}
        setOpen={setOpen}
      ></ModalLogin>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Login
      </Button>
    </>
  )
}

export default ButtonLogin
