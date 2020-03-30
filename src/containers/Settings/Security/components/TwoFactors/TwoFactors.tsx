import React, { FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
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
import SettingItemWrapper from '../../../components/SettingItemWrapper/SettingItemWrapper'
import TOTP from '../TOTP/TOTP'
import styles from './twoFactors.module.scss'
import { stringfySearch } from 'src/shared/utils'

interface Props {
  isTOTP: boolean
}

const TwoFactors: FC<Props> = ({ isTOTP }) => {
  const history = useHistory()
  const { pathname } = useLocation()

  const showModal = () =>
    history.push({ pathname, search: stringfySearch({ showModal: true }) })

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
          <ListItem button onClick={showModal}>
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

                  <span className={styles.txt}>
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

          <ListItem button>
            <ListItemText primary="SMS number" className={styles.title} />
            <ListItemText
              primary={<p className={styles.phone}>150 4338 9539</p>}
              className={styles.title}
            />
            <ListItemAvatar>
              <ArrowForwardIos className={styles.arrowIcon} />
            </ListItemAvatar>
          </ListItem>

          <Divider />

          <ListItem button>
            <ListItemText primary="Recovery codes" className={styles.title} />
            <ListItemText
              primary={<p className={styles.phone}>Printed yesterday</p>}
              className={styles.title}
            />
            <ListItemAvatar>
              <ArrowForwardIos className={styles.arrowIcon} />
            </ListItemAvatar>
          </ListItem>
        </List>
      </SettingItemWrapper>

      <TOTP />
    </>
  )
}

export default TwoFactors
