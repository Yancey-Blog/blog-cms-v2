import React, { FC } from 'react'
import Tables from 'components/Tables/Tables'
import styles from './Mains.module.scss'

import mock from './mock'

const tableProps = {
  loading: false,
  rows: mock,
  columns: [
    { name: 'drag', title: 'Drag' },
    { name: 'name', title: 'Name' },
    { name: 'sex', title: 'Sex' },
    { name: 'city', title: 'City' },
    { name: 'time', title: 'Time' },
    { name: 'amount', title: 'Amount' },
  ],
  sorts: [{ columnName: 'name', direction: 'asc' }],
  selectByRowClick: false,
  totalCount: mock.length,
}

const Mains: FC = () => {
  return (
    <main className={styles.main}>
      <Tables {...tableProps} />
    </main>
  )
}

export default Mains
