import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: { marginTop: 24, padding: 12, width: 450 },

    input: {
      width: 450,
    },

    searchBtn: {
      marginLeft: 24,
      verticalAlign: 'bottom',
    },

    btnGroup: {
      marginTop: 12,
      textAlign: 'right',
    },

    checkedId: {
      marginBottom: 24,
      padding: 12,
      width: 450,
      fontSize: 16,
      color: '#5f6368',
      border: '1px dotted #5f6368',
    },
  }),
)

export default useStyles
