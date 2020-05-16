import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editorWrapper: {
      marginTop: '8px',
      width: '100%',
    },

    header: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    publishTools: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },

    summary: { width: '50%', margin: '24px 0 48px' },

    summaryTxtFiled: {
      marginBottom: '24px',
    },

    btn: { marginLeft: theme.spacing(1), marginBottom: theme.spacing(1) },

    pagination: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '24px',
    },

    uploadImageIcon: {
      position: 'relative',
      top: '-4px',
    },

    search: {
      position: 'absolute',
      right: '24px',
      top: '83px',
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
      zIndex: 1101,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
)

export default useStyles
