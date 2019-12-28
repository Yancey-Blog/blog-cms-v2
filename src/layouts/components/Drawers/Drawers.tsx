import React, { FC, useState } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import Avatar from '@material-ui/core/Avatar'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getInitials } from '../../../shared/utils'
import routes from './Routes'
import styles from './Drawers.module.scss'

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

  const matchChilren = (chilren: any[]) => {
    return !!chilren.find(child => curPathName.includes(child.path))
  }

  const onClickParent = (route: any) => {
    if (route.path === fold) {
      setFold('')
    } else {
      setFold(route.path)
    }

    if (!route.children) {
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
      <section className={classNames(styles.drawer, { [styles.foldDrawer]: !open })}>
        <div className={styles.drawerContent}>
          <div className={styles.drawerTitle}>
            <FontAwesomeIcon icon={['fab', 'react']} className={styles.drawLogo} />
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
                <FontAwesomeIcon icon={route.icon as IconProp} className={styles.drawerItemIcon} />
                <div
                  className={classNames(styles.drawerDetail, {
                    [styles.hideDrawerDetail]: !open,
                  })}
                >
                  <span className={styles.drawerTxt}>{route.name}</span>
                  {route.children && route.children.length !== 0 ? (
                    <span
                      className={classNames(styles.arrow, {
                        [styles.reverseArrow]: matchChilren(route.children) || route.path === fold,
                      })}
                    />
                  ) : null}
                </div>
              </div>

              {route.children && route.children.length !== 0 ? (
                <div
                  className={classNames(styles.itemChildren)}
                  style={
                    matchChilren(route.children) || route.path === fold
                      ? { maxHeight: `${50 * route.children.length}px` }
                      : {}
                  }
                >
                  {route.children.map((child: any) => (
                    <Link to={child.path} key={child.name}>
                      <div
                        className={classNames(styles.drawerItem, styles.drawerItemChildren, {
                          [styles.activeDrawerItem]: matchCurRoute(child.path),
                        })}
                      >
                        <span className={styles.drawerItemIcon}>{getInitials(child.name)}</span>
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
