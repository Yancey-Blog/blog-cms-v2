import React, { FC } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Fab from '@material-ui/core/Fab'
import Input from '@material-ui/core/Input'
import Badge from '@material-ui/core/Badge'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Header.module.scss'

const Header: FC<any> = ({ handleDrawerChange }) => {
  return (
    <AppBar position='relative' className={styles.header}>
      <div className={styles.left}>
        <Fab
          size='small'
          aria-label='more'
          onClick={handleDrawerChange}
          className={styles.foldIcon}
        >
          <FontAwesomeIcon icon={['fab', 'react']} />
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
          <IconButton aria-label='show 4 new mails' color='inherit' key={val}>
            <Badge badgeContent={val} color='secondary'>
              <FontAwesomeIcon icon={['fab', 'react']} />
            </Badge>
          </IconButton>
        ))}
      </div>
    </AppBar>
  )
}

export default Header
