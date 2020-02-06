import React, { FC, Fragment, useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import { Home } from '@material-ui/icons'
import classNames from 'classnames'
import useStyles from './styles'
import routes, { Route } from 'src/config/routes'
import { getInitials } from 'src/shared/utils'

interface Props {
  open: boolean
}

const Drawer: FC<Props> = ({ open }) => {
  const classes = useStyles()

  const { pathname } = useLocation()

  const [foldName, setfoldName] = useState('')

  const handleFoldNameChange = (name: string) => {
    if (foldName === name) {
      setfoldName('')
    } else {
      setfoldName(name)
    }
  }

  useEffect(() => {
    const matchChilren = (routeList: Route[]) => {
      const curRoute = routeList.find(
        route =>
          route.routes &&
          route.routes.find(childRoute => pathname.includes(childRoute.path)),
      )
      curRoute && setfoldName(curRoute.name)
    }

    matchChilren(routes)
  }, [pathname])

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
          [classes.hidenNotItem]: !open,
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
          [classes.hidenNotItem]: !open,
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
          {route.routes ? (
            <div
              className={classNames(classes.item, {
                [classes.hidenItem]: !open,
              })}
              onClick={() => handleFoldNameChange(route.name)}
            >
              <span
                className={classNames(classes.itemAbbrTxt, classes.itemIcon, {
                  [classes.hidenItem]: !open,
                })}
              >
                {route.icon}
              </span>
              <div
                className={classNames(classes.detail, {
                  [classes.hideDetail]: !open,
                })}
              >
                <span className={classes.itemTxt}>{route.name}</span>
                <span className={classes.arrow} />
              </div>
            </div>
          ) : (
            <NavLink
              exact
              activeClassName={classNames(classes.active, {
                [classes.foldActive]: !open,
              })}
              className={classes.formatArrowTag}
              to={route.path}
            >
              <div
                className={classNames(classes.item, {
                  [classes.hidenItem]: !open,
                })}
              >
                <span
                  className={classNames(classes.itemAbbrTxt, classes.itemIcon, {
                    [classes.hidenItem]: !open,
                  })}
                >
                  {route.icon}
                </span>
                <div
                  className={classNames(classes.detail, {
                    [classes.hideDetail]: !open,
                  })}
                >
                  <span className={classes.itemTxt}>{route.name}</span>
                </div>
              </div>
            </NavLink>
          )}

          <div
            className={classNames(classes.childrenGroup, {
              [classes.unfoldChildren]: foldName === route.name,
            })}
            style={{
              maxHeight: `${
                foldName === route.name
                  ? route.routes && 50 * route.routes.length
                  : 0
              }px`,
            }}
          >
            {route.routes &&
              route.routes.map(childRoute => (
                <NavLink
                  exact
                  activeClassName={classNames(classes.active, {
                    [classes.foldActive]: !open,
                  })}
                  className={classes.formatArrowTag}
                  to={childRoute.path}
                  key={childRoute.name}
                >
                  <div
                    className={classNames(classes.item, classes.childItem, {
                      [classes.hidenItem]: !open,
                    })}
                  >
                    <span
                      className={classNames(classes.itemAbbrTxt, {
                        [classes.hidenItem]: !open,
                      })}
                    >
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
          </div>
        </Fragment>
      ))}
    </menu>
  )
}

export default Drawer
