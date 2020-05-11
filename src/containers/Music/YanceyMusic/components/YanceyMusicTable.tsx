import React, { FC } from 'react'
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableMeta,
} from 'mui-datatables'
import { DeleteOutline, Edit, AddBox } from '@material-ui/icons'
import { FormControl, Fab } from '@material-ui/core'
import { sortBy } from 'yancey-js-util'
import useOpenModal from 'src/hooks/useOpenModal'
import { formatDate } from 'src/shared/utils'
import TableWrapper from 'src/components/TableWrapper/TableWrapper'
import Loading from 'src/components/Loading/Loading'
import ConfirmPoper from 'src/components/ConfirmPoper/ConfirmPoper'
import ImagePopup from 'src/components/ImagePopup/ImagePopup'
import { TABLE_OPTIONS } from 'src/shared/constants'
import useStyles from 'src/shared/globalStyles'
import YanceyMusicModal from './YanceyMusicModal'
import { IYanceyMusic } from '../types'

interface Props {
  dataSource: IYanceyMusic[]
  isFetching: boolean
  isDeleting: boolean
  isBatchDeleting: boolean
  createYanceyMusic: Function
  updateYanceyMusicById: Function
  deleteYanceyMusicById: Function
  deleteYanceyMusic: Function
}

const YanceyMusicTable: FC<Props> = ({
  dataSource,
  createYanceyMusic,
  updateYanceyMusicById,
  deleteYanceyMusicById,
  deleteYanceyMusic,
  isFetching,
  isDeleting,
  isBatchDeleting,
}) => {
  const { open, handleOpen } = useOpenModal()

  const classes = useStyles()

  const columns: MUIDataTableColumn[] = [
    { name: '_id', label: 'Id' },
    { name: 'title', label: 'Title' },
    { name: 'soundCloudUrl', label: 'SoundCloud Url' },
    {
      name: 'posterUrl',
      label: 'Poster Url',
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
        customBodyRender: (value: string) => <span>{formatDate(value)}</span>,
      },
    },
    {
      name: 'createdAt',
      label: 'Created At',
      options: {
        customBodyRender: (value: string) => <span>{formatDate(value)}</span>,
      },
    },
    {
      name: 'updatedAt',
      label: 'Updated At',
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
                  onClick={() => handleOpen(curId)}
                />
              </FormControl>
              <FormControl>
                <ConfirmPoper
                  onOk={() =>
                    deleteYanceyMusicById({ variables: { id: curId } })
                  }
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
          <ConfirmPoper onOk={() => deleteYanceyMusic({ variables: { ids } })}>
            <DeleteOutline />
          </ConfirmPoper>
        </Fab>
      )
    },
  }

  return (
    <>
      <TableWrapper tableName="Yancey Music" icon="save">
        <MUIDataTable
          title=""
          data={dataSource.sort(sortBy('updatedAt')).reverse()}
          columns={columns}
          options={options}
        />
        {(isFetching || isDeleting || isBatchDeleting) && <Loading />}
      </TableWrapper>

      <YanceyMusicModal
        open={open}
        handleOpen={handleOpen}
        createYanceyMusic={createYanceyMusic}
        updateYanceyMusicById={updateYanceyMusicById}
      />
    </>
  )
}

export default YanceyMusicTable
