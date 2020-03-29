import React, { FC } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemProps,
  Divider,
} from '@material-ui/core'
import { ArrowForwardIos } from '@material-ui/icons'
import SettingItemWrapper from '../../../components/SettingItemWrapper/SettingItemWrapper'
import TOTP from '../TOTP/TOTP'
import styles from './twoFactors.module.scss'

const TwoFactor: FC = () => {
  return (
    <SettingItemWrapper
      title="Two-factor Authentication"
      imageUrl="https://www.gstatic.com/identity/boq/accountsettingsmobile/recovery_scene_1264x448_b9db53ca75b4e63d28b6944fcaa24ce7.png"
    >
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemText primary="Trash" />
          <ListItemText primary="Trash" />
          <ListItemText
            primary={<ArrowForwardIos className={styles.arrowIcon} />}
          />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Trash" />
          <ListItemText primary="Trash" />
          <ListItemText
            primary={<ArrowForwardIos className={styles.arrowIcon} />}
          />
        </ListItem>
      </List>
    </SettingItemWrapper>
  )
}

export default TwoFactor
