import { FC } from 'react'
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableMeta,
} from 'mui-datatables'
import { DeleteOutline, Edit, AddBox, UpdateOutlined } from '@material-ui/icons'
import { FormControl, Fab, Switch } from '@material-ui/core'
import { formatJSONDate } from 'yancey-js-util'
import useOpenModal from 'src/hooks/useOpenModal'
import TableWrapper from 'src/components/TableWrapper/TableWrapper'
import Loading from 'src/components/Loading/Loading'
import ConfirmPoper from 'src/components/ConfirmPoper/ConfirmPoper'
import Move from 'src/components/Move/Move'
import ImagePopup from 'src/components/ImagePopup/ImagePopup'
import useStyles from 'src/shared/globalStyles'
import { TABLE_OPTIONS } from 'src/shared/constants'
import CoverModal from './CoverModal'
import { ICover } from '../types'

interface Props {
  dataSource: ICover[]
  isFetching: boolean
  isDeleting: boolean
  isExchanging: boolean
  isBatchDeleting: boolean
  isPublicingCovers: boolean
  deleteCoverById: Function
  deleteCovers: Function
  createCover: Function
  updateCoverById: Function
  exchangePosition: Function
  publicCovers: Function
}

const CoverTable: FC<Props> = ({
  dataSource,
  deleteCoverById,
  deleteCovers,
  createCover,
  updateCoverById,
  exchangePosition,
  publicCovers,
  isFetching,
  isDeleting,
  isExchanging,
  isBatchDeleting,
  isPublicingCovers,
}) => {
  const { open, handleOpen } = useOpenModal()

  const classes = useStyles()

  const columns: MUIDataTableColumn[] = [
    { name: '_id', label: 'Id' },
    { name: 'weight', label: 'Weight' },
    { name: 'title', label: 'title' },
    {
      name: 'coverUrl',
      label: 'Cover Url',
      options: {
        customBodyRender: (value: string, tableMeta: MUIDataTableMeta) => {
          const curName = tableMeta.rowData[2]
          return <ImagePopup imgName={curName} imgUrl={value} />
        },
      },
    },
    {
      name: 'isPublic',
      label: 'Is Public',
      options: {
        // @ts-ignore
        customBodyRender: (value: boolean, tableMeta: MUIDataTableMeta) => {
          const id = tableMeta.rowData[0]

          return (
            <Switch
              checked={value}
              onChange={(e) => {
                updateCoverById({
                  variables: { input: { isPublic: e.target.checked, id } },
                  optimisticResponse: {
                    __typename: 'Mutation',
                    updateCoverById: {
                      id,
                      __typename: 'CoverModel',
                      isPublic: e.target.checked,
                    },
                  },
                })
              }}
            />
          )
        },
      },
    },
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
                  onOk={() => deleteCoverById({ variables: { id: curId } })}
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
        <div>
          <Fab size="medium" className={classes.addIconFab}>
            <ConfirmPoper onOk={() => deleteCovers({ variables: { ids } })}>
              <DeleteOutline />
            </ConfirmPoper>
          </Fab>
          <Fab size="medium" className={classes.addIconFab}>
            <UpdateOutlined
              onClick={() => publicCovers({ variables: { ids } })}
            />
          </Fab>
        </div>
      )
    },
  }

  return (
    <>
      <TableWrapper tableName="Cover" icon="save">
        <MUIDataTable
          title=""
          data={dataSource}
          columns={columns}
          options={options}
        />
        {(isFetching ||
          isDeleting ||
          isBatchDeleting ||
          isExchanging ||
          isPublicingCovers) && <Loading />}
      </TableWrapper>

      <CoverModal
        open={open}
        handleOpen={handleOpen}
        createCover={createCover}
        updateCoverById={updateCoverById}
      />
    </>
  )
}

export default CoverTable
