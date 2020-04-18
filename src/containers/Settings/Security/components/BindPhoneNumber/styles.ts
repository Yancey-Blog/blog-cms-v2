import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textBtnGroup: {
      position: 'relative',
      marginBottom: 24,
      width: 400,
    },

    getCodeBtn: {
      position: 'absolute',
      top: 14,
      right: 0,
      textTransform: 'capitalize',
    },
  }),
)

export default useStyles
