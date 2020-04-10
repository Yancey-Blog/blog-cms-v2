import { makeStyles } from '@material-ui/core/styles'
import { DRAWER_WIDTH, FOLDER_DRAWER_WIDTH } from 'src/shared/constants'

export const transition = (props: 'margin-left' | 'transform') =>
  `${props} 300ms cubic-bezier(0.4, 0, 0.6, 1) 0ms`

const useStyles = makeStyles({
  layouts: {
    display: 'flex',
    overflowX: 'hidden',
  },

  expand: {
    marginLeft: `${DRAWER_WIDTH}px`,
    transition: transition('margin-left'),
  },

  shrink: {
    marginLeft: `${FOLDER_DRAWER_WIDTH}px`,
    transition: transition('margin-left'),
  },

  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: `calc(100% - ${DRAWER_WIDTH}px)`,
    width: `calc(100% - ${FOLDER_DRAWER_WIDTH}px)`,
    minHeight: '100vh',
  },
})

export default useStyles
