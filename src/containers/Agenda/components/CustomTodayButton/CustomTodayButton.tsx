import React, { FC } from 'react'
import { Button } from '@material-ui/core'
import { TodayButton } from '@devexpress/dx-react-scheduler-material-ui'

const CustomTodayButton: FC<TodayButton.ButtonProps> = ({ setCurrentDate }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={() => setCurrentDate(new Date())}
  >
    Today
  </Button>
)

export default CustomTodayButton
