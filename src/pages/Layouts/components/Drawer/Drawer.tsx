import React, { FC, Fragment, useState } from 'react'
import { Avatar } from '@material-ui/core'
import { Home } from '@material-ui/icons'
import classNames from 'classnames'
import LinkItem, { ItemType } from './components/LinkItem'
import HideWrapper from './components/HideWrapper'
import useStyles from './styles'
import routes from 'src/config/routes'

interface Props {
  open: boolean
}

const Drawer: FC<Props> = ({ open }) => {
  const classes = useStyles()

  const [fold, setFold] = useState(true)

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

        <HideWrapper open={open}>
          <span className={classes.title}>BLOG CMS</span>
        </HideWrapper>
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

        <HideWrapper open={open}>
          <span className={classes.userName}>Yancey Leo</span>
          <span className={classes.arrow} />
        </HideWrapper>
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
            setFold={() => setFold(!fold)}
          />

          <div
            className={classNames(classes.childrenGroup, {
              [classes.unfoldChildren]: !fold,
            })}
            style={{
              maxHeight: `${
                !fold ? route.routes && 50 * route.routes.length : 0
              }px`,
            }}
          >
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
          </div>
        </Fragment>
      ))}
    </menu>
  )
}

export default Drawer
