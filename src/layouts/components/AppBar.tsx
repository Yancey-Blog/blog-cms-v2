import React, { FC, useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import Input from '@material-ui/core/Input'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Fab from '@material-ui/core/Fab'
import Badge from '@material-ui/core/Badge'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountCircle from '@material-ui/icons/AccountCircle'
import styles from './Layouts.module.scss'
import classNames from 'classnames'

const Layout: FC = () => {
  const [open, setOpen] = useState(true)

  const handleDrawerChange = () => {
    setOpen(!open)
  }
  return (
    <div className={styles.layouts}>
      <CssBaseline />
      <Drawer variant='permanent'>
        <div
          className={classNames(styles.drawerContainer, {
            [styles.shiftDrawer]: !open,
          })}
        >
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                {open ? <ListItemText primary={text} /> : null}
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>

      <AppBar
        className={classNames(styles.appBar, {
          [styles.shiftAppBar]: !open,
        })}
      >
        <Toolbar className={styles.appBarContent}>
          <div className={styles.left}>
            <Fab size='small' aria-label='more' onClick={handleDrawerChange}>
              <MoreVertIcon />
            </Fab>
            <Typography variant='h6' noWrap className={styles.title}>
              CMS for Blog
            </Typography>
          </div>
          <div className={styles.right}>
            <Input
              placeholder='Search...'
              inputProps={{
                'aria-label': 'description',
              }}
            />
            {[1, 2, 3, 4].map(val => (
              <IconButton
                aria-label='show 4 new mails'
                color='inherit'
                key={val}
              >
                <Badge badgeContent={val} color='secondary'>
                  {val % 2 === 1 ? <NotificationsIcon /> : <AccountCircle />}
                </Badge>
              </IconButton>
            ))}
          </div>
        </Toolbar>
      </AppBar>

      <main className={styles.main}>{'hello'.repeat(1000)}</main>
    </div>
  )
}

export default Layout
