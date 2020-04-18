import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { OSS_CMS_PATH } from 'src/shared/constants'
import useStyles from './styles'

const NotFound: FC = () => {
  const classes = useStyles()
  const history = useHistory()

  const toHomePage = () => {
    history.push('/')
  }

  return (
    <section className={classes.notFound}>
      <h1 className={classes.header}>
        404: The page you are looking for isn’t here
      </h1>
      <p className={classes.tips}>
        You either tried some shady route or you came here by mistake. Whichever
        it is, try using the navigation.
      </p>
      <figure className={classes.image}>
        <img src={`${OSS_CMS_PATH}/404.svg`} alt="404-logo" />
      </figure>
      <Button variant="outlined" color="primary" onClick={toHomePage}>
        Back to Home
      </Button>
    </section>
  )
}

export default NotFound
