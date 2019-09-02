import React, { FC, useState, ReactText } from 'react'
import Paper from '@material-ui/core/Paper'
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
import {
  dateFilterOperations,
  defaultCurrentPage,
  defaultPageSize,
  pageSizes,
} from './constants'
import {
  CustomEditorColumnTxt,
  BatchDelete,
  FilterIcon,
  DateFormatter,
  getHiddenColumnsFilteringExtensions,
  getRowId,
  CustomEditorColumn,
} from './Custom'

interface Props {
  tableName: string
  icon: string
  loading: boolean
  rows: any[]
  columns: Column[]
  selectByRowClick: boolean
  totalCount: number
  dateColumns: string[]
  columnOrders: string[]
  editingStateColumnExtensions: EditingState.ColumnExtension[]

  POST: Function
}

const Tables: FC<Props> = ({
  tableName,
  icon,
  loading,
  rows: rowsData,
  columns,
  selectByRowClick,
  totalCount,
  dateColumns,
  columnOrders,
  editingStateColumnExtensions,

  POST,
}) => {
  const [rows, setRows] = useState(rowsData)
  const [selection, setSelection] = useState<ReactText[]>([])
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [defaultHiddenColumnNames] = useState([])
  const [filteringColumnExtensions, setFilteringColumnExtensions] = useState(
    getHiddenColumnsFilteringExtensions(defaultHiddenColumnNames),
  )
  const onHiddenColumnNamesChange = hiddenColumnNames =>
    setFilteringColumnExtensions(
      getHiddenColumnsFilteringExtensions(hiddenColumnNames),
    )
  const [editingRowIds, setEditingRowIds] = useState([])
  const [addedRows, setAddedRows] = useState([])
  const [rowChanges, setRowChanges] = useState({})
  const [columnOrder, setColumnOrder] = useState(columnOrders)

  const changeAddedRows = (value: any) => {
    setAddedRows(value)
  }

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      POST(addedRows)
    }
    if (changed) {
      // changedRows = rows.map(row =>
      //   changed[row._id] ? { ...row, ...changed[row._id] } : row,
      // )
    }
    if (deleted) {
      // const deletedSet = new Set(deleted)
      // changedRows = rows.filter(row => !deletedSet.has(row._id))
    }
    // setRows(changedRows)
  }

  return (
    <Paper>
      <TableWrapper tableName={tableName} icon={icon}>
        <Grid rows={rowsData} columns={columns} getRowId={getRowId}>
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
          <SortingState />
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
            commandComponent={CustomEditorColumnTxt}
          />
          <CustomEditorColumn />
          <TableColumnVisibility
            defaultHiddenColumnNames={defaultHiddenColumnNames}
            onHiddenColumnNamesChange={onHiddenColumnNamesChange}
          />
          <Toolbar />
          <SearchPanel />
          <ColumnChooser />
          <BatchDelete length={selection.length} />
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
