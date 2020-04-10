import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      marginBottom: theme.spacing(2.5),
      flex: 1,
    },

    profileContainer: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
    },

    customUploader: {
      margin: 44,
      width: 180,
      height: 180,
      borderRadius: '50%',

      '& img': {
        width: '100%',
        height: '100%',
      },
    },
  }),
)

export default useStyles
