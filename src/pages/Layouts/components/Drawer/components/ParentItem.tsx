import { FC } from 'react'
import classNames from 'classnames'
import { Link } from '@mui/icons-material'
import { ClassNameMap } from '@mui/styles'
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
  route: { name, icon, isExternalLink },
  handleFoldNameChange,
}) => {
  const classes: ClassNameMap = useStyles()

  return (
    <div
      className={classNames(classes.item, {
        [classes.hidenItem]: !open,
      })}
      onClick={handleFoldNameChange ? () => handleFoldNameChange(name) : noop}
    >
      <span
        className={classNames(classes.itemAbbrTxt, classes.itemIcon, {
          [classes.hidenItem]: !open,
        })}
      >
        {icon}
      </span>
      <div
        className={classNames(classes.detail, {
          [classes.hideDetail]: !open,
        })}
      >
        <span className={classes.itemTxt}>{name}</span>
        {isExternalLink && <Link className={classes.linkIcon} />}
        {handleFoldNameChange && <span className={classes.arrow} />}
      </div>
    </div>
  )
}

export default ParentItem
