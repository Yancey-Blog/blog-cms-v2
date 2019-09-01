import React, { FC } from 'react'
import Tables from 'components/Tables/Tables'
import styles from './Mains.module.scss'

import mock from './mock'

const tableProps = {
  tableName: 'Yancey Demo Table',
  icon: 'save',
  loading: false,
  rows: mock,
  columns: [
    { name: 'name', title: 'Name' },
    { name: 'city', title: 'City' },
    { name: 'time', title: 'Time' },
    { name: 'amount', title: 'Amount' },
  ],
  selectByRowClick: false,
  totalCount: mock.length,
  dateColumns: ['time'],
  columnOrders: ['name', 'sex', 'city', 'time', 'amount'],
  editingStateColumnExtensions: [{ columnName: 'time', editingEnabled: false }],
}

const Mains: FC = () => {
  return (
    <main className={styles.main}>
      <Tables {...tableProps} />
    </main>
  )
}

export default Mains
