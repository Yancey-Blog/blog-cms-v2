import React, { FC } from 'react'
import { Save } from '@material-ui/icons'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableWrapper: {
      position: 'relative',
      width: '100%',
    },

    tableIconContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: '16px',
      width: '62px',
      height: '65px',
      borderRadius: '3px',
      background: 'linear-gradient(60deg, #ec407a, #d81b60)',
      boxShadow: `0 4px 20px 0 rgba(0, 0, 0, 0.14),
        0 7px 10px -5px rgba(233, 30, 99, 0.4)`,
    },

    tableHeader: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'relative',
      top: '16px',
      zIndex: 120,
    },

    tableIcon: {
      width: '20px !important',
      height: '20px',
      color: '#ffffff',
    },

    tableTitle: {
      position: 'relative',
      top: '18px',
      margin: 0,
      marginLeft: '94px',
      fontSize: '18px',
      fontWeight: 300,
      color: '#3c4858',
    },
  }),
)

interface Props {
  tableName: string
  icon: string
}

const TableWrapper: FC<Props> = ({ children, tableName, icon }) => {
  const classes = useStyles()

  return (
    <section className={classes.tableWrapper}>
      <header className={classes.tableHeader}>
        <span className={classes.tableIconContainer}>
          <Save className={classes.tableIcon} />
        </span>
        <h2 className={classes.tableTitle}>{tableName}</h2>
      </header>
      {children}
    </section>
  )
}

export default TableWrapper
