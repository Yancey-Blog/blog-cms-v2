import React, { FC } from 'react'
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableMeta,
} from 'mui-datatables'
import { DeleteOutline, Edit, AddBox } from '@material-ui/icons'
import { FormControl, Fab, Button } from '@material-ui/core'
import { sortBy } from 'yancey-js-util'
import useOpenModal from 'src/hooks/useOpenModal'
import { formatDate } from 'src/shared/utils'
import TableWrapper from 'src/components/TableWrapper/TableWrapper'
import Loading from 'src/components/Loading/Loading'
import ConfirmPoper from 'src/components/ConfirmPoper/ConfirmPoper'
import ImagePopup from 'src/components/ImagePopup/ImagePopup'
import { TABLE_OPTIONS } from 'src/shared/constants'
import useStyles from 'src/shared/globalStyles'
import OpenSourceModal from './OpenSourceModal'
import { IOpenSource } from '../types'

interface Props {
  dataSource: IOpenSource[]
  isFetching: boolean
  isDeleting: boolean
  isBatchDeleting: boolean
  createOpenSource: Function
  updateOpenSourceById: Function
  deleteOpenSourceById: Function
  deleteOpenSources: Function
}

const OpenSourceTable: FC<Props> = ({
  dataSource,
  createOpenSource,
  updateOpenSourceById,
  deleteOpenSourceById,
  deleteOpenSources,
  isFetching,
  isDeleting,
  isBatchDeleting,
}) => {
  const { open, handleOpen } = useOpenModal()

  const classes = useStyles()

  const columns: MUIDataTableColumn[] = [
    { name: '_id', label: 'Id' },
    { name: 'title', label: 'Title' },
    { name: 'description', label: 'Description' },
    {
      name: 'url',
      label: 'Url',
      options: {
        customBodyRender: (value: string) => (
          <Button
            href={value}
            color="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {value}
          </Button>
        ),
      },
    },
    {
      name: 'posterUrl',
      label: 'Poster Url',
      options: {
        customBodyRender: (value: string, tableMeta: MUIDataTableMeta) => {
          const curName = tableMeta.rowData[1]
          return <ImagePopup imgName={curName} imgUrl={value} />
        },
      },
    },
    {
      name: 'createdAt',
      label: 'Created At',
      options: {
        customBodyRender: (value: string) => <span>{formatDate(value)}</span>,
      },
    },
    {
      name: 'updatedAt',
      label: 'Updated At',
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
          const curId = tableMeta.rowData[0]
          return (
            <>
              <FormControl>
                <Edit
                  className={classes.editIcon}
                  onClick={() => handleOpen(curId)}
                />
              </FormControl>
              <FormControl>
                <ConfirmPoper
                  onOk={() =>
                    deleteOpenSourceById({ variables: { id: curId } })
                  }
                >
                  <DeleteOutline />
                </ConfirmPoper>
              </FormControl>
            </>
          )
        },
      },
    },
  ]

  const options: MUIDataTableOptions = {
    ...TABLE_OPTIONS,
    customToolbar() {
      return (
        <Fab size="medium" className={classes.addIconFab}>
          <AddBox onClick={() => handleOpen()} />
        </Fab>
      )
    },
    customToolbarSelect(selectedRows) {
      const ids = selectedRows.data.map(
        (row: { index: number; dataIndex: number }) =>
          dataSource[row.index]._id,
      )
      return (
        <Fab size="medium" className={classes.addIconFab}>
          <ConfirmPoper onOk={() => deleteOpenSources({ variables: { ids } })}>
            <DeleteOutline />
          </ConfirmPoper>
        </Fab>
      )
    },
  }

  return (
    <>
      <TableWrapper tableName="Open Source" icon="save">
        <MUIDataTable
          title=""
          data={dataSource.sort(sortBy('updatedAt')).reverse()}
          columns={columns}
          options={options}
        />
        {(isFetching || isDeleting || isBatchDeleting) && <Loading />}
      </TableWrapper>

      <OpenSourceModal
        open={open}
        handleOpen={handleOpen}
        createOpenSource={createOpenSource}
        updateOpenSourceById={updateOpenSourceById}
      />
    </>
  )
}

export default OpenSourceTable
