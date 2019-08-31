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
  // Sorting,
  CustomPaging,
  EditingState,
  SearchState,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
  PagingPanel,
  TableFilterRow,
  DragDropProvider,
  TableColumnVisibility,
  Toolbar,
  ColumnChooser,
  TableEditRow,
  TableEditColumn,
  SearchPanel,
  TableColumnReordering,
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

const getHiddenColumnsFilteringExtensions = hiddenColumnNames =>
  hiddenColumnNames.map(columnName => ({
    columnName,
    predicate: () => false,
  }))

interface Props {
  loading: boolean
  rows: any[]
  columns: Column[]
  sorts: any[] // FIXME: sorts 的类型写成 Sorting[] 报错, 很迷
  selectByRowClick: boolean // 当此属性为 true 时点击行的任意位置都可选中，默认 false
  totalCount: number
}

const defaultCurrentPage = 0
const defaultPageSize = 10
const pageSizes = [10, 20, 50, 0]

const Tables: FC<Props> = ({
  loading,
  rows: rowData,
  columns,
  sorts,
  selectByRowClick,
  totalCount,
}) => {
  const [rows, setRows] = useState(rowData)
  const [selection, setSelection] = useState<any[]>([])

  const [currentPage, setCurrentPage] = useState(defaultCurrentPage)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  const [dateColumns] = useState(['time'])

  const [defaultHiddenColumnNames] = useState([])
  const [filteringColumnExtensions, setFilteringColumnExtensions] = useState(
    getHiddenColumnsFilteringExtensions(defaultHiddenColumnNames),
  )
  const onHiddenColumnNamesChange = hiddenColumnNames =>
    setFilteringColumnExtensions(
      getHiddenColumnsFilteringExtensions(hiddenColumnNames),
    )

  const [editingStateColumnExtensions] = useState([
    { columnName: 'time', editingEnabled: false },
  ])

  const [editingRowIds, setEditingRowIds] = useState([])
  const [addedRows, setAddedRows] = useState([])
  const [rowChanges, setRowChanges] = useState({})

  const [columnOrder, setColumnOrder] = useState([
    'name',
    'sex',
    'city',
    'time',
    'amount',
  ])

  const changeAddedRows = value => {
    const initialized = value.map(row =>
      Object.keys(row).length ? row : { name: 'Anna' },
    )
    setAddedRows(initialized)
  }

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ]
    }
    if (changed) {
      changedRows = rows.map(row =>
        changed[row.id] ? { ...row, ...changed[row.id] } : row,
      )
    }
    if (deleted) {
      const deletedSet = new Set(deleted)
      changedRows = rows.filter(row => !deletedSet.has(row.id))
    }
    setRows(changedRows)
  }

  return (
    <Paper>
      <TableWrapper tableName='Simple Table' icon='save'>
        <Grid rows={rows} columns={columns} getRowId={getRowId}>
          <EditingState
            editingRowIds={editingRowIds}
            // @ts-ignore
            onEditingRowIdsChange={setEditingRowIds}
            rowChanges={rowChanges}
            onRowChangesChange={setRowChanges}
            addedRows={addedRows}
            onAddedRowsChange={changeAddedRows}
            // @ts-ignore
            onCommitChanges={commitChanges}
            columnExtensions={editingStateColumnExtensions}
          />
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
          <SearchState defaultValue='' />
          <CustomPaging totalCount={totalCount} />
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
          <TableColumnReordering
            order={columnOrder}
            onOrderChange={setColumnOrder}
          />
          <TableHeaderRow showSortingControls />
          <TableEditRow />
          <TableEditColumn
            showAddCommand={!addedRows.length}
            showEditCommand
            showDeleteCommand
          />
          <TableColumnVisibility
            defaultHiddenColumnNames={defaultHiddenColumnNames}
            onHiddenColumnNamesChange={onHiddenColumnNamesChange}
          />
          <Toolbar />
          <SearchPanel />
          <ColumnChooser />
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
