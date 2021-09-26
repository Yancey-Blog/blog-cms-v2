import { FC } from 'react'
import { Button } from '@mui/material'
import { DateNavigator } from '@devexpress/dx-react-scheduler-material-ui'
import { ClassNameMap } from '@mui/styles'
import useStyles from '../styles'

const CustomOpenButton: FC<DateNavigator.OpenButtonProps> = ({
  text,
  onVisibilityToggle,
}) => {
  const classes: ClassNameMap = useStyles()

  return (
    <Button
      size="small"
      onClick={onVisibilityToggle}
      className={classes.customTitle}
    >
      {text}
    </Button>
  )
}

export default CustomOpenButton
