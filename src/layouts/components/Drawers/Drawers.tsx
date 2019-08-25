import React, { FC } from 'react'
import Drawer from '@material-ui/core/Drawer'
import Avatar from '@material-ui/core/Avatar'
import styles from './Drawers.module.scss'
import classNames from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface DrawersProps {
  open: boolean
  active: boolean
}

const Drawers: FC<DrawersProps> = ({ open, active }) => {
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
              CREATIVE TIM
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
          <div className={classNames(styles.drawerList)}>
            <div className={classNames(styles.drawerItem)}>
              <FontAwesomeIcon
                icon='calendar-alt'
                className={styles.drawerItemIcon}
              />
              <div
                className={classNames(styles.drawerDetail, {
                  [styles.hideDrawerDetail]: !open,
                })}
              >
                <span className={styles.drawerTxt}>DashBoard</span>
                <span className={styles.arrow} />
              </div>
            </div>
          </div>
          <div className={classNames(styles.drawerList)}>
            <div className={classNames(styles.drawerItem)}>
              <FontAwesomeIcon
                icon='calendar-alt'
                className={styles.drawerItemIcon}
              />
              <div
                className={classNames(styles.drawerDetail, {
                  [styles.hideDrawerDetail]: !open,
                })}
              >
                <span className={styles.drawerTxt}>DashBoard</span>
                <span className={styles.arrow} />
              </div>
            </div>
          </div>
          <div className={classNames(styles.drawerList)}>
            <div
              className={classNames(styles.drawerItem, {
                [styles.activeDrawerItem]: active,
              })}
            >
              <FontAwesomeIcon
                icon='calendar-alt'
                className={styles.drawerItemIcon}
              />
              <div
                className={classNames(styles.drawerDetail, {
                  [styles.hideDrawerDetail]: !open,
                })}
              >
                <span className={styles.drawerTxt}>DashBoard</span>
                <span className={styles.arrow} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Drawer>
  )
}

export default Drawers
