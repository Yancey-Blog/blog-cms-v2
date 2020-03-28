import React, { FC, useState } from 'react'
import { Tabs, Tab, Typography, Box } from '@material-ui/core'
import styles from './setting.module.scss'

interface TabPanelProps {
  children?: React.ReactNode
  index: string
  value: string
}

function a11yProps(index: string) {
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
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

const Security: FC = () => {
  const [value, setValue] = useState('profile')
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue)
  }
  return (
    <section className={styles.settingContainer}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleTabChange}
        aria-label="Vertical tabs example"
        className={styles.tabs}
      >
        <Tab label="profile" {...a11yProps('profile')} />
        <Tab label="account" {...a11yProps('account')} />
        <Tab label="security" {...a11yProps('security')} />
      </Tabs>
      <section>
        <TabPanel value={value} index={'profile'}>
          Profile
        </TabPanel>
        <TabPanel value={value} index={'account'}>
          Account
        </TabPanel>
        <TabPanel value={value} index={'security'}>
          Security
        </TabPanel>
      </section>
    </section>
  )
}

export default Security
