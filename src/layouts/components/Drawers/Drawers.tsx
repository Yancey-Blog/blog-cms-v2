import React, { FC, useState } from 'react'
import Drawer from '@material-ui/core/Drawer'
import Avatar from '@material-ui/core/Avatar'
import styles from './Drawers.module.scss'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import routes from './Routes'
import { getInitials } from 'shared/utils'

interface DrawersProps {
  open: boolean
  active: boolean
}

const Drawers: FC<DrawersProps> = ({ open, active }) => {
  const [drawerItem, setDrawerItem] = useState('')

  const handleDrawerChange = (path: string) => {
    setDrawerItem(path)
  }

  const setItemStyle = (children: any[], curItem: string) => {
    if (curItem === drawerItem) {
      if (children.length > 0) {
        return styles.activeDrawerItemHasChildren
      } else {
        return styles.activeDrawerItem
      }
    } else {
      return false
    }
  }
  return (
    <Drawer
      variant='permanent'
      classes={{
        paper: styles.drawerContainer,
      }}
    >
      <section
        className={classNames(styles.drawer, { [styles.foldDrawer]: !open })}
      >
        <div className={styles.drawerContent}>
          <div className={styles.drawerTitle}>
            <FontAwesomeIcon
              icon={['fab', 'react']}
              className={styles.drawLogo}
            />
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
              alt='Remy Sharp'
              src='https://yancey-assets.oss-cn-beijing.aliyuncs.com/_Users_licaifan_Desktop_11532336786_.pic_hd.jpg'
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

          <div className={classNames(styles.xxxxxxxx)}>
            {routes.map(route => (
              <div className={styles.drawerList} key={route.name}>
                <div
                  className={classNames(
                    styles.drawerItem,
                    setItemStyle(route.children, route.path),
                  )}
                  onClick={() => handleDrawerChange(route.path)}
                >
                  <FontAwesomeIcon
                    // @ts-ignore
                    icon={route.icon}
                    className={styles.drawerItemIcon}
                  />
                  <div
                    className={classNames(styles.drawerDetail, {
                      [styles.hideDrawerDetail]: !open,
                    })}
                  >
                    <span className={styles.drawerTxt}>{route.name}</span>
                    {route.children.length !== 0 ? (
                      <span
                        className={classNames(styles.arrow, {
                          [styles.reverseArrow]: drawerItem === route.path,
                        })}
                      />
                    ) : null}
                  </div>
                </div>
                {route.children.length !== 0 ? (
                  <div
                    className={classNames(styles.itemChildren, {
                      [styles.activeItemChildren]: drawerItem === route.path,
                    })}
                  >
                    {route.children.map(child => (
                      <div
                        className={classNames(styles.drawerItem, {
                          [styles.activeDrawerItem]: drawerItem === child.path,
                        })}
                        key={child.name}
                        onClick={() => handleDrawerChange(child.path)}
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
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Drawer>
  )
}

export default Drawers
