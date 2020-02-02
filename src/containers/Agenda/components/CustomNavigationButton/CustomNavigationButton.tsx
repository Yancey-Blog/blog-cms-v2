import React, { FC } from 'react'
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
      variant="outlined"
      color="secondary"
      onClick={onClick}
      className={classes.navigationButtonSpace}
    >
      {type}
    </Button>
  )
}

export default CustomNavigationButton
