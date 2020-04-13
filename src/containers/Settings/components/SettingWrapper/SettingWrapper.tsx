import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    settingWrapper: {
      display: 'block',
      width: '100%',
    },
  }),
)

const SettingWrapper: FC = ({ children }) => {
  const classes = useStyles()

  return <section className={classes.settingWrapper}>{children}</section>
}

export default SettingWrapper
