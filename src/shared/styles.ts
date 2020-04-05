import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addIconFab: {
      boxShadow: 'none!important',
      background: 'none!important',
      color: 'rgba(0, 0, 0, 0.54)',
    },

    uploaderGroup: {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(2.5),
    },

    textFieldSpace: { marginBottom: theme.spacing(2.5) },

    editIcon: {
      cursor: 'pointer',
      marginRight: theme.spacing(1),
    },
  }),
)

export default useStyles
