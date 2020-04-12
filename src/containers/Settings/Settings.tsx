import React, { FC, useState } from 'react'
import { Tabs, Tab, Typography } from '@material-ui/core'
import {
  LockOutlined,
  FaceOutlined,
  PermDataSettingOutlined,
  AccountBalanceOutlined,
} from '@material-ui/icons'
import Security from './Security/Security'
import GlobalConfig from './GlobalConfig/GlobalConfig'
import Profile from './Profile/Profile'
import Account from './Account/Account'
import styles from './settings.module.scss'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Typography>
  )
}

const Settings: FC = () => {
  const [value, setValue] = useState(2)
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }
  return (
    <section className={styles.setting}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleTabChange}
        aria-label="setting-tabs"
      >
        <Tab
          disableRipple={true}
          label={
            <span className={styles.tabLabel}>
              <FaceOutlined className={styles.tabIcon} />
              Profile
            </span>
          }
          {...a11yProps(0)}
        />
        <Tab
          disableRipple={true}
          label={
            <span className={styles.tabLabel}>
              <AccountBalanceOutlined className={styles.tabIcon} />
              Account
            </span>
          }
          {...a11yProps(1)}
        />
        <Tab
          disableRipple={true}
          label={
            <span className={styles.tabLabel}>
              <LockOutlined className={styles.tabIcon} />
              Security
            </span>
          }
          {...a11yProps(2)}
        />
        <Tab
          disableRipple={true}
          label={
            <span className={styles.tabLabel}>
              <PermDataSettingOutlined className={styles.tabIcon} />
              Global Config
            </span>
          }
          {...a11yProps(3)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Profile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Account />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Security />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <GlobalConfig />
      </TabPanel>
    </section>
  )
}

export default Settings
