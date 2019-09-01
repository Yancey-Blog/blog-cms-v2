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
}

const Tables: FC<Props> = ({
  tableName,
  icon,
  loading,
  rows: rowData,
  columns,
  selectByRowClick,
  totalCount,
  dateColumns,
  columnOrders,
  editingStateColumnExtensions,
}) => {
  const [rows, setRows] = useState(rowData)
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

  const changeAddedRows = value => {
    const initialized = value.map(row =>
      Object.keys(row).length ? row : { name: '' },
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
      <TableWrapper tableName={tableName} icon={icon}>
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
