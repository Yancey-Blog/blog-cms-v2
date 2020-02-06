import React, { FC } from 'react'
import classNames from 'classnames'
import useStyles from '../styles'

interface Props {
  open: boolean
}

const HideWrapper: FC<Props> = ({ children, open }) => {
  const classes = useStyles()

  return (
    <div
      className={classNames(classes.detail, {
        [classes.hideDetail]: !open,
      })}
    >
      {children}
    </div>
  )
}

export default HideWrapper
