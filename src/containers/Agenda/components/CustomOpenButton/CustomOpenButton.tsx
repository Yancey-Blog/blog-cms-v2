import React, { FC } from 'react'
import { Button } from '@material-ui/core'
import { DateNavigator } from '@devexpress/dx-react-scheduler-material-ui'
import useStyles from '../../styles'

const CustomOpenButton: FC<DateNavigator.OpenButtonProps> = ({
  text,
  onVisibilityToggle,
}) => {
  const classes = useStyles()

  return (
    <Button onClick={onVisibilityToggle} className={classes.customTitle}>
      {text}
    </Button>
  )
}

export default CustomOpenButton
