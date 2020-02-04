import React, { FC, useState } from 'react'
import classNames from 'classnames'
import useStyles from './styles'
import Header from './components/Header/Header'
import Drawer from './components/Drawer/Drawer'
import Mains from './components/Mains/Mains'
import Footer from './components/Footer/Footer'

const Layouts: FC = () => {
  const [open, setOpen] = useState(true)

  const classes = useStyles()

  function handleDrawerChange() {
    setOpen(!open)
  }

  return (
    <div className={classes.layouts}>
      <Drawer open={open} />
      <section
        className={classNames(
          classes.main,
          open ? classes.expand : classes.shrink,
        )}
      >
        <Header open={open} handleDrawerChange={handleDrawerChange} />
        <Mains />
        <Footer />
      </section>
    </div>
  )
}

export default Layouts
