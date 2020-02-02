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
      color="secondary"
      aria-label="outlined secondary button group"
      className={classes.viewSwitcher}
    >
      {viewDate.map(val => (
        <Button key={val} onClick={() => onChange(val)}>
          {val}
        </Button>
      ))}
    </ButtonGroup>
  )
}

export default ExternalViewSwitcher
