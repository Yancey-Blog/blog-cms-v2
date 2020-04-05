import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
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
