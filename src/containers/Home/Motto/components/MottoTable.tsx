import React, { FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
} from 'mui-datatables'
import { DeleteOutline, Edit, AddBox } from '@material-ui/icons'
import { FormControl, Fab } from '@material-ui/core'
import { formatDate, stringfySearch } from 'src/shared/utils'
import TableWrapper from 'src/components/TableWrapper/TableWrapper'
import Loading from 'src/components/Loading/Loading'
import ConfirmPoper from 'src/components/ConfirmPoper/ConfirmPoper'
import Move from 'src/components/Move/Move'
import useStyles from 'src/shared/styles'
import { IMotto } from '../types'

interface Props {
  dataSource: IMotto[]
  isFetching: boolean
  isDeleting: boolean
  isExchanging: boolean
  isBatchDeleting: boolean
  deleteMottoById: Function
  deleteMottos: Function
  exchangePosition: Function
}

const MottoTable: FC<Props> = ({
  dataSource,
  deleteMottoById,
  deleteMottos,
  exchangePosition,
  isFetching,
  isDeleting,
  isExchanging,
  isBatchDeleting,
}) => {
  const history = useHistory()
  const { pathname } = useLocation()
  const showModal = (id?: string) => {
    history.push({ pathname, search: stringfySearch({ id, showModal: true }) })
  }

  const classes = useStyles()

  const columns: MUIDataTableColumn[] = [
    { name: '_id', label: 'Id' },
    { name: 'weight', label: 'Weight' },
    { name: 'content', label: 'Content' },
    {
      name: 'createdAt',
      label: 'CreatedAt',
      options: {
        customBodyRender: (value: string) => <span>{formatDate(value)}</span>,
      },
    },
    {
      name: 'updatedAt',
      label: 'UpdatedAt',
      options: {
        customBodyRender: (value: string) => <span>{formatDate(value)}</span>,
      },
    },
    {
      name: 'action',
      label: 'Action',
      options: {
        filter: false,
        customBodyRender(value, tableMeta) {
          const curId = tableMeta.rowData[0]

          return (
            <>
              <FormControl>
                <Edit
                  className={classes.editIcon}
                  onClick={() => showModal(curId)}
                />
              </FormControl>
              <FormControl>
                <ConfirmPoper
                  onOk={() => deleteMottoById({ variables: { id: curId } })}
                >
                  <DeleteOutline className={classes.editIcon} />
                </ConfirmPoper>
              </FormControl>

              <Move
                dataSource={dataSource}
                tableMeta={tableMeta}
                exchangePosition={exchangePosition}
              />
            </>
          )
        },
      },
    },
  ]

  const options: MUIDataTableOptions = {
    filterType: 'textField',
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 50],
    searchPlaceholder: 'Search...',
    customToolbar() {
      return (
        <Fab size="medium" className={classes.addIconFab}>
          <AddBox onClick={() => showModal()} />
        </Fab>
      )
    },
    customToolbarSelect(selectedRows) {
      const ids = selectedRows.data.map(
        (row: { index: number; dataIndex: number }) =>
          dataSource[row.index]._id,
      )
      return (
        <Fab size="medium" className={classes.addIconFab}>
          <ConfirmPoper onOk={() => deleteMottos({ variables: { ids } })}>
            <DeleteOutline />
          </ConfirmPoper>
        </Fab>
      )
    },
  }

  return (
    <TableWrapper tableName="Motto" icon="save">
      <MUIDataTable
        title=""
        data={dataSource}
        columns={columns}
        options={options}
      />
      {(isFetching || isDeleting || isBatchDeleting || isExchanging) && (
        <Loading />
      )}
    </TableWrapper>
  )
}

export default MottoTable
