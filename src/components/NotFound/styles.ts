import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  notFound: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    margin: 0,
    fontSize: 36,
    color: '#263238',
  },

  tips: {
    fontSize: 14,
    color: '#546e7a',
  },

  image: {
    margin: '64px 0',
    width: 560,

    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
})

export default useStyles
