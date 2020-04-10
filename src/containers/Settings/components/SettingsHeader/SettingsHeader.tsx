import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'

interface Props {
  title: string
  subTitle: string
}

const useStyles = makeStyles({
  header: { textAlign: 'center' },

  title: {
    marginTop: 0,
    marginBottom: '8px',
    fontSize: '28px',
    fontWeight: 500,
    lineHeight: 1.3,
    color: '#202124',
  },

  subTitle: {
    marginBottom: '36px',
    fontSize: '16px',
    color: '#5f6368',
  },
})

const SettingsHeader: FC<Props> = ({ title, subTitle }) => {
  const classes = useStyles()

  return (
    <header className={classes.header}>
      <h1 className={classes.title}>{title}</h1>
      <p className={classes.subTitle}>{subTitle}</p>
    </header>
  )
}

export default SettingsHeader
