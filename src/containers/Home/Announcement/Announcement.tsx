import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'typesafe-actions'
import MaterialTable from 'material-table'

import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import { formatISODate } from 'shared/utils'
import tableIcons from 'configs/tableConfig'
import {
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from 'stores/announcement/actions'
import TableWrapper from 'components/TableWrapper/TableWrapper'

const mapStateToProps = (state: RootState) => {
  const {
    announcements: { announcements },
  } = state

  return {
    announcements: announcements.allIds.map(id => announcements.byId[id]),
    isFetching: announcements.isFetching,
  }
}

const mapDispatchToProps = {
  getAnnouncements: getAnnouncements.request,
  addAnnouncement: addAnnouncement.request,
  updateAnnouncement: updateAnnouncement.request,
  deleteAnnouncement: deleteAnnouncement.request,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

const Announcement: FC<Props> = ({
  isFetching,
  announcements,
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
}) => {
  useEffect(() => {
    getAnnouncements()
  }, [getAnnouncements])

  return (
    <TableWrapper tableName='Yancey Table' icon='save'>
      <MaterialTable
        isLoading={isFetching}
        columns={[
          { field: '_id', title: 'Id' },
          { field: 'announcement', title: 'Announcement' },
          {
            field: 'createdAt',
            title: 'CreatedAt',
            render: rowData => (
              <span>{formatISODate(rowData.createdAt)}</span>
            ),
          },
          {
            field: 'updatedAt',
            title: 'UpdatedAt',
            render: rowData => (
              <span>{formatISODate(rowData.createdAt)}</span>
            ),
          },
        ]}
        data={announcements}
        icons={tableIcons}
        actions={[
          {
            icon: () => <Edit />,
            tooltip: 'Save User',
            onClick: (event, rowData) => console.log('You saved '),
          },
          {
            icon: () => <DeleteOutline />,
            tooltip: 'Delete User',
            onClick: (event, rowData) => console.log('You want to delete '),
          },
        ]}
        options={{
          showTitle: false,
          actionsColumnIndex: -1,
          filtering: true,
          exportButton: true,
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          columnsButton: true,
          // selection: true,
          grouping: true,
        }}
      />
    </TableWrapper>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Announcement)
