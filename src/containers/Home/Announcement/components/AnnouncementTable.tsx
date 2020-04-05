import React, { FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
} from 'mui-datatables'
import { DeleteOutline, Edit, AddBox } from '@material-ui/icons'
import { FormControl, Fab } from '@material-ui/core'
import { sortBy } from 'yancey-js-util'
import { formatDate, stringfySearch } from 'src/shared/utils'
import TableWrapper from 'src/components/TableWrapper/TableWrapper'
import Loading from 'src/components/Loading/Loading'
import ConfirmPoper from 'src/components/ConfirmPoper/ConfirmPoper'
import useStyles from 'src/assets/styles'
import { IAnnouncement } from '../types'

interface Props {
  dataSource: IAnnouncement[]
  isFetching: boolean
  isDeleting: boolean
  isBatchDeleting: boolean
  deleteAnnouncementById: Function
  deleteAnnouncements: Function
}

const AnnouncementTable: FC<Props> = ({
  dataSource,
  deleteAnnouncementById,
  deleteAnnouncements,
  isFetching,
  isDeleting,
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
                <Edit onClick={() => showModal(curId)} />
              </FormControl>
              <FormControl>
                <ConfirmPoper
                  onOk={() =>
                    deleteAnnouncementById({ variables: { id: curId } })
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
          <ConfirmPoper
            onOk={() => deleteAnnouncements({ variables: { ids } })}
          >
            <DeleteOutline />
          </ConfirmPoper>
        </Fab>
      )
    },
  }

  return (
    <TableWrapper tableName="Announcement" icon="save">
      <MUIDataTable
        title=""
        data={dataSource.sort(sortBy('updatedAt')).reverse()}
        columns={columns}
        options={options}
      />
      {(isFetching || isDeleting || isBatchDeleting) && <Loading />}
    </TableWrapper>
  )
}

export default AnnouncementTable
