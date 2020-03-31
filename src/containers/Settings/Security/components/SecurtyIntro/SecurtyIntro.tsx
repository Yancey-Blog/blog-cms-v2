import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SettingItemWrapper from '../../../../../components/SettingItemWrapper/SettingItemWrapper'

const useStyles = makeStyles({
  tip: {
    position: 'absolute',
    top: '72px',
    width: '460px',
    fontSize: '14px',
    color: '#5f6368',
  },
})

const SecurtyIntro: FC = () => {
  const classes = useStyles()

  return (
    <SettingItemWrapper
      title="We keep your account protected"
      imageUrl="https://www.gstatic.com/identity/boq/accountsettingsmobile/securitycheckup_scene_green_1264x448_6d867072cd36d3c6f4c9f0b8d82837ff.png"
    >
      <p className={classes.tip}>
        The Security Checkup gives you personalized recommendations to secure
        your account.
      </p>
    </SettingItemWrapper>
  )
}

export default SecurtyIntro
