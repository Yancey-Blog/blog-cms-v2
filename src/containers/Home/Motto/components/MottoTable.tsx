import { FC } from 'react'
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
} from 'mui-datatables'
import { DeleteOutline, Edit, AddBox } from '@material-ui/icons'
import { FormControl, Fab } from '@material-ui/core'
import { formatJSONDate } from 'yancey-js-util'
import useOpenModal from 'src/hooks/useOpenModal'
import MottoModal from './MottoModal'
import TableWrapper from 'src/components/TableWrapper/TableWrapper'
import Loading from 'src/components/Loading/Loading'
import ConfirmPoper from 'src/components/ConfirmPoper/ConfirmPoper'
import Move from 'src/components/Move/Move'
import { TABLE_OPTIONS } from 'src/shared/constants'
import useStyles from 'src/shared/globalStyles'
import { IMotto } from '../types'

interface Props {
  dataSource: IMotto[]
  isFetching: boolean
  isDeleting: boolean
  isExchanging: boolean
  isBatchDeleting: boolean
  createMotto: Function
  updateMottoById: Function
  deleteMottoById: Function
  deleteMottos: Function
  exchangePosition: Function
}

const MottoTable: FC<Props> = ({
  dataSource,
  createMotto,
  deleteMottos,
  deleteMottoById,
  updateMottoById,
  exchangePosition,
  isFetching,
  isDeleting,
  isExchanging,
  isBatchDeleting,
}) => {
  const { open, handleOpen } = useOpenModal()

  const classes = useStyles()

  const columns: MUIDataTableColumn[] = [
    { name: '_id', label: 'Id' },
    { name: 'weight', label: 'Weight' },
    { name: 'content', label: 'Content' },
    {
      name: 'createdAt',
      label: 'Created At',
      options: {
        customBodyRender: (value: string) => (
          <span>{formatJSONDate(value)}</span>
        ),
      },
    },
    {
      name: 'updatedAt',
      label: 'Updated At',
      options: {
        customBodyRender: (value: string) => (
          <span>{formatJSONDate(value)}</span>
        ),
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
                  onClick={() => handleOpen(curId)}
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
    ...TABLE_OPTIONS,
    customToolbar() {
      return (
        <Fab size="medium" className={classes.addIconFab}>
          <AddBox onClick={() => handleOpen()} />
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
    <>
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

      <MottoModal
        open={open}
        handleOpen={handleOpen}
        createMotto={createMotto}
        updateMottoById={updateMottoById}
      />
    </>
  )
}

export default MottoTable
