import { FC } from 'react'
import { Link } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/client'
import {
  YANCEY_BLOG_URL,
  YANCEY_GITHUB_URL,
  YANCEY_EMAIL_URL,
} from 'src/shared/constants'
import { GLOBAL_SETTING } from 'src/containers/Settings/GlobalConfig/typeDefs'
import { Query } from 'src/containers/Settings/GlobalConfig/types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 0,
      padding: '12px 24px',
      fontSize: '14px',
      textAlign: 'right',
      color: '#3c4858',
    },

    footerList: {
      padding: 0,
      listStyle: 'none',
    },

    footerItem: {
      display: 'inline-block',
      marginRight: theme.spacing(3.75),
      fontSize: '12px',
      fontWeight: 500,
      color: '#3c4858',
    },
  }),
)

const Footer: FC = () => {
  const classes = useStyles()

  const { data } = useQuery<Query>(GLOBAL_SETTING, {
    notifyOnNetworkStatusChange: true,
  })

  return (
    <footer className={classes.footer}>
      <ul className={classes.footerList}>
        <li className={classes.footerItem}>
          <Link
            href={YANCEY_BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            BLOG
          </Link>
        </li>
        <li className={classes.footerItem}>
          <Link
            href={`${YANCEY_BLOG_URL}/p/${
              data ? data.getGlobalSetting.cvPostId : ''
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            ABOUT ME
          </Link>
        </li>
        <li className={classes.footerItem}>
          <Link
            href={`${YANCEY_BLOG_URL}/p/${
              data ? data.getGlobalSetting.releasePostId : ''
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            RELEASE LOG
          </Link>
        </li>
        <li className={classes.footerItem}>
          <Link
            href={`mailto:${YANCEY_EMAIL_URL}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            EMAIL
          </Link>
        </li>
        <li className={classes.footerItem}>
          <Link
            href={YANCEY_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB
          </Link>
        </li>
      </ul>
      <p>
        {`Copyright © ${new Date().getFullYear()} Yancey Inc. and its affiliates.`}
      </p>
    </footer>
  )
}

export default Footer
