import React, { FC } from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import styles from './Drawers.module.scss'
import classNames from 'classnames'

interface DrawersProps {
  open: boolean
}

const Drawers: FC<DrawersProps> = ({ open }) => {
  return (
    <Drawer variant='permanent'>
      <div
        className={classNames(styles.drawer, { [styles.foldDrawer]: !open })}
      >
        <List className={styles.drawerList}>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon className={styles.drawerListIcon}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                className={classNames(styles.drawerTxt, {
                  [styles.hideDrawerTxt]: !open,
                })}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  )
}

export default Drawers
