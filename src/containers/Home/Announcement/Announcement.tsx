import React, { FC, useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { httpClient } from 'shared/utils'
import { formatJSONDate } from 'shared/utils'
import tableIcons from './config'

interface IAnnouncement {
  _id: string
  announcement: string
  createdAt: string
  updatedAt: string
}

const tableProps = {
  tableName: 'Announcement',
  icon: 'save',
  // columns: [
  //   { field: '_id', title: 'Id', editable: 'never' },
  //   { field: 'announcement', title: 'Announcement' },
  //   {
  //     field: 'createdAt',
  //     title: 'CreatedAt',
  //     editable: 'never',
  //     render: (rowData: any) => (
  //       <span>{formatJSONDate(rowData.createdAt)}</span>
  //     ),
  //   },
  //   {
  //     field: 'updatedAt',
  //     title: 'UpdatedAt',
  //     editable: 'never',
  //     render: (rowData: any) => (
  //       <span>{formatJSONDate(rowData.updatedAt)}</span>
  //     ),
  //   },
  // ],
  options: {
    actionsColumnIndex: -1,
    filtering: true,
    exportButton: true,
    grouping: true,
    selection: true,
  },
}

const Announcement: FC = () => {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])

  const GET = () => {
    setLoading(true)
    httpClient('http://127.0.0.1:3002/api/announcements', {}).then(data => {
      setLoading(false)
      setDataSource(data)
    })
  }

  const POST = (params: any) => {
    setLoading(true)
    httpClient('http://127.0.0.1:3002/api/announcements', params, 'POST').then(
      data => {
        setLoading(false)
        GET()
      },
    )
  }

  const PUT = (id: string, params: any) => {
    setLoading(true)
    httpClient(
      `http://127.0.0.1:3002/api/announcements/${id}`,
      params,
      'PUT',
    ).then(data => {
      setLoading(false)
      GET()
    })
  }

  const DELETE = (id: string) => {
    setLoading(true)
    httpClient(
      `http://127.0.0.1:3002/api/announcements/${id}`,
      {},
      'DELETE',
    ).then(data => {
      setLoading(false)
      GET()
    })
  }

  const BATCHDELETE = (ids: string[]) => {
    setLoading(true)
    httpClient(`http://127.0.0.1:3002/api/announcements`, ids, 'DELETE').then(
      data => {
        setLoading(false)
        GET()
      },
    )
  }

  useEffect(() => {
    setLoading(true)
    GET()
  }, [])

  return (
    <MaterialTable
      columns={[
        { field: '_id', title: 'Id', editable: 'never' },
        { field: 'announcement', title: 'Announcement' },
        {
          field: 'createdAt',
          title: 'CreatedAt',
          editable: 'never',
          render: (rowData: any) => (
            <span>{formatJSONDate(rowData.createdAt)}</span>
          ),
        },
        {
          field: 'updatedAt',
          title: 'UpdatedAt',
          editable: 'never',
          render: (rowData: any) => (
            <span>{formatJSONDate(rowData.updatedAt)}</span>
          ),
        },
      ]}
      {...tableProps}
      data={dataSource}
      icons={tableIcons}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log(newData)
              resolve()
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {
                const data = this.state.data
                const index = data.indexOf(oldData)
                data[index] = newData
                this.setState({ data }, () => resolve())
              }
              resolve()
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {
                let data = this.state.data
                const index = data.indexOf(oldData)
                data.splice(index, 1)
                this.setState({ data }, () => resolve())
              }
              resolve()
            }, 1000)
          }),
      }}
    />
  )
}

export default Announcement
