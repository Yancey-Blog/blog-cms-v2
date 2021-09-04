import { FC, useState } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from '@material-ui/core'
import {
  ArrowForwardIos,
  SentimentVerySatisfied,
  SentimentDissatisfied,
} from '@material-ui/icons'
import { OSS_CMS_PATH } from 'src/shared/constants'
import client from 'src/graphql/apolloClient'
import SnackbarUtils from 'src/components/Toast/Toast'
import SettingItemWrapper from 'src/containers/Settings/components/SettingItemWrapper/SettingItemWrapper'
import TurnOnTOTP from './components/TurnOnTOTP/TurnOnTOTP'
import RecoveryCodes from './components/RecoveryCodes/RecoveryCodes'
import BindPhoneNumber from './components/BindPhoneNumber/BindPhoneNumber'
import TurnOffTwoFactors from './components/TurnOffTwoFactors/TurnOffTwoFactors'
import styles from './twoFactors.module.scss'

const TwoFactors: FC = () => {
  const [openTOTP, setOpenTOTP] = useState(false)
  const [openRecoveryCodes, setOpenRecoveryCodes] = useState(false)
  const [openBindPhoneNumber, setOpenBindPhoneNumber] = useState(false)

  const { enableTOTP, phoneNumber } =
    // @ts-ignore
    client.cache.data.data[`UserModel:${window.localStorage.getItem('userId')}`]

  const openRecoveryCodesDialog = () => {
    if (!enableTOTP) {
      SnackbarUtils.error('Please turn on Authenticator app options first!')
      return
    }
    setOpenRecoveryCodes(true)
  }

  return (
    <>
      <SettingItemWrapper
        title="Two-factor Authentication"
        imageUrl={`${OSS_CMS_PATH}/recovery_scene.png`}
      >
        <List
          component="nav"
          aria-label="two-factor-nav"
          className={styles.listGroup}
        >
          <ListItem button onClick={() => setOpenTOTP(true)}>
            <ListItemText
              primary="Authenticator app"
              className={styles.title}
            />
            <ListItemText
              className={styles.title}
              primary={
                <div className={styles.isUseTOTP}>
                  {enableTOTP ? (
                    <SentimentVerySatisfied />
                  ) : (
                    <SentimentDissatisfied />
                  )}

                  <span className={styles.phone}>
                    {enableTOTP ? 'Enable' : 'Disable'}
                  </span>
                </div>
              }
            />
            <ListItemAvatar>
              <ArrowForwardIos className={styles.arrowIcon} />
            </ListItemAvatar>
          </ListItem>

          <Divider />

          <ListItem button onClick={() => setOpenBindPhoneNumber(true)}>
            <ListItemText primary="SMS number" className={styles.title} />
            <ListItemText
              primary={
                <div className={styles.isUseTOTP}>
                  {phoneNumber ? null : <SentimentDissatisfied />}
                  <p className={styles.phone}>
                    {phoneNumber ? phoneNumber : 'Disable'}
                  </p>
                </div>
              }
              className={styles.title}
            />
            <ListItemAvatar>
              <ArrowForwardIos className={styles.arrowIcon} />
            </ListItemAvatar>
          </ListItem>

          <Divider />

          <ListItem button onClick={openRecoveryCodesDialog}>
            <ListItemText primary="Recovery codes" className={styles.title} />
            <ListItemText
              primary={<p className={styles.phone}>Click to generate</p>}
              className={styles.title}
            />
            <ListItemAvatar>
              <ArrowForwardIos className={styles.arrowIcon} />
            </ListItemAvatar>
          </ListItem>
        </List>
      </SettingItemWrapper>

      <TurnOnTOTP setOpen={setOpenTOTP} open={!enableTOTP && openTOTP} />
      <RecoveryCodes setOpen={setOpenRecoveryCodes} open={openRecoveryCodes} />
      <BindPhoneNumber
        isPhoneNumber={!!phoneNumber}
        setOpen={setOpenBindPhoneNumber}
        open={openBindPhoneNumber}
      />
      <TurnOffTwoFactors setOpen={setOpenTOTP} open={enableTOTP && openTOTP} />
    </>
  )
}

export default TwoFactors
