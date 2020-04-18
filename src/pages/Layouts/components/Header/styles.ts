import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: '12px 24px 48px',
    background: 'transparent',
    boxShadow: 'none',
  },
  fabIcon: {
    color: '#999',
    backgroundColor: '#fff',
    boxShadow: `0 2px 2px 0 rgba(153, 153, 153, 0.14),
        0 3px 1px -2px rgba(153, 153, 153, 0.2),
        0 1px 5px 0 rgba(153, 153, 153, 0.12)`,
    '&:hover': { backgroundColor: '#fff' },
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },

  title: {
    marginLeft: '24px',
    color: '#000',
  },

  marginRight: {
    marginRight: '24px',
  },

  anchor: {
    color: '#000',

    '&:hover': {
      textDecoration: 'none',
    },
  },

  menu: {
    '& .MuiListItemIcon-root': {
      minWidth: 42,
    },
  },
})

export default useStyles
