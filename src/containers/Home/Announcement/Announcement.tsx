import React, { FC } from 'react'
import { Switch, Route } from 'react-router-dom'
import MUIDataTable, { MUIDataTableOptions, MUIDataTableColumn } from 'mui-datatables'
import { DeleteOutline, Edit, AddBox } from '@material-ui/icons'
import { FormControl, Fab } from '@material-ui/core'
import TableWrapper from '../../../components/TableWrapper/TableWrapper'
import Loading from '../../../components/Loading/Loading'
import ConfirmModal from '../../../components/ConfirmModal/ConfirmModal'
import { formatISODate } from '../../../shared/utils'
import EditModal from './components/EditModal/EditModal'
import styles from './Announcement.module.scss'

const Announcement: FC<any> = ({
  isFetching,
  announcements,
  getAnnouncements,
  deleteAnnouncement,
  deleteAnnouncements,
  push,
  pathname,
}) => {
  const match = { url: '' }

  const columns: MUIDataTableColumn[] = [
    { name: '_id', label: 'Id' },
    { name: 'announcement', label: 'Announcement' },
    {
      name: 'createdAt',
      label: 'CreatedAt',
      options: {
        customBodyRender: (value: any) => <span>{formatISODate(value)}</span>,
      },
    },
    {
      name: 'updatedAt',
      label: 'UpdatedAt',
      options: {
        customBodyRender: (value: any) => <span>{formatISODate(value)}</span>,
      },
    },
    {
      name: 'action',
      label: 'Action',
      options: {
        filter: false,
        customBodyRender(value, tableMeta) {
          return (
            <>
              <FormControl>
                <Edit
                  style={{ marginRight: '12px', cursor: 'pointer' }}
                  onClick={() => push(`${match.url}/edit/${tableMeta.rowData[0]}`)}
                />
              </FormControl>
              <FormControl>
                <DeleteOutline
                  style={{ cursor: 'pointer' }}
                  onClick={() => push(`${match.url}/delete`, tableMeta.rowData[0])}
                />
              </FormControl>
            </>
          )
        },
      },
    },
  ]

  const options: MUIDataTableOptions = {
    filterType: 'textField',
    responsive: 'stacked',
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 50],
    // @ts-ignore
    searchPlaceholder: 'Search...',
    customToolbar() {
      return (
        <Fab size="medium" className={styles.addIconFab}>
          <AddBox className={styles.addIcon} onClick={() => push(`${match.url}/create`)} />
        </Fab>
      )
    },
    customToolbarSelect(selectedRows) {
      const ids = selectedRows.data.map((row: any) => announcements[row.index]._id)
      return (
        <Fab size="medium" className={styles.addIconFab}>
          <DeleteOutline
            className={styles.addIcon}
            onClick={() => push(`${match.url}/deletes`, ids)}
          />
        </Fab>
      )
    },
  }

  const onDelete = (ids: string | string[]) => {
    if (Array.isArray(ids)) {
      deleteAnnouncements({ ids })
    } else {
      deleteAnnouncement({ id: ids })
    }
  }

  return (
    <>
      <TableWrapper tableName="Yancey Table" icon="save">
        <MUIDataTable title="" data={announcements} columns={columns} options={options} />
      </TableWrapper>
      <Switch>
        <Route
          path={[`${match.url}/deletes`, `${match.url}/delete`]}
          render={() => <ConfirmModal onSubmit={(ids: string | string[]) => onDelete(ids)} />}
        />
        <Route
          path={[`${match.url}/create`, `${match.url}/edit/:id`]}
          render={() => <EditModal />}
        />
      </Switch>
      {isFetching && <Loading />}
    </>
  )
}

export default Announcement
