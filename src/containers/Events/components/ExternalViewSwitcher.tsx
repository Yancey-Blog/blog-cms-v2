import { FC } from 'react'
import { Button, ButtonGroup } from '@mui/material'
import { ClassNameMap } from '@mui/styles'
import { VIEW_DATE } from 'src/shared/constants'
import useStyles from '../styles'

interface IExternalViewSwitcher {
  onChange: (val: string) => void
}

const ExternalViewSwitcher: FC<IExternalViewSwitcher> = ({ onChange }) => {
  const classes: ClassNameMap = useStyles()

  return (
    <ButtonGroup
      size="small"
      variant="outlined"
      color="primary"
      className={classes.viewSwitcher}
    >
      {VIEW_DATE.map((val) => (
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
