import React, { FC, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { IntegratedSorting, SortingState } from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui'
// import styles from './Announcement.module.scss'

// mock
import mock from './mock'

const Announcement: FC<any> = () => {
  const [columns] = useState<any[]>([
    { name: 'name', title: 'Name' },
    { name: 'sex', title: 'Sex' },
    { name: 'city', title: 'City' },
    { name: 'car', title: 'Car' },
  ])

  const [rows] = useState(mock)

  return (
    <Paper>
      <Grid rows={rows} columns={columns}>
        <SortingState
          defaultSorting={[{ columnName: 'city', direction: 'asc' }]}
        />

        <IntegratedSorting />
        <Table />
        <TableHeaderRow showSortingControls />
      </Grid>
    </Paper>
  )
}

export default Announcement
