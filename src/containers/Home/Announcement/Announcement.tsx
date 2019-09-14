import React, { FC, useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
} from 'mui-datatables'
import { DeleteOutline, Edit, AddBox } from '@material-ui/icons'
import { FormControl, Fab } from '@material-ui/core'
import TableWrapper from 'components/TableWrapper/TableWrapper'
import Loading from 'components/Loading/Loading'
import EditModal from './components/EditModal/EditModal'
import ConfirmModal from '../../../components/ConfirmModal/ConfirmModal'
import { formatISODate } from 'shared/utils'
import { Props } from './Announcement.connect'
import styles from './Announcement.module.scss'

const Announcement: FC<Props> = ({
  isFetching,
  announcements,
  byId,
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  deleteAnnouncements,
  push,
  pathname,
}) => {
  // Form
  const [announcementValue, setAnnouncementValue] = useState('')
  const handleAnnouncementChange = (e: any) => {
    setAnnouncementValue(e.target.value)
  }

  // EditModal
  const [curId, setCurId] = useState('')
  const [editModalOpen, setEditModalOpen] = useState(false)
  const handleEditModal = (id?: string) => {
    setEditModalOpen(!editModalOpen)
    if (id) {
      setCurId(id)
      setAnnouncementValue(byId[id].announcement)
    } else {
      setCurId('')
      setAnnouncementValue('')
    }
  }
  const onModalSubmit = () => {
    if (curId) {
      updateAnnouncement({ id: curId, announcement: announcementValue })
    } else {
      addAnnouncement({ announcement: announcementValue })
    }
    handleEditModal()
  }

  useEffect(() => {
    if (pathname === '/home/announcement') {
      getAnnouncements()
    }
  }, [getAnnouncements, pathname])

  const columns: MUIDataTableColumn[] = [
    { name: '_id', label: 'Id' },
    { name: 'announcement', label: 'Announcement' },
    {
      name: 'createdAt',
      label: 'CreatedAt',
      options: {
        customBodyRender: value => <span>{formatISODate(value)}</span>,
      },
    },
    {
      name: 'updatedAt',
      label: 'UpdatedAt',
      options: {
        customBodyRender: value => <span>{formatISODate(value)}</span>,
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
                  style={{ marginRight: '10px' }}
                  onClick={() => handleEditModal(tableMeta.rowData[0])}
                />
              </FormControl>
              <FormControl>
                <DeleteOutline
                  onClick={(e: any) =>
                    push('/home/announcement/delete', tableMeta.rowData[0])
                  }
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
        <Fab size='medium' className={styles.addIconFab}>
          <AddBox
            className={styles.addIcon}
            onClick={() => handleEditModal()}
          />
        </Fab>
      )
    },
    customToolbarSelect(selectedRows) {
      // @ts-ignore
      const ids = selectedRows.data.map(row => announcements[row.index]._id)
      return (
        <Fab size='medium' className={styles.addIconFab}>
          <DeleteOutline
            className={styles.addIcon}
            onClick={() => push('/home/announcement/delete', ids)}
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
      <TableWrapper tableName='Yancey Table' icon='save'>
        <MUIDataTable
          title=''
          data={announcements}
          columns={columns}
          options={options}
        />
        {isFetching && <Loading />}
      </TableWrapper>

      <Switch>
        <Route
          path='/home/announcement/delete'
          render={() => (
            <ConfirmModal
              onSubmit={(ids: string | string[]) => onDelete(ids)}
            />
          )}
        />
      </Switch>

      <EditModal
        title='announcement'
        open={editModalOpen}
        isAdd={!!curId}
        announcementValue={announcementValue}
        handleAnnouncementChange={(e: any) => handleAnnouncementChange(e)}
        onClose={handleEditModal}
        onSubmit={onModalSubmit}
      />
    </>
  )
}

export default Announcement
