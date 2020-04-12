import React, { FC, useState } from 'react'
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
import client from 'src/shared/apolloClient'
import SettingItemWrapper from 'src/containers/Settings/components/SettingItemWrapper/SettingItemWrapper'
import TOTP from '../TOTP/TOTP'
import RecoveryCodes from '../RecoveryCodes/RecoveryCodes'
import BindPhoneNumber from '../BindPhoneNumber/BindPhoneNumber'
import styles from './twoFactors.module.scss'

const TwoFactors: FC = () => {
  const [openTOTP, setOpenTOTP] = useState(false)
  const [openRecoveryCodes, setOpenRecoveryCodes] = useState(false)
  const [openBindPhoneNumber, setOpenBindPhoneNumber] = useState(false)

  const {
    isTOTP,
    phoneNumber,
    // @ts-ignore
  } = client.cache.data.get(
    `UserModel:${window.localStorage.getItem('userId')}`,
  )

  return (
    <>
      <SettingItemWrapper
        title="Two-factor Authentication"
        imageUrl="https://www.gstatic.com/identity/boq/accountsettingsmobile/recovery_scene_1264x448_b9db53ca75b4e63d28b6944fcaa24ce7.png"
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

          <ListItem button onClick={() => setOpenRecoveryCodes(true)}>
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
      <BindPhoneNumber
        setOpen={setOpenBindPhoneNumber}
        open={openBindPhoneNumber}
      />
    </>
  )
}

export default TwoFactors
