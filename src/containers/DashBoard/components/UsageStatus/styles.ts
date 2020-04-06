import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    usageStatusContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridColumnGap: 24,
      height: 375,
    },

    paper: {
      padding: 16,
    },

    cpuWrapper: {
      gridTemplateColumns: '2fr 1fr',
      marginTop: 60,
    },
  }),
)

export default useStyles
