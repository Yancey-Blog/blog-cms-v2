import { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { OSS_CMS_PATH } from 'src/shared/constants'
import SettingItemWrapper from '../../../components/SettingItemWrapper/SettingItemWrapper'

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
      imageUrl={`${OSS_CMS_PATH}/securitycheckup_scene.png`}
    >
      <p className={classes.tip}>
        The Security Checkup gives you personalized recommendations to secure
        your account.
      </p>
    </SettingItemWrapper>
  )
}

export default SecurtyIntro
