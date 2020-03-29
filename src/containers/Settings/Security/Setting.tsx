import React, { FC, useState } from 'react'
import { Tabs, Tab } from '@material-ui/core'

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

const Security: FC = () => {
  const [value] = useState(0)
  return (
    <section>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        aria-label="Vertical tabs example"
      >
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
    </section>
  )
}

export default Security
