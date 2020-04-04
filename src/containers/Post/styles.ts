import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editorWrapper: {
      width: '100%',
    },

    customForm: {
      width: '600px',
    },

    txtField: {
      display: 'block',
      margin: '24px 0',
    },

    btnGroup: {
      margin: '24px 0',
      textAlign: 'right',
    },

    btn: { marginLeft: theme.spacing(1) },
  }),
)

export default useStyles
