import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    postStatistics: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gridColumnGap: 24,
      marginTop: 60,
    },

    paper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },

    list: {
      width: '100%',
    },
  }),
)

export default useStyles
