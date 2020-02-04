import React, { FC } from 'react'
import { Save } from '@material-ui/icons'
import styles from './TableWrapper.module.scss'

interface Props {
  tableName: string
  icon: string
}

const TableWrapper: FC<Props> = ({ children, tableName, icon }) => (
  <section className={styles.tableWrapper}>
    <header className={styles.tableHeader}>
      <span className={styles.tableIconContainer}>
        <Save className={styles.tableIcon} />
      </span>
      <h2 className={styles.tableTitle}>{tableName}</h2>
    </header>
    {children}
  </section>
)

export default TableWrapper
