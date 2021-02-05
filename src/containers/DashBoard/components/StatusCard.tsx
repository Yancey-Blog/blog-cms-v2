import { FC } from 'react'
import classNames from 'classnames'
import { Card, LinearProgress, Divider } from '@material-ui/core'
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
  lighten,
} from '@material-ui/core/styles'

interface Props {
  title: string
  used: number
  total: number
  unit: string
}

const BorderLinearProgress = withStyles({
  root: {
    width: '100%',
    height: 5,
    backgroundColor: lighten('#eceff1', 0.1),
    borderRadius: 5,
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#3f51b5',
  },
})(LinearProgress)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: 16,
    },

    cardTitle: {
      marginTop: 0,
      marginBottom: 8,
      fontSize: 11,
      color: '#546e7a',
      textTransform: 'uppercase',
      fontWeight: 500,
      lineHeight: '13px',
      letterSpacing: '0.33px',
    },

    percent: {
      marginRight: 20,
      fontSize: 24,
      fontWeight: 500,
      color: '#263238',
    },

    vision: {
      display: 'flex',
      alignItems: 'center',
    },

    divider: {
      margin: '12px 0 16px',
    },

    bottomTxt: {
      fontSize: 14,
    },

    margin: {
      marginRight: 16,
    },
  }),
)

const switchUnit = (unit: string, value: number) => {
  let res = 0
  switch (true) {
    case unit === 'GB':
      res = value / 1024 / 1024 / 1024
      break
    case unit === 'MB':
      res = value / 1024 / 1024
      break
    case unit === 'KB':
      res = value / 1024
      break
    default:
      res = value
      break
  }

  return res.toFixed(2)
}

const StatusCard: FC<Props> = ({ title, used, total, unit }) => {
  const classes = useStyles()
  const percent = (used / total) * 100

  return (
    <Card className={classes.card}>
      <h3 className={classes.cardTitle}>{title}</h3>
      <div className={classes.vision}>
        <span className={classes.percent}>{Math.ceil(percent)}%</span>
        <BorderLinearProgress variant="determinate" value={percent} />
      </div>
      <Divider light className={classes.divider} />
      <p>
        <span className={classNames(classes.bottomTxt, classes.margin)}>
          Used: {switchUnit(unit, used)} {unit}
        </span>
        <span className={classes.bottomTxt}>
          Total: {switchUnit(unit, total)} {unit}
        </span>
      </p>
    </Card>
  )
}

export default StatusCard
