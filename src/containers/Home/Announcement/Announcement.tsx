import React, { FC, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'typesafe-actions'
import MaterialTable from 'material-table'
import Checkbox from '@material-ui/core/Checkbox'
import { formatJSONDate } from 'shared/utils'
import tableIcons from 'configs/tableConfig'
import { fetchAnnouncements } from 'stores/announcement/actions'
import { IAnnouncement } from 'typings/announcement'
import TableWrapper from 'components/TableWrapper/TableWrapper'

const mapStateToProps = (state: RootState) => {
  const {
    announcements: { announcements },
  } = state

  return {
    announcements: announcements.allIds.map(id => announcements.byId[id]),
  }
}

const mapDispatchToProps = {
  fetchAnnouncements: fetchAnnouncements.request,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

const Announcement: FC<Props> = ({ announcements, fetchAnnouncements }) => {
  const [loading] = useState(false)
  useEffect(() => {
    fetchAnnouncements({})
  })
  return (
    <TableWrapper tableName='Yancey Table' icon='save'>
      <MaterialTable
        isLoading={loading}
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
            render: (rowData: IAnnouncement) => (
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
            render: (rowData: IAnnouncement) => (
              <span>{rowData ? formatJSONDate(rowData.createdAt) : ''}</span>
            ),
          },
          {
            field: 'updatedAt',
            title: 'UpdatedAt',
            editable: 'never',
            render: (rowData: IAnnouncement) => (
              <span>{rowData ? formatJSONDate(rowData.createdAt) : ''}</span>
            ),
          },
        ]}
        data={announcements}
        icons={tableIcons}
        // editable={{
        //   onRowAdd: newData => POST(newData),
        //   onRowUpdate: (newData, oldData) =>
        //     PUT(newData._id, newData.announcement),
        //   onRowDelete: oldData => DELETE(oldData._id),
        // }}
        options={{
          showTitle: false,
          actionsColumnIndex: -1,
          filtering: true,
          exportButton: true,
          grouping: true,
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
        }}
      />
    </TableWrapper>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Announcement)
