import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dashboradWrapper: {
      width: '100%',
    },

    group: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gridColumnGap: 24,
      gridTemplateRows: '375px 375px 375px',
      gridRowGap: 24,
      marginBottom: 24,
    },
  }),
)

export default useStyles
