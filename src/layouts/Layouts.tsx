import React, { FC, useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import styles from './Layouts.module.scss'
import classNames from 'classnames'
import Header from './components/Header/Header'
import Drawers from './components/Drawers/Drawers'
import Mains from './components/Mains/Mains'
import Footer from './components/Footer/Footer'

const Layouts: FC = () => {
  const [open, setOpen] = useState(true)

  function handleDrawerChange(): void {
    setOpen(!open)
  }

  return (
    <div className='layouts'>
      <CssBaseline />
      <div
        className={classNames(styles.container, {
          [styles.containerShift]: !open,
        })}
      >
        <Header handleDrawerChange={handleDrawerChange} />
        <Mains />
        <Footer />
      </div>
      <Drawers open={open} />
    </div>
  )
}

export default Layouts
