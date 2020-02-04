import React, { FC } from 'react'
import { Button, ButtonGroup } from '@material-ui/core'
import { viewDate } from '../../constants'
import useStyles from '../../styles'

interface IExternalViewSwitcher {
  currentViewName: string
  onChange: (val: string) => void
}

const ExternalViewSwitcher: FC<IExternalViewSwitcher> = ({ onChange }) => {
  const classes = useStyles()

  return (
    <ButtonGroup
      size="small"
      variant="outlined"
      color="primary"
      className={classes.viewSwitcher}
    >
      {viewDate.map(val => (
        <Button
          key={val}
          onClick={() => onChange(val)}
          className={classes.customBtn}
        >
          {val}
        </Button>
      ))}
    </ButtonGroup>
  )
}

export default ExternalViewSwitcher
