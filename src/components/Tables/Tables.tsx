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
  PUT: Function
  DELETE: Function
  BATCHDELETE: Function
}

const Tables: FC<Props> = ({
  tableName,
  icon,
  loading,
  rows,
  columns,
  selectByRowClick,
  totalCount,
  dateColumns,
  columnOrders,
  editingStateColumnExtensions,

  POST,
  PUT,
  DELETE,
  BATCHDELETE,
}) => {
  const [selection, setSelection] = useState<ReactText[]>([])
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [editingRowIds, setEditingRowIds] = useState([])
  const [addedRows, setAddedRows] = useState([])
  const [rowChanges, setRowChanges] = useState({})
  const [columnOrder, setColumnOrder] = useState(columnOrders)

  const changeAddedRows = (value: any) => {
    setAddedRows(value)
  }

  const handleBatchDeleteChange = () => {
    BATCHDELETE(selection)
    setSelection([])
  }

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      POST(added)
    }
    if (changed) {
      const id = Object.keys(changed)[0]
      const params = Object.values(changed)[0]
      PUT(id, params)
    }
    if (deleted) {
      DELETE(deleted)
    }
  }

  return (
    <Paper>
      <TableWrapper tableName={tableName} icon={icon}>
        <Grid rows={rows} columns={columns} getRowId={getRowId}>
          <EditingState
            editingRowIds={editingRowIds}
            // @ts-ignore
            onEditingRowIdsChange={setEditingRowIds}
            addedRows={addedRows}
            onAddedRowsChange={changeAddedRows}
            rowChanges={rowChanges}
            onRowChangesChange={setRowChanges}
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
          <IntegratedFiltering />
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
          <TableColumnVisibility />
          <Toolbar />
          <SearchPanel />
          <ColumnChooser />
          <BatchDelete
            length={selection.length}
            onClick={handleBatchDeleteChange}
          />
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
