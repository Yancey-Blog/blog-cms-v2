import React, { FC, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import {
  SelectionState,
  PagingState,
  IntegratedPaging,
  IntegratedSelection,
  IntegratedSorting,
  SortingState,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui'
import Loading from 'components/Loading/Loading'
import TableWrapper from 'components/TableWrapper/TableWrapper'
// import styles from './Announcement.module.scss'

// mock
import mock from './mock'

interface TableData {
  name: string
  sex: string
  city: string
  car: string
}

const Announcement: FC<any> = () => {
  const [rows] = useState(mock)
  const [columns] = useState<any[]>([
    { name: 'name', title: 'Name' },
    { name: 'sex', title: 'Sex' },
    { name: 'city', title: 'City' },
    { name: 'car', title: 'Car' },
  ])
  const [selection, setSelection] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState(10)
  const [pageSizes] = useState([10, 20, 50, 0])

  return (
    <Paper>
      <TableWrapper>
        <Grid rows={rows} columns={columns}>
          <SortingState
            defaultSorting={[{ columnName: 'name', direction: 'asc' }]}
          />
          <IntegratedSorting />
          <PagingState
            defaultCurrentPage={0}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />
          <SelectionState
            selection={selection}
            onSelectionChange={setSelection}
          />
          <IntegratedPaging />
          <IntegratedSelection />
          <Table />
          <TableHeaderRow showSortingControls />
          <TableSelection showSelectAll />
          <PagingPanel pageSizes={pageSizes} />
        </Grid>
        {loading && <Loading />}
      </TableWrapper>
    </Paper>
  )
}

export default Announcement
