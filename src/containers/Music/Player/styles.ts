import { makeStyles, createStyles } from '@mui/styles'

const useStyles = makeStyles(() =>
  createStyles({
    lrcTxt: {
      margin: 0,
      padding: '16px',
      fontFamily: 'inherit',
    },

    btnUploaderGroup: {
      margin: '40px 0',
    },
  }),
)

export default useStyles
