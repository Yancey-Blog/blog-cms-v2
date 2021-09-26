import { makeStyles, createStyles } from '@mui/styles'

const useStyles = makeStyles(() =>
  createStyles({
    addIconFab: {
      boxShadow: 'none!important',
      background: 'none!important',
      color: 'rgba(0, 0, 0, 0.54)',
    },

    uploaderGroup: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '40px',
    },

    textFieldSpace: { marginBottom: '40px' },

    editIcon: {
      cursor: 'pointer',
      marginRight: '16px',
    },
  }),
)

export default useStyles
