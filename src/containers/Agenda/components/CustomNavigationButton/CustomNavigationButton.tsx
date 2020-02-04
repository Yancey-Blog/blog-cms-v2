import React, { FC } from 'react'
import classNames from 'classnames'
import { Button } from '@material-ui/core'
import { DateNavigator } from '@devexpress/dx-react-scheduler-material-ui'
import useStyles from '../../styles'

const CustomNavigationButton: FC<DateNavigator.NavigationButtonProps> = ({
  type,
  onClick,
}) => {
  const classes = useStyles()

  return (
    <Button
      size="small"
      color="primary"
      variant="contained"
      onClick={onClick}
      className={classNames(classes.navigationButtonSpace, classes.customBtn)}
    >
      {type === 'forward' ? 'next' : type}
    </Button>
  )
}

export default CustomNavigationButton
