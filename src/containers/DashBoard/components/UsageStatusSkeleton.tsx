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

    firstSkeleton: {
      float: 'right',
    },

    secondSkeleton: {
      margin: '0 auto 12px',
    },
  }),
)

const UsageStatusSkeleton: FC = () => {
  const classes: ClassNameMap = useStyles()

  return (
    <Card className={classes.card}>
      <Skeleton
        variant="text"
        animation="wave"
        width={100}
        className={classes.firstSkeleton}
      />
      <Skeleton
        variant="text"
        animation="wave"
        width={240}
        className={classes.secondSkeleton}
      />
      <Skeleton variant="rectangular" animation="wave" height={310} />
    </Card>
  )
}

export default UsageStatusSkeleton
