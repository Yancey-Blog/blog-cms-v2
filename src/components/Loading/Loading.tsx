import { FC } from 'react'
import { makeStyles, ClassNameMap } from '@mui/styles'
import { CircularProgress } from '@mui/material'

const useStyles = makeStyles({
  mask: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.4)',
    borderRadius: '4px',
    zIndex: 9999,
  },
})

const Loading: FC = () => {
  const classes: ClassNameMap = useStyles()

  return (
    <section className={classes.mask}>
      <CircularProgress />
    </section>
  )
}

export default Loading
