import React, { FC, useState } from 'react'

import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import List from '@material-ui/core/List'
import Fab from '@material-ui/core/Fab'
import Input from '@material-ui/core/Input'
import Badge from '@material-ui/core/Badge'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import styles from './Layouts.module.scss'
import classNames from 'classnames'

const Layouts: FC = () => {
  const [open, setOpen] = React.useState(true)

  function handleDrawerChange() {
    setOpen(!open)
  }

  return (
    <div className={styles.root}>
      <CssBaseline />
      <div
        className={classNames(styles.main, {
          [styles.mainShift]: !open,
        })}
      >
        <AppBar position='relative' className={styles.appBar}>
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
                  {val % 2 === 1 ? (
                    <NotificationsIcon />
                  ) : (
                    <AccountCircleIcon />
                  )}
                </Badge>
              </IconButton>
            ))}
          </div>
        </AppBar>
        <main className={styles.content}>
          <Typography paragraph>
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.`.repeat(30)}
          </Typography>
        </main>
      </div>
      <Drawer variant='permanent'>
        <div
          className={classNames(styles.drawer, { [styles.foldDrawer]: !open })}
        >
          <List className={styles.list}>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}  >
                <ListItemIcon className={styles.icon}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} className={classNames(styles.drawerTxt,{[styles.hideDrawerTxt]: !open})} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  )
}

export default Layouts
