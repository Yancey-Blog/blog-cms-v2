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
import { AZURE_BLOB_PATH } from 'src/shared/constants'
import client from 'src/graphql/apolloClient'
import SnackbarUtils from 'src/components/Toast/Toast'
import SettingItemWrapper from 'src/containers/Settings/components/SettingItemWrapper/SettingItemWrapper'
import TOTP from '../TOTP/TOTP'
import RecoveryCodes from '../RecoveryCodes/RecoveryCodes'
import styles from './twoFactors.module.scss'

const TwoFactors: FC = () => {
  const [openTOTP, setOpenTOTP] = useState(false)
  const [openRecoveryCodes, setOpenRecoveryCodes] = useState(false)

  const { isTOTP } =
    // @ts-ignore
    client.cache.data.data[`UserModel:${window.localStorage.getItem('userId')}`]

  const openRecoveryCodesDialog = () => {
    if (!isTOTP) {
      SnackbarUtils.error('Please turn on Authenticator app options first!')
      return
    }
    setOpenRecoveryCodes(true)
  }

  return (
    <>
      <SettingItemWrapper
        title="Two-factor Authentication"
        imageUrl={`${AZURE_BLOB_PATH}/recovery_scene.png`}
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
                  {isTOTP ? (
                    <SentimentVerySatisfied />
                  ) : (
                    <SentimentDissatisfied />
                  )}

                  <span className={styles.phone}>
                    {isTOTP ? 'Enable' : 'Disable'}
                  </span>
                </div>
              }
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

      <TOTP setOpen={setOpenTOTP} open={openTOTP} />
      <RecoveryCodes setOpen={setOpenRecoveryCodes} open={openRecoveryCodes} />
    </>
  )
}

export default TwoFactors
