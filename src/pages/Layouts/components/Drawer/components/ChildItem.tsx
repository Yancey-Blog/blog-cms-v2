import React, { FC } from 'react'
import classNames from 'classnames'
import { getInitials } from 'src/shared/utils'
import { RouteChildren } from 'src/routes'
import useStyles from '../styles'

interface ChildItemProps {
  open: boolean
  childRoute: RouteChildren
}

const ChildItem: FC<ChildItemProps> = ({ open, childRoute }) => {
  const classes = useStyles()

  return (
    <div
      className={classNames(classes.item, classes.childItem, {
        [classes.hidenItem]: !open,
      })}
    >
      <span
        className={classNames(classes.itemAbbrTxt, {
          [classes.hidenItem]: !open,
        })}
      >
        {getInitials(childRoute.name)}
      </span>
      <div
        className={classNames(classes.detail, {
          [classes.hideDetail]: !open,
        })}
      >
        <span className={classes.itemTxt}>{childRoute.name}</span>
      </div>
    </div>
  )
}

export default ChildItem
