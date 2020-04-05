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
  }),
)

export default useStyles
