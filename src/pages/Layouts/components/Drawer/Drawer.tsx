import React, { FC, Fragment } from 'react'
import { Avatar } from '@material-ui/core'
import { Home } from '@material-ui/icons'
import classNames from 'classnames'
import LinkItem, { ItemType } from './components/Item'
import useStyles from './styles'
import routes from 'src/config/routes'

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
      <div
        className={classNames(classes.drawerTitle, {
          [classes.hidenItem]: !open,
        })}
      >
        <Home className={classes.logo} />
        <div
          className={classNames(classes.detail, {
            [classes.hideDetail]: !open,
          })}
        >
          <span className={classes.title}>BLOG CMS</span>
        </div>
      </div>

      <div
        className={classNames(classes.drawerUser, {
          [classes.hidenItem]: !open,
        })}
      >
        <Avatar
          alt="Yancey Official Logo"
          src="http://yancey-assets.oss-cn-beijing.aliyuncs.com/_Users_licaifan_Desktop_11532336786_.pic_hd.jpg"
          className={classes.avater}
        />
        <div
          className={classNames(classes.detail, {
            [classes.hideDetail]: !open,
          })}
        >
          <span className={classes.userName}>Yancey Leo</span>
          <span className={classes.arrow} />
        </div>
      </div>

      {routes.map(route => (
        <Fragment key={route.name}>
          <LinkItem
            path={route.path}
            open={open}
            mode={ItemType.Parent}
            name={route.name}
            icon={route.icon}
            hasChild={!!route.routes}
          />

          {route.routes &&
            route.routes.map(childRoute => (
              <LinkItem
                key={childRoute.path}
                open={open}
                mode={ItemType.Child}
                name={childRoute.name}
                path={childRoute.path}
              />
            ))}
        </Fragment>
      ))}
    </menu>
  )
}

export default Drawer
