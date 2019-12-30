import React, { FC } from 'react'
import { graphql, QueryRenderer } from 'react-relay'
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableMeta,
} from 'mui-datatables'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { DeleteOutline, Edit, AddBox } from '@material-ui/icons'
import { FormControl, Fab, Button, Popover } from '@material-ui/core'
import environment from '../../../shared/RelayEnvironment'
import Loading from '../../../components/Loading/Loading'
import TableWrapper from '../../../components/TableWrapper/TableWrapper'
import styles from './OpenSource.module.scss'
import { formatDate } from '../../../shared/utils'

const OpenSource: FC = () => {
  const columns: MUIDataTableColumn[] = [
    { name: '_id', label: 'Id' },
    { name: 'title', label: 'Title' },
    { name: 'description', label: 'Description' },
    {
      name: 'url',
      label: 'Url',
      options: {
        customBodyRender: (value: string) => (
          <Button href={value} color="secondary" target="_blank" rel="noopener noreferrer">
            {value}
          </Button>
        ),
      },
    },
    {
      name: 'posterUrl',
      label: 'PosterUrl',
      options: {
        customBodyRender: (value: string, tableMeta: MUIDataTableMeta) => (
          <PopupState variant="popover" popupId="imagePoperOver">
            {popupState => (
              <div>
                <img
                  src={value}
                  style={{ width: '150px' }}
                  alt={tableMeta.rowData[1]}
                  {...bindTrigger(popupState)}
                />
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  disableRestoreFocus
                >
                  <img
                    src={value}
                    style={{ width: '800px', display: 'block' }}
                    alt={tableMeta.rowData[1]}
                  />
                </Popover>
              </div>
            )}
          </PopupState>
        ),
      },
    },
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
            <div style={{ width: '60px' }}>
              <FormControl>
                <Edit style={{ marginRight: '12px', cursor: 'pointer' }} onClick={() => {}} />
              </FormControl>
              <FormControl>
                <DeleteOutline style={{ cursor: 'pointer' }} onClick={() => {}} />
              </FormControl>
            </div>
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
