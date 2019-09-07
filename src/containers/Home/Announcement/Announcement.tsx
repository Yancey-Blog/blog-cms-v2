import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'typesafe-actions'
import MaterialTable from 'material-table'
import Checkbox from '@material-ui/core/Checkbox'
import { formatISO8601Date } from 'shared/utils'
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
          {
            field: undefined,
            title: (
              <Checkbox
                value='checkedA'
                inputProps={{ 'aria-label': 'Checkbox A' }}
              />
            ),
            editable: 'never',
            filtering: false,
            sorting: false,
            cellStyle: {
              width: '80px',
            },
            render: rowData => (
              <Checkbox
                value='checkedA'
                inputProps={{ 'aria-label': 'Checkbox A' }}
              />
            ),
          },
          { field: '_id', title: 'Id', editable: 'never' },
          { field: 'announcement', title: 'Announcement' },
          {
            field: 'createdAt',
            title: 'CreatedAt',
            editable: 'never',
            render: rowData => (
              <span>{rowData ? formatISO8601Date(rowData.createdAt) : ''}</span>
            ),
          },
          {
            field: 'updatedAt',
            title: 'UpdatedAt',
            editable: 'never',
            render: rowData => (
              <span>{rowData ? formatISO8601Date(rowData.updatedAt) : ''}</span>
            ),
          },
        ]}
        data={announcements}
        icons={tableIcons}
        editable={{
          async onRowAdd(newData) {
            await addAnnouncement({
              announcement: newData.announcement,
            })
          },
          async onRowUpdate(newData, oldData) {
            await updateAnnouncement({
              id: newData._id,
              announcement: newData.announcement,
            })
          },
          async onRowDelete(newData) {
            await deleteAnnouncement({
              id: newData._id,
            })
          },
        }}
        options={{
          showTitle: false,
          actionsColumnIndex: -1, 
          filtering: true,
          exportButton: true,
          grouping: true,
          pageSize: 5,
          pageSizeOptions: [5, 10, 20],
        }}
      />
    </TableWrapper>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Announcement)
