import React, { FC, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import { Home } from '@material-ui/icons'
import classNames from 'classnames'
import useStyles from './styles'
import routes from 'src/config/routes'
import { getInitials } from 'src/shared/utils'

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
          <div
            className={classNames(classes.item, {
              [classes.hidenItem]: !open,
            })}
          >
            <span className={classNames(classes.itemIcon, classes.itemAbbrTxt)}>
              {route.icon}
            </span>
            <div
              className={classNames(classes.detail, {
                [classes.hideDetail]: !open,
              })}
            >
              <span className={classes.itemTxt}>{route.name}</span>
              {route.routes && <span className={classes.arrow} />}
            </div>
          </div>

          {route.routes &&
            route.routes.map(childRoute => (
              <NavLink
                exact
                activeClassName={classes.active}
                to={childRoute.path}
                key={childRoute.name}
                className={classes.formatArrowTag}
              >
                <div
                  className={classNames(classes.item, classes.childItem, {
                    [classes.hidenItem]: !open,
                  })}
                >
                  <span className={classes.itemAbbrTxt}>
                    {getInitials(childRoute.name)}
                  </span>
                  <div
                    className={classNames(classes.detail, {
                      [classes.hideDetail]: !open,
                    })}
                  >
                    <span className={classes.itemTxt}>{childRoute.name}</span>
                  </div>
                </div>
              </NavLink>
            ))}
        </Fragment>
      ))}
    </menu>
  )
}

export default Drawer
