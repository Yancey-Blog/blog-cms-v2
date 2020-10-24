import { FC } from 'react'
import classNames from 'classnames'
import { noop } from 'src/shared/utils'
import { Route } from 'src/routes'
import useStyles from '../styles'

interface ParentItemProps {
  open: boolean
  route: Route
  handleFoldNameChange?: (name: string) => void
}

const ParentItem: FC<ParentItemProps> = ({
  open,
  route,
  handleFoldNameChange,
}) => {
  const classes = useStyles()

  return (
    <div
      className={classNames(classes.item, {
        [classes.hidenItem]: !open,
      })}
      onClick={
        handleFoldNameChange ? () => handleFoldNameChange(route.name) : noop
      }
    >
      <span
        className={classNames(classes.itemAbbrTxt, classes.itemIcon, {
          [classes.hidenItem]: !open,
        })}
      >
        {route.icon}
      </span>
      <div
        className={classNames(classes.detail, {
          [classes.hideDetail]: !open,
        })}
      >
        <span className={classes.itemTxt}>{route.name}</span>

        {handleFoldNameChange && <span className={classes.arrow} />}
      </div>
    </div>
  )
}

export default ParentItem
