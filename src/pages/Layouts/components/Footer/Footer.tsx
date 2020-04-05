import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

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

  return (
    <footer className={classes.footer}>
      <ul className={classes.footerList}>
        <li className={classes.footerItem}>HOME</li>
        <li className={classes.footerItem}>BLOG</li>
        <li className={classes.footerItem}>GITHUB</li>
      </ul>
      <p>
        {`Copyright © ${new Date().getFullYear()} Yancey Inc. and its affiliates.`}
      </p>
    </footer>
  )
}

export default Footer
