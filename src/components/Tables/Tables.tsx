import React, { FC, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import DateRange from '@material-ui/icons/DateRange'
import {
  SelectionState,
  PagingState,
  IntegratedPaging,
  IntegratedSelection,
  IntegratedSorting,
  SortingState,
  DataTypeProvider,
  IntegratedFiltering,
  FilteringState,
  Column,
  Sorting,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
  PagingPanel,
  TableFilterRow,
  DragDropProvider,
} from '@devexpress/dx-react-grid-material-ui'
import Loading from 'components/Loading/Loading'
import TableWrapper from 'components/TableWrapper/TableWrapper'
import { dateFilterOperations } from './constants'
import { formatJSONDate } from 'shared/utils'

const FilterIcon = ({ type, ...restProps }) => {
  if (type === 'month') return <DateRange {...restProps} />
  return <TableFilterRow.Icon type={type} {...restProps} />
}

const DateFormatter = ({ value }: DataTypeProvider.ValueFormatterProps) => (
  <span>{formatJSONDate(value)}</span>
)

// 将每行的 id 设置为数据源的 id，默认行 id 为「索引」
const getRowId = (row: any) => row._id

interface Props {
  loading: boolean
  rows: any[]
  columns: Column[]
  sorts: any[] // FIXME: sorts 的类型写成 Sorting[] 报错, 很迷
  selectByRowClick: boolean // 当此属性为 true 时点击行的任意位置都可选中，默认 false
}

const Tables: FC<Props> = ({
  loading,
  rows,
  columns,
  sorts,
  selectByRowClick,
}) => {
  const [selection, setSelection] = useState<any[]>([])

  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [pageSizes] = useState([10, 20, 50, 0])

  const [dateColumns] = useState(['time'])
  const [filteringColumnExtensions] = useState([
    {
      columnName: 'time',
      predicate: (value: any, filter: any, row: any) => {
        if (!filter.value.length) return true
        if (filter && filter.operation === 'month') {
          const month = parseInt(value.split('-')[1], 10)
          return month === parseInt(filter.value, 10)
        }
        return IntegratedFiltering.defaultPredicate(value, filter, row)
      },
    },
  ])

  return (
    <Paper>
      <TableWrapper tableName='Simple Table' icon='save'>
        <Grid rows={rows} columns={columns} getRowId={getRowId}>
          <FilteringState defaultFilters={[]} />
          <SortingState defaultSorting={sorts} />
          <SelectionState
            selection={selection}
            onSelectionChange={setSelection}
          />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />

          <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
          <IntegratedSorting />
          {/* Place the IntegratedSelection plugin after IntegratedPaging to */}
          {/* implement the Select All behavior within a visible page. */}
          <IntegratedPaging />
          <IntegratedSelection />

          <DataTypeProvider
            for={dateColumns}
            availableFilterOperations={dateFilterOperations}
            formatterComponent={DateFormatter}
          />
          <DragDropProvider />

          <Table />
          <TableHeaderRow showSortingControls />
          <TableFilterRow showFilterSelector iconComponent={FilterIcon} />
          <TableSelection showSelectAll selectByRowClick={selectByRowClick} />
          <PagingPanel pageSizes={pageSizes} />
        </Grid>
        {loading && <Loading />}
      </TableWrapper>
    </Paper>
  )
}

export default Tables
