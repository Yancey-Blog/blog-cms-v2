import React, { FC, useState } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { Drawer, Avatar } from '@material-ui/core'
import { Home } from '@material-ui/icons'
import classNames from 'classnames'
import styles from './Drawers.module.scss'
import { getInitials } from 'src/shared/utils'
import routes from 'src/config/Routes'

interface DrawersProps {
  open: boolean
}

const Drawers: FC<DrawersProps> = ({ open }) => {
  const curPathName = useLocation().pathname
  const history = useHistory()

  const [fold, setFold] = useState('')

  const matchCurRoute = (path: string) => {
    return curPathName.includes(path)
  }

  const matchChilren = (children: any[]) => {
    return !!children.find(child => curPathName.includes(child.path))
  }

  const onClickParent = (route: any) => {
    if (route.path === fold) {
      setFold('')
    } else {
      setFold(route.path)
    }

    if (!route.routes) {
      history.push(route.path)
    }
  }

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: styles.drawerContainer,
      }}
    >
      <section
        className={classNames(styles.drawer, { [styles.foldDrawer]: !open })}
      >
        <div className={styles.drawerContent}>
          <div className={styles.drawerTitle}>
            <Home className={styles.drawLogo} />
            <span
              className={classNames(styles.drawerDetail, {
                [styles.hideDrawerDetail]: !open,
              })}
            >
              BLOG CMS
            </span>
          </div>
          <div className={classNames(styles.drawerUser)}>
            <Avatar
              alt="Yancey Official Logo"
              src="http://yancey-assets.oss-cn-beijing.aliyuncs.com/_Users_licaifan_Desktop_11532336786_.pic_hd.jpg"
              className={styles.avater}
            />
            <div
              className={classNames(styles.drawerDetail, {
                [styles.hideDrawerDetail]: !open,
              })}
            >
              <span className={styles.drawerTxt}>Yancey Leo</span>
              <span className={styles.arrow} />
            </div>
          </div>

          {routes.map((route: any, key: number) => (
            <div className={styles.drawerList} key={route.name}>
              <div
                className={classNames(styles.drawerItem, {
                  [styles.activeDrawerItem]: matchCurRoute(route.path),
                })}
                onClick={() => onClickParent(route)}
              >
                <span className={styles.drawerItemIcon}>{route.icon}</span>
                <div
                  className={classNames(styles.drawerDetail, {
                    [styles.hideDrawerDetail]: !open,
                  })}
                >
                  <span className={styles.drawerTxt}>{route.name}</span>
                  {route.routes && route.routes.length !== 0 ? (
                    <span
                      className={classNames(styles.arrow, {
                        [styles.reverseArrow]:
                          matchChilren(route.routes) || route.path === fold,
                      })}
                    />
                  ) : null}
                </div>
              </div>

              {route.routes && route.routes.length !== 0 ? (
                <div
                  className={classNames(styles.itemChildren)}
                  style={
                    matchChilren(route.routes) || route.path === fold
                      ? { maxHeight: `${50 * route.routes.length}px` }
                      : {}
                  }
                >
                  {route.routes.map((child: any) => (
                    <Link to={child.path} key={child.name}>
                      <div
                        className={classNames(
                          styles.drawerItem,
                          styles.drawerItemChildren,
                          {
                            [styles.activeDrawerItem]: matchCurRoute(
                              child.path,
                            ),
                          },
                        )}
                      >
                        <span className={styles.drawerItemIcon}>
                          {getInitials(child.name)}
                        </span>
                        <div
                          className={classNames(styles.drawerDetail, {
                            [styles.hideDrawerDetail]: !open,
                          })}
                        >
                          <span className={styles.drawerTxt}>{child.name}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </Drawer>
  )
}

export default Drawers
