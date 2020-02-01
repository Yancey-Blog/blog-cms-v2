import React, { FC } from 'react'
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
} from '@material-ui/icons'
import useStyles from './styles'

interface Props {
  handleDrawerChange: Function
}

const Header: FC<Props> = ({ handleDrawerChange }) => {
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
          <MoreVert fontSize="small" />
        </Fab>
        <Typography variant="h6" noWrap className={classes.title}>
          CMS
        </Typography>
      </section>
      <section>
        <Input
          placeholder="Search..."
          inputProps={{
            'aria-label': 'description',
          }}
        />
        <Fab
          size="small"
          aria-label="search"
          className={classNames(classes.fabIcon, classes.marginRight)}
        >
          <Search fontSize="small" />
        </Fab>
        <IconButton>
          <Dashboard fontSize="small" />
        </IconButton>
        <IconButton>
          <Badge badgeContent={4} color="secondary">
            <Notifications fontSize="small" />
          </Badge>
        </IconButton>
        <IconButton>
          <Person fontSize="small" />
        </IconButton>
      </section>
    </AppBar>
  )
}

export default Header
