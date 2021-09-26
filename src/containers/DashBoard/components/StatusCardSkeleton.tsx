import { FC } from 'react'
import { Card, Skeleton } from '@mui/material'
import { makeStyles, ClassNameMap, createStyles } from '@mui/styles'

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      padding: 16,
    },

    skeleton: {
      margin: '8px 0 36px',
    },
  }),
)

const StatusCardSkeleton: FC = () => {
  const classes: ClassNameMap = useStyles()

  return (
    <Card className={classes.card}>
      <Skeleton variant="text" animation="wave" width={100} />
      <Skeleton
        variant="rectangular"
        animation="wave"
        className={classes.skeleton}
      />
      <Skeleton variant="text" animation="wave" width={200} />
    </Card>
  )
}

export default StatusCardSkeleton
