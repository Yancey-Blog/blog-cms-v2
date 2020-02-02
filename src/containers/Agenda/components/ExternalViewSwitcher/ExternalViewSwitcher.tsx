import React, { FC } from 'react'
import { Button, ButtonGroup } from '@material-ui/core'
import { viewDate } from '../../constants'

interface IExternalViewSwitcher {
  currentViewName: string
  onChange: (val: string) => void
}

const ExternalViewSwitcher: FC<IExternalViewSwitcher> = ({ onChange }) => (
  <ButtonGroup color="secondary" aria-label="outlined secondary button group">
    {viewDate.map(val => (
      <Button key={val} onClick={() => onChange(val)}>
        {val}
      </Button>
    ))}
  </ButtonGroup>
)

export default ExternalViewSwitcher
