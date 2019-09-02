import React, { FC, useState, useEffect } from 'react'
import Tables from 'components/Tables/Tables'
import { httpClient } from 'shared/utils'

const tableProps = {
  tableName: 'Announcement',
  icon: 'save',
  columns: [
    { name: '_id', title: 'Id' },
    { name: 'announcement', title: 'Announcement' },
    { name: 'createdAt', title: 'CreatedAt' },
    { name: 'updatedAt', title: 'UpdatedAt' },
  ],
  selectByRowClick: false,
  dateColumns: ['createdAt', 'updatedAt'],
  columnOrders: ['_id', 'announcement', 'createdAt', 'updatedAt'],
  editingStateColumnExtensions: [
    { columnName: '_id', editingEnabled: false },
    { columnName: 'createdAt', editingEnabled: false },
    { columnName: 'updatedAt', editingEnabled: false },
  ],
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

  useEffect(() => {
    setLoading(true)
    GET()
  }, [])

  return (
    <Tables
      rows={dataSource}
      totalCount={dataSource.length}
      loading={loading}
      {...tableProps}
      POST={POST}
    />
  )
}

export default Announcement
