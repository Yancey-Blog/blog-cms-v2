import React, { FC, Fragment, useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import { Home, Face } from '@material-ui/icons'
import classNames from 'classnames'
import routes, { Route } from 'src/routes'
import client from 'src/graphql/apolloClient'
import ChildItem from './components/ChildItem'
import ParentItem from './components/ParentItem'
import useStyles from './styles'

interface Props {
  open: boolean
}

const Drawer: FC<Props> = ({ open }) => {
  const {
    username,
    name,
    avatarUrl,
    // @ts-ignore
  } = client.cache.data.data[
    `UserModel:${window.localStorage.getItem('userId')}`
  ]

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
        (route) =>
          route.routes &&
          route.routes.find((childRoute) => pathname.includes(childRoute.path)),
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
        {avatarUrl ? (
          <Avatar
            alt="user-avatar"
            src={avatarUrl}
            className={classes.avatar}
          />
        ) : (
          <Avatar className={classes.avatar}>
            <Face />
          </Avatar>
        )}

        <div
          className={classNames(classes.detail, {
            [classes.hideDetail]: !open,
          })}
        >
          <span className={classes.userName}>{name ? name : username}</span>
          <span className={classes.arrow} />
        </div>
      </div>

      {routes.map((route) => (
        <Fragment key={route.name}>
          {route.routes &&
          !route.routes.some((childRoute) => childRoute.hideInMenu === true) ? (
            <ParentItem
              open={open}
              route={route}
              handleFoldNameChange={handleFoldNameChange}
            />
          ) : (
            <NavLink
              exact
              activeClassName={classNames(classes.active, {
                [classes.foldActive]: !open,
              })}
              className={classes.formatArrowTag}
              to={route.path}
            >
              <ParentItem open={open} route={route} />
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
              !route.routes.some(
                (childRoute) => childRoute.hideInMenu === true,
              ) &&
              route.routes.map((childRoute) =>
                childRoute.isExternalLink ? (
                  <a
                    className={classes.formatArrowTag}
                    href={childRoute.path}
                    key={childRoute.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ChildItem open={open} childRoute={childRoute} />
                  </a>
                ) : (
                  <NavLink
                    exact
                    activeClassName={classNames(classes.active, {
                      [classes.foldActive]: !open,
                    })}
                    className={classes.formatArrowTag}
                    to={childRoute.path}
                    key={childRoute.name}
                  >
                    <ChildItem open={open} childRoute={childRoute} />
                  </NavLink>
                ),
              )}
          </div>
        </Fragment>
      ))}
    </menu>
  )
}

export default Drawer
