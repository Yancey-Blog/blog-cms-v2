import React, { FC } from 'react'
import classNames from 'classnames'
import useStyles from './styles'

interface Props {
  open: boolean
}

const Drawer: FC<Props> = ({ open }) => {
  const classes = useStyles()

  return (
    <menu
      className={classNames(
        classes.menu,
        open ? classes.expand : classes.shrink,
      )}
    ></menu>
  )
}

export default Drawer
