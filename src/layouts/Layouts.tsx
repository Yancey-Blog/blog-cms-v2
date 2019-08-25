import React, { FC, useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import styles from './Layouts.module.scss'
import classNames from 'classnames'
import AppBars from './components/AppBars/AppBars'
import Drawers from './components/Drawers/Drawers'
import Mains from './components/Mains/Mains'

const Layouts: FC = () => {
  const [open, setOpen] = useState(true)

  function handleDrawerChange() {
    setOpen(!open)
  }

  return (
    <div className={styles.layouts}>
      <CssBaseline />
      <div
        className={classNames(styles.container, {
          [styles.containerShift]: !open,
        })}
      >
        <AppBars handleDrawerChange={handleDrawerChange} />
        <Mains />
      </div>
      <Drawers open={open} active={true} />
    </div>
  )
}

export default Layouts
