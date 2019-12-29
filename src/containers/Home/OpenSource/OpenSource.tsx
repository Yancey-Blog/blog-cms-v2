import React, { FC } from 'react'
import { graphql, QueryRenderer } from 'react-relay'
import environment from '../../../shared/RelayEnvironment'
import MUIDataTable, { MUIDataTableOptions, MUIDataTableColumn } from 'mui-datatables'
import { DeleteOutline, Edit, AddBox } from '@material-ui/icons'
import { FormControl, Fab } from '@material-ui/core'
import Loading from '../../../components/Loading/Loading'
import TableWrapper from '../../../components/TableWrapper/TableWrapper'
import styles from './OpenSource.module.scss'
import { formatDate } from '../../../shared/utils'

const columns: MUIDataTableColumn[] = [
  { name: '_id', label: 'Id' },
  { name: 'title', label: 'Title' },
  { name: 'description', label: 'Description' },
  { name: 'url', label: 'Url' },
  { name: 'posterUrl', label: 'PosterUrl' },
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
        return (
          <>
            <FormControl>
              <Edit style={{ marginRight: '12px', cursor: 'pointer' }} onClick={() => {}} />
            </FormControl>
            <FormControl>
              <DeleteOutline style={{ cursor: 'pointer' }} onClick={() => {}} />
            </FormControl>
          </>
        )
      },
    },
  },
]

const OpenSource: FC = () => {
  const options: MUIDataTableOptions = {
    filterType: 'textField',
    responsive: 'stacked',
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 50],
    searchPlaceholder: 'Search...',
    customToolbar() {
      return (
        <Fab size="medium" className={styles.addIconFab}>
          <AddBox className={styles.addIcon} onClick={() => {}} />
        </Fab>
      )
    },
    customToolbarSelect(selectedRows) {
      // const ids = selectedRows.data.map((row: any) => getOpenSources[row.index]._id)
      return (
        <Fab size="medium" className={styles.addIconFab}>
          <DeleteOutline className={styles.addIcon} onClick={() => {}} />
        </Fab>
      )
    },
  }

  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query OpenSourcesQuery {
          getOpenSources {
            _id
            title
            description
            url
            posterUrl
            createdAt
            updatedAt
          }
        }
      `}
      variables={{}}
      render={({ error, props }: { error: Error | null; props: any }) => {
        if (error) {
          return <div>Error!</div>
        }
        if (!props) {
          return <Loading />
        }
        return (
          <TableWrapper tableName="Open Source" icon="save">
            <MUIDataTable
              title=""
              data={props.getOpenSources}
              columns={columns}
              options={options}
            />
          </TableWrapper>
        )
      }}
    />
  )
}

export default OpenSource
