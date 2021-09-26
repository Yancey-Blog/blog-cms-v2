import { FC } from 'react'
import { Link } from 'react-router-dom'
import {
  Menu,
  MenuItem,
  Divider,
  Fade,
  ListItemIcon,
  ListItemText,
  AppBar,
  Input,
  Fab,
  Badge,
  Typography,
  IconButton,
} from '@mui/material'
import {
  LockOutlined,
  FaceOutlined,
  PermDataSettingOutlined,
  AccountBalanceOutlined,
  ExitToAppOutlined,
} from '@mui/icons-material'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import classNames from 'classnames'
import {
  MoreVert,
  Dashboard,
  Notifications,
  Person,
  Search,
  ViewList,
} from '@mui/icons-material'
import { ClassNameMap } from '@mui/styles'
import { logout } from 'src/shared/utils'
import useStyles from './styles'

interface Props {
  open: boolean
  handleDrawerChange: Function
}

const Header: FC<Props> = ({ open, handleDrawerChange }) => {
  const classes: ClassNameMap = useStyles()

  return (
    <AppBar position="relative" className={classes.navHeader}>
      <section className={classes.left}>
        <Fab
          size="small"
          aria-label="more"
          onClick={() => handleDrawerChange()}
          className={classes.fabIcon}
        >
          {open ? <MoreVert /> : <ViewList />}
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
          <Search />
        </Fab>
        <Link to="/">
          <IconButton>
            <Dashboard />
          </IconButton>
        </Link>

        <IconButton>
          <Badge showZero badgeContent={0} color="secondary">
            <Notifications />
          </Badge>
        </IconButton>

        <PopupState variant="popover" popupId="deleteOnePoperOver">
          {(popupState) => {
            const handleLogout = () => {
              popupState.close()
              logout()
            }
            return (
              <>
                <IconButton
                  style={{ cursor: 'pointer' }}
                  {...bindTrigger(popupState)}
                >
                  <Person />
                </IconButton>
                <Menu
                  {...bindMenu(popupState)}
                  TransitionComponent={Fade}
                  className={classes.menu}
                >
                  <Link to="/settings/profile" className={classes.anchor}>
                    <MenuItem onClick={popupState.close}>
                      <ListItemIcon>
                        <FaceOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </MenuItem>
                  </Link>
                  <Link to="/settings/account" className={classes.anchor}>
                    <MenuItem onClick={popupState.close}>
                      <ListItemIcon>
                        <AccountBalanceOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Account" />
                    </MenuItem>
                  </Link>
                  <Link to="/settings/security" className={classes.anchor}>
                    <MenuItem onClick={popupState.close}>
                      <ListItemIcon>
                        <LockOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Security" />
                    </MenuItem>
                  </Link>
                  <Link to="/settings/global-config" className={classes.anchor}>
                    <MenuItem onClick={popupState.close}>
                      <ListItemIcon>
                        <PermDataSettingOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Global Config" />
                    </MenuItem>
                  </Link>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <ExitToAppOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </MenuItem>
                </Menu>
              </>
            )
          }}
        </PopupState>
      </section>
    </AppBar>
  )
}

export default Header
