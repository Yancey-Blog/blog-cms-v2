import React, { FC, useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import Checkbox from '@material-ui/core/Checkbox'
import { httpClient } from 'shared/utils'
import { formatJSONDate } from 'shared/utils'
import tableIcons from './config'

interface IAnnouncement {
  _id: string
  announcement: string
  createdAt: string
  updatedAt: string
}

const Announcement: FC<{}> = (props) => {
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)

  const GET = () => {
    setLoading(true)
    httpClient('http://127.0.0.1:3002/api/announcements', {}).then(data => {
      setDataSource(data)
      setLoading(false)
    })
  }

  const POST = (params: any) => {
    setLoading(true)
    return httpClient(
      'http://127.0.0.1:3002/api/announcements',
      params,
      'POST',
    ).then(data => {
      GET()
      setLoading(false)
    })
  }

  const PUT = (id: string, params: any) => {
    return httpClient(
      `http://127.0.0.1:3002/api/announcements/${id}`,
      params,
      'PUT',
    ).then(data => {
      GET()
    })
  }

  const DELETE = (id: string) => {
    return httpClient(
      `http://127.0.0.1:3002/api/announcements/${id}`,
      {},
      'DELETE',
    ).then(data => {
      GET()
    })
  }

  // const BATCHDELETE = (ids: string[]) => {
  //   return httpClient(
  //     `http://127.0.0.1:3002/api/announcements`,
  //     ids,
  //     'DELETE',
  //   ).then(data => {
  //     GET()
  //   })
  // }

  useEffect(() => {
    GET()
    console.log(props)
  }, [props])

  return (
    <MaterialTable
      isLoading={loading}
      columns={[
        {
          field: '',
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
          render: (rowData: any) => (
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
          render: (rowData: any) => (
            <span>{rowData ? formatJSONDate(rowData.createdAt) : ''}</span>
          ),
        },
        {
          field: 'updatedAt',
          title: 'UpdatedAt',
          editable: 'never',
          render: (rowData: any) => (
            <span>{rowData ? formatJSONDate(rowData.createdAt) : ''}</span>
          ),
        },
      ]}
      data={dataSource}
      icons={tableIcons}
      editable={{
        onRowAdd: newData => POST(newData),
        onRowUpdate: (newData, oldData) =>
          PUT(newData._id, newData.announcement),
        onRowDelete: oldData => DELETE(oldData._id),
      }}
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
  )
}

export default Announcement
