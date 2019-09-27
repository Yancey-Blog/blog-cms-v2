import React, { FC } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './TableWrapper.module.scss'

interface Props {
  tableName: string
  icon: string
}

const TableWrapper: FC<Props> = ({ children, tableName, icon }) => (
  <section className={styles.tableWrapper}>
    <header className={styles.tableHeader}>
      <span className={styles.tableIconContainer}>
        <FontAwesomeIcon icon={icon as IconProp} className={styles.tableIcon} />
      </span>
      <h2 className={styles.tableTitle}>{tableName}</h2>
    </header>
    {children}
  </section>
)

export default TableWrapper
