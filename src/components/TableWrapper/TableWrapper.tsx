import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './TableWrapper.module.scss'

const TableWrapper: FC = ({ children }) => {
  return (
    <section className={styles.tableWrapper}>
      <header className={styles.tableHeader}>
        <span className={styles.tableIconContainer}>
          <FontAwesomeIcon icon='save' className={styles.tableIcon} />
        </span>
        <h2 className={styles.tableTitle}>Simple Table</h2>
      </header>
      {children}
    </section>
  )
}

export default TableWrapper
