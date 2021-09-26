import { makeStyles, createStyles } from '@mui/styles'

const useStyles = makeStyles(() =>
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
