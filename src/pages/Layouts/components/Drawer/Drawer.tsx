import React, { FC, Fragment } from 'react'
// import { NavLink, Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import { Home } from '@material-ui/icons'
import classNames from 'classnames'
import useStyles from './styles'

interface Props {
  open: boolean
}

const Drawer: FC<Props> = ({ open }) => {
  const classes = useStyles()

  return (
    <menu
      className={classNames(
        classes.menu,
        open ? classes.expand : classes.shrink,
      )}
    >
      <div className={classes.drawerTitle}>
        <Home className={classes.logo} />
        <span className={classes.title}>BLOG CMS</span>
      </div>

      <div className={classNames(classes.drawerUser)}>
        <Avatar
          alt="Yancey Official Logo"
          src="http://yancey-assets.oss-cn-beijing.aliyuncs.com/_Users_licaifan_Desktop_11532336786_.pic_hd.jpg"
          className={classes.avater}
        />
        <div
          className={classNames(classes.showDetail, {
            [classes.hideDetail]: !open,
          })}
        >
          <span className={classes.userName}>Yancey Leo</span>
          <span className={classes.arrow} />
        </div>
      </div>

      <div
        className={classNames(classes.item, {
          [classes.hidenItem]: !open,
        })}
      >
        <Home className={classes.itemIcon} />
        <div
          className={classNames(classes.showDetail, {
            [classes.hideDetail]: !open,
          })}
        >
          <span className={classes.itemTxt}>Dashborad</span>
          <span className={classes.arrow} />
        </div>
      </div>
      <div
        className={classNames(classes.item, classes.childItem, {
          [classes.hidenItem]: !open,
        })}
      >
        <span className={classes.itemIcon}>OS</span>
        <div
          className={classNames(classes.showDetail, {
            [classes.hideDetail]: !open,
          })}
        >
          <span className={classes.itemTxt}>Open Source</span>
        </div>
      </div>
    </menu>
  )
}

export default Drawer
