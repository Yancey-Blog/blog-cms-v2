import React, { FC, ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import HideWrapper from './HideWrapper'
import useStyles from '../styles'
import { getInitials } from 'src/shared/utils'

export enum ItemType {
  Parent,
  Child,
}

interface IItem {
  open: boolean
  mode: ItemType
  name: string
  icon?: ReactElement
  hasChild?: boolean
}

interface ILinkItem extends IItem {
  path: string
}

const Item: FC<IItem> = ({ open, mode, name, icon, hasChild }) => {
  const classes = useStyles()

  const isChildMode = mode === ItemType.Child

  return (
    <div
      className={classNames(classes.item, {
        [classes.childItem]: isChildMode,
        [classes.hidenItem]: !open,
      })}
    >
      <span
        className={classNames(classes.itemAbbrTxt, {
          [classes.itemIcon]: !isChildMode,
          [classes.hidenItem]: !open,
        })}
      >
        {isChildMode ? getInitials(name) : icon}
      </span>
      <HideWrapper open={open}>
        <span className={classes.itemTxt}>{name}</span>
        {hasChild && <span className={classes.arrow} />}
      </HideWrapper>
    </div>
  )
}

const LinkItem: FC<ILinkItem> = ({
  open,
  mode,
  name,
  icon,
  hasChild,
  path,
}) => {
  const classes = useStyles()
  return (
    <>
      {!hasChild ? (
        <NavLink
          exact
          activeClassName={classes.active}
          to={path}
          key={name}
          className={classes.formatArrowTag}
        >
          <Item
            open={open}
            mode={mode}
            name={name}
            icon={icon}
            hasChild={hasChild}
          />
        </NavLink>
      ) : (
        <Item
          open={open}
          mode={mode}
          name={name}
          icon={icon}
          hasChild={hasChild}
        />
      )}
    </>
  )
}

export default LinkItem
