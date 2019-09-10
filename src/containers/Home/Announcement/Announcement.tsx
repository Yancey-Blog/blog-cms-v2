import React, { FC, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'typesafe-actions'
import {
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  deleteAnnouncements,
} from 'stores/announcement/actions'
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
} from 'mui-datatables'
import { DeleteOutline, Edit, AddBox } from '@material-ui/icons'
import { FormControl, Fab } from '@material-ui/core'
import TableWrapper from 'components/TableWrapper/TableWrapper'
import Poppers from 'components/Poppers/Poppers'
import Loading from 'components/Loading/Loading'
import Modal from './components/Modal/Modal'
import { formatISODate } from 'shared/utils'
import styles from './Announcement.module.scss'

const mapStateToProps = (state: RootState) => {
  const {
    announcements: { announcements },
  } = state

  return {
    announcements: announcements.allIds.map(id => announcements.byId[id]),
    byId: announcements.byId,
    isFetching: announcements.isFetching,
  }
}

const mapDispatchToProps = {
  getAnnouncements: getAnnouncements.request,
  addAnnouncement: addAnnouncement.request,
  updateAnnouncement: updateAnnouncement.request,
  deleteAnnouncement: deleteAnnouncement.request,
  deleteAnnouncements: deleteAnnouncements.request,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

const Announcement: FC<Props> = ({
  isFetching,
  announcements,
  byId,
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  deleteAnnouncements,
}) => {
  useEffect(() => {
    getAnnouncements()
  }, [getAnnouncements])

  const [curId, setCurId] = useState('')
  // const [curIds, setCurIds] = useState<string[]>([])

  // Form
  const [announcementValue, setAnnouncementValue] = useState('')
  const handleAnnouncementChange = (e: any) => {
    setAnnouncementValue(e.target.value)
  }

  // Modal
  const [open, setOpen] = useState(false)
  const onModalOpen = (id?: string) => {
    setOpen(true)
    if (id) {
      setCurId(id)
      setAnnouncementValue(byId[id].announcement)
    }
  }
  const onModalClose = () => {
    setCurId('')
    setOpen(false)
    setAnnouncementValue('')
  }
  const onModalSubmit = () => {
    if (curId) {
      updateAnnouncement({ id: curId, announcement: announcementValue })
    } else {
      addAnnouncement({ announcement: announcementValue })
    }
    onModalClose()
  }

  // Popper
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handlePoperClick = (
    event: React.MouseEvent<HTMLElement>,
    id: string,
  ) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
    setCurId(id)
  }
  const onPopperClose = () => {
    setAnchorEl(null)
    setCurId('')
  }
  const onDeleteARow = () => {
    deleteAnnouncement({ id: curId })
    onPopperClose()
  }

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
                  onClick={() => onModalOpen(tableMeta.rowData[0])}
                />
              </FormControl>
              <FormControl>
                <DeleteOutline
                  onClick={(e: any) =>
                    handlePoperClick(e, tableMeta.rowData[0])
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
          <AddBox className={styles.addIcon} onClick={() => onModalOpen()} />
        </Fab>
      )
    },
    onRowsDelete(onRowsSelect) {
      // @ts-ignore
      const ids = onRowsSelect.data.map(row => announcements[row.index]._id)
      deleteAnnouncements({ ids })
    },
    customToolbarSelect() {
      return (
        <Fab size='medium' className={styles.addIconFab}>
          <DeleteOutline
            className={styles.addIcon}
            onClick={(e: any) => handlePoperClick(e, '')}
          />
        </Fab>
      )
    },
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

      <Modal
        title='announcement'
        open={open}
        isAdd={!!curId}
        announcementValue={announcementValue}
        onModalClose={onModalClose}
        handleAnnouncementChange={(e: any) => handleAnnouncementChange(e)}
        onModalSubmit={onModalSubmit}
      />

      <Poppers
        title='announcement'
        anchorEl={anchorEl}
        onPopperClose={onPopperClose}
        onDeleteARow={onDeleteARow}
      />
    </>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Announcement)
