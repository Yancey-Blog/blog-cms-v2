// FIXME:
/* eslint-disable */

import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import Avatar from '@material-ui/core/Avatar'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getInitials } from '../../../shared/utils'
import history from '../../../shared/history'
import routes from './Routes'
import styles from './Drawers.module.scss'

interface DrawersProps {
  open: boolean
}

const Drawers: FC<any> = ({ open, pathname }) => {
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
              <div className={styles.drawerItem} onClick={() => {}}>
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
                        [styles.reverseArrow]: true,
                      })}
                    />
                  ) : null}
                </div>
              </div>
              {route.children && route.children.length !== 0 ? (
                <div
                  className={classNames(styles.itemChildren, {
                    [styles.activeItemChildren]: true,
                  })}
                  style={true ? { maxHeight: `${50 * route.children.length}px` } : {}}
                >
                  {route.children.map((child: any) => (
                    <Link to={child.path} key={child.name}>
                      <div
                        className={classNames(styles.drawerItem, styles.drawerItemChildren, {
                          [styles.activeDrawerItem]: true,
                        })}
                        onClick={() => {}}
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
