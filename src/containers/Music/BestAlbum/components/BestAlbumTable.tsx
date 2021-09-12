import { FC } from 'react'
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableMeta,
} from 'mui-datatables'
import { DeleteOutline, Edit, AddBox } from '@material-ui/icons'
import { FormControl, Fab, Button } from '@material-ui/core'
import { formatJSONDate } from 'yancey-js-util'
import useOpenModal from 'src/hooks/useOpenModal'
import TableWrapper from 'src/components/TableWrapper/TableWrapper'
import Loading from 'src/components/Loading/Loading'
import ConfirmPoper from 'src/components/ConfirmPoper/ConfirmPoper'
import ImagePopup from 'src/components/ImagePopup/ImagePopup'
import { TABLE_OPTIONS } from 'src/shared/constants'
import useStyles from 'src/shared/globalStyles'
import BestAlbumModal from './BestAlbumModal'
import { IBestAlbum } from '../types'

interface Props {
  dataSource: IBestAlbum[]
  isFetching: boolean
  isDeleting: boolean
  isBatchDeleting: boolean
  createBestAlbum: Function
  updateBestAlbumById: Function
  deleteBestAlbumById: Function
  deleteBestAlbums: Function
}

const BestAlbumTable: FC<Props> = ({
  dataSource,
  createBestAlbum,
  updateBestAlbumById,
  deleteBestAlbumById,
  deleteBestAlbums,
  isFetching,
  isDeleting,
  isBatchDeleting,
}) => {
  const { open, handleOpen } = useOpenModal()

  const classes = useStyles()

  const columns: MUIDataTableColumn[] = [
    { name: '_id', label: 'ID' },
    { name: 'title', label: 'Title' },
    { name: 'artist', label: 'Artist' },
    {
      name: 'mvUrl',
      label: 'Mv Url',
      options: {
        customBodyRender: (value: string) => (
          <Button
            href={value}
            color="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {value.slice(0, 20)}...
          </Button>
        ),
      },
    },
    {
      name: 'coverUrl',
      label: 'Cover Url',
      options: {
        customBodyRender: (value: string, tableMeta: MUIDataTableMeta) => {
          const curName = tableMeta.rowData[1]
          return <ImagePopup imgName={curName} imgUrl={value} />
        },
      },
    },
    {
      name: 'releaseDate',
      label: 'Release Date',
      options: {
        customBodyRender: (value: string) => (
          <span>{formatJSONDate(value)}</span>
        ),
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
                  onOk={() => deleteBestAlbumById({ variables: { id: curId } })}
                >
                  <DeleteOutline />
                </ConfirmPoper>
              </FormControl>
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
          <ConfirmPoper onOk={() => deleteBestAlbums({ variables: { ids } })}>
            <DeleteOutline />
          </ConfirmPoper>
        </Fab>
      )
    },
  }

  return (
    <>
      <TableWrapper tableName="Best Album" icon="save">
        <MUIDataTable
          title=""
          data={dataSource}
          columns={columns}
          options={options}
        />
        {(isFetching || isDeleting || isBatchDeleting) && <Loading />}
      </TableWrapper>

      <BestAlbumModal
        open={open}
        handleOpen={handleOpen}
        createBestAlbum={createBestAlbum}
        updateBestAlbumById={updateBestAlbumById}
      />
    </>
  )
}

export default BestAlbumTable
