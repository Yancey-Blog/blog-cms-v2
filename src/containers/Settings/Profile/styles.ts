import { makeStyles, createStyles } from '@mui/styles'

const useStyles = makeStyles(() =>
  createStyles({
    input: {
      marginBottom: '40px',
      flex: 1,
    },

    profileContainer: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
    },

    customUploader: {
      marginLeft: 60,
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
