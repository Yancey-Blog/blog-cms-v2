import { makeStyles, createStyles } from '@mui/styles'

const useStyles = makeStyles(() =>
  createStyles({
    avatarUploader: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      width: '128px',
      height: '128px',
    },

    addBtn: {
      width: '48px',
      height: '48px',
    },

    customInput: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      opacity: 0,
      cursor: 'pointer',
    },

    img: {
      width: '114px',
      height: '114px',
      objectFit: 'cover',
    },

    simpleUploader: {
      marginLeft: '24px',
    },

    simpleContent: {
      position: 'absolute',
      marginTop: '10px',
    },

    customLoadingCircle: {
      position: 'absolute',
    },
  }),
)

export default useStyles
