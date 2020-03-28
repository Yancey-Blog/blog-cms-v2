import React, { FC, useState } from 'react'
import { Tabs, Tab, Typography } from '@material-ui/core'
import Security from './Security/Security'
import styles from './setting.module.scss'

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

const Setting: FC = () => {
  const [value, setValue] = useState(2)
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }
  return (
    <section className={styles.settingContainer}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleTabChange}
        aria-label="setting-tabs"
        className={styles.tabs}
      >
        <Tab label="profile" {...a11yProps(0)} />
        <Tab label="account" {...a11yProps(1)} />
        <Tab label="security" {...a11yProps(2)} />
      </Tabs>
      <section className={styles.tabPanelContainer}>
        <TabPanel value={value} index={0}>
          Profile
        </TabPanel>
        <TabPanel value={value} index={1}>
          Account
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Security />
        </TabPanel>
      </section>
    </section>
  )
}

export default Setting
