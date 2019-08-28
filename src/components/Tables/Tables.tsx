import React, { FC, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
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
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
  PagingPanel,
  TableFilterRow,
} from '@devexpress/dx-react-grid-material-ui'
import Loading from 'components/Loading/Loading'
import TableWrapper from 'components/TableWrapper/TableWrapper'
import {
  dateFilterOperations,
  currencyFilterOperations,
  pageSizes,
} from './constants'

// mock
import mock from './mock'

type CurrencyEditorProps = DataTypeProvider.ValueEditorProps

const FilterIcon = ({ type, ...restProps }) => {
  if (type === 'month') return <DateRange {...restProps} />
  return <TableFilterRow.Icon type={type} {...restProps} />
}

const getInputValue = (value?: string): string =>
  value === undefined ? '' : value

const CurrencyEditor = ({ onValueChange, value }: CurrencyEditorProps) => {
  const handleChange = event => {
    const { value: targetValue } = event.target
    if (targetValue.trim() === '') {
      onValueChange(undefined)
      return
    }

    onValueChange(parseInt(targetValue, 10))
  }
  return (
    <Input
      type='number'
      fullWidth={true}
      value={getInputValue(value)}
      inputProps={{
        min: 0,
        placeholder: 'Filter...',
      }}
      onChange={handleChange}
    />
  )
}

interface Props {
  loading: boolean
}

const Tables: FC<Props> = ({ loading }) => {
  const [rows] = useState(mock)
  const [columns] = useState<any[]>([
    { name: 'name', title: 'Name' },
    { name: 'sex', title: 'Sex' },
    { name: 'city', title: 'City' },
    { name: 'time', title: 'Time' },
  ])
  const [selection, setSelection] = useState<any[]>([])
  const [pageSize, setPageSize] = useState(10)
  const [dateColumns] = useState(['time'])
  const [currencyColumns] = useState(['amount'])
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
        {/* rows 接收数据源 columns 接收 */}
        <Grid rows={rows} columns={columns}>
          <DataTypeProvider
            for={dateColumns}
            availableFilterOperations={dateFilterOperations}
          />
          <DataTypeProvider
            for={currencyColumns}
            availableFilterOperations={currencyFilterOperations}
            editorComponent={CurrencyEditor}
          />
          <FilteringState defaultFilters={[]} />
          <IntegratedFiltering columnExtensions={filteringColumnExtensions} />

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
          <TableFilterRow showFilterSelector iconComponent={FilterIcon} />
          <TableSelection showSelectAll />
          <PagingPanel pageSizes={pageSizes} />
        </Grid>
        {loading && <Loading />}
      </TableWrapper>
    </Paper>
  )
}

export default Tables
