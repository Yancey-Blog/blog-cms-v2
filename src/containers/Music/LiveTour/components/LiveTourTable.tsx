import { FC } from 'react'
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableMeta,
} from 'mui-datatables'
import { ClassNameMap } from '@mui/styles'
import { DeleteOutline, Edit, AddBox } from '@mui/icons-material'
import { FormControl, Fab } from '@mui/material'
import { formatJSONDate } from 'yancey-js-util'
import useOpenModal from 'src/hooks/useOpenModal'
import TableWrapper from 'src/components/TableWrapper/TableWrapper'
import Loading from 'src/components/Loading/Loading'
import ConfirmPoper from 'src/components/ConfirmPoper/ConfirmPoper'
import ImagePopup from 'src/components/ImagePopup/ImagePopup'
import useStyles from 'src/shared/globalStyles'
import { TABLE_OPTIONS } from 'src/shared/constants'
import LiveTourModal from './LiveTourModal'
import { ILiveTour } from '../types'

interface Props {
  dataSource: ILiveTour[]
  isFetching: boolean
  isDeleting: boolean
  isBatchDeleting: boolean
  createLiveTour: Function
  updateLiveTourById: Function
  deleteLiveTourById: Function
  deleteLiveTours: Function
}

const LiveTourTable: FC<Props> = ({
  dataSource,
  createLiveTour,
  updateLiveTourById,
  deleteLiveTourById,
  deleteLiveTours,
  isFetching,
  isDeleting,
  isBatchDeleting,
}) => {
  const { open, handleOpen } = useOpenModal()

  const classes: ClassNameMap = useStyles()

  const columns: MUIDataTableColumn[] = [
    { name: '_id', label: 'Id' },
    { name: 'title', label: 'Title' },
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
      name: 'showTime',
      label: 'Show Time',
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
                  onOk={() => deleteLiveTourById({ variables: { id: curId } })}
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
          <ConfirmPoper onOk={() => deleteLiveTours({ variables: { ids } })}>
            <DeleteOutline />
          </ConfirmPoper>
        </Fab>
      )
    },
  }

  return (
    <>
      <TableWrapper tableName="Live Tour" icon="save">
        <MUIDataTable
          title=""
          data={dataSource}
          columns={columns}
          options={options}
        />
        {(isFetching || isDeleting || isBatchDeleting) && <Loading />}
      </TableWrapper>

      <LiveTourModal
        open={open}
        handleOpen={handleOpen}
        createLiveTour={createLiveTour}
        updateLiveTourById={updateLiveTourById}
      />
    </>
  )
}

export default LiveTourTable
