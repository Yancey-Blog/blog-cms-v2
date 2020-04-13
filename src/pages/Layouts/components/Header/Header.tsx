import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Menu, MenuItem, Divider } from '@material-ui/core'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import classNames from 'classnames'
import {
  AppBar,
  Input,
  Fab,
  Badge,
  Typography,
  IconButton,
} from '@material-ui/core'
import {
  MoreVert,
  Dashboard,
  Notifications,
  Person,
  Search,
  ViewList,
} from '@material-ui/icons'
import { logout } from 'src/shared/utils'
import useStyles from './styles'

interface Props {
  open: boolean
  handleDrawerChange: Function
}

const Header: FC<Props> = ({ open, handleDrawerChange }) => {
  const classes = useStyles()

  return (
    <AppBar position="relative" className={classes.header}>
      <section className={classes.left}>
        <Fab
          size="small"
          aria-label="more"
          onClick={() => handleDrawerChange()}
          className={classes.fabIcon}
        >
          {open ? <MoreVert fontSize="small" /> : <ViewList fontSize="small" />}
        </Fab>
        <Typography variant="h6" noWrap className={classes.title}>
          CMS
        </Typography>
      </section>
      <section>
        <Input placeholder="Search..." />
        <Fab
          size="small"
          aria-label="search"
          className={classNames(classes.fabIcon, classes.marginRight)}
        >
          <Search fontSize="small" />
        </Fab>
        <Link to="/">
          <IconButton>
            <Dashboard fontSize="small" />
          </IconButton>
        </Link>

        <IconButton>
          <Badge color="secondary">
            <Notifications fontSize="small" />
          </Badge>
        </IconButton>

        <PopupState variant="popover" popupId="deleteOnePoperOver">
          {(popupState) => (
            <>
              <IconButton
                style={{ cursor: 'pointer' }}
                {...bindTrigger(popupState)}
              >
                <Person fontSize="small" />
              </IconButton>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>
                  <Link to="/settings">Profile</Link>
                </MenuItem>

                <MenuItem onClick={popupState.close}>Setting</MenuItem>
                <Divider />
                <MenuItem onClick={popupState.close && logout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </PopupState>
      </section>
    </AppBar>
  )
}

export default Header
