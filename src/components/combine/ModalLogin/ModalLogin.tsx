import Button from '@/components/build/Button'
import Modal from '@/components/build/Modal'
import { APP_ROUTES } from '@/constants'
import { signIn } from 'next-auth/react'
import { ModalLoginProps } from './types'

const ModalLogin = ({ open, setOpen }: ModalLoginProps) => {
  return (
    <Modal
      headerText="Login"
      onClose={() => {
        setOpen(false)
      }}
      onConfirm={() => {}}
      open={open}
      customFooter={<></>}
    >
      <div className="w-full flex p-4 justify-center items-center gap-4">
        <Button
          onClick={() => {
            signIn('okta', { callbackUrl: APP_ROUTES.userProfile })
          }}
        >
          Login With Okta
        </Button>
        <Button
          onClick={() => {
            signIn('google', { callbackUrl: APP_ROUTES.userProfile })
          }}
        >
          Login With Google
        </Button>
      </div>
    </Modal>
  )
}

export default ModalLogin
