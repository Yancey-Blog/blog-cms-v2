import { FC } from 'react'
import { Card } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: 16,
      boxShadow:
        'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px',
      borderRadius: 16,
    },

    skeleton: {
      margin: '8px 0 36px',
    },
  }),
)

const StatusCardSkeleton: FC = () => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <Skeleton variant="text" animation="wave" width={100} />
      <Skeleton variant="rect" animation="wave" className={classes.skeleton} />
      <Skeleton variant="text" animation="wave" width={200} />
    </Card>
  )
}

export default StatusCardSkeleton
