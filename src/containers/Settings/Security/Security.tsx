import React, { FC } from 'react'
import ChangePassword from './components/ChangePassword'
import TwoFactor from './components/TwoFactor'

const Security: FC = () => {
  return (
    <section>
      <ChangePassword />
      <TwoFactor />
    </section>
  )
}

export default Security
