import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ChangePassword from './components/ChangePassword/ChangePassword'
import TwoFactors from './components/TwoFactors/TwoFactors'
import SecurtyIntro from './components/SecurtyIntro/SecurtyIntro'

const useStyles = makeStyles({
  header: { textAlign: 'center' },

  title: {
    marginTop: 0,
    marginBottom: '8px',
    fontSize: '28px',
    fontWeight: 500,
    lineHeight: 1.3,
    color: '#202124',
  },

  subTitle: {
    marginBottom: '36px',
    fontSize: '16px',
    color: '#5f6368',
  },
})

const Security: FC = () => {
  const classes = useStyles()

  return (
    <>
      <header className={classes.header}>
        <h1 className={classes.title}>Security</h1>
        <p className={classes.subTitle}>
          Settings and recommendations to help you keep your account secure
        </p>
      </header>
      <SecurtyIntro />
      <ChangePassword />
      <TwoFactors isTOTP={true} />
    </>
  )
}

export default Security
