import { FC } from 'react'
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableMeta,
} from 'mui-datatables'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { DeleteOutline, Edit, AddBox } from '@material-ui/icons'
import { FormControl, Fab, Popover, Switch, Button } from '@material-ui/core'
import { formatJSONDate } from 'yancey-js-util'
import useOpenModal from 'src/hooks/useOpenModal'
import Move from 'src/components/Move/Move'
import TableWrapper from 'src/components/TableWrapper/TableWrapper'
import Loading from 'src/components/Loading/Loading'
import ConfirmPoper from 'src/components/ConfirmPoper/ConfirmPoper'
import ImagePopup from 'src/components/ImagePopup/ImagePopup'
import {
  POPOVER_ANCHOR_ORIGIN,
  POPOVER_TRANSFORM_ORIGIN,
  TABLE_OPTIONS,
} from 'src/shared/constants'
import globalUseStyles from 'src/shared/globalStyles'
import PlayerModal from './PlayerModal'
import useStyles from '../styles'
import { IPlayer } from '../types'

interface Props {
  dataSource: IPlayer[]
  isFetching: boolean
  isExchanging: boolean
  isDeleting: boolean
  isBatchDeleting: boolean
  createPlayer: Function
  updatePlayerById: Function
  deletePlayerById: Function
  deletePlayers: Function
  exchangePosition: Function
}

const PlayerTable: FC<Props> = ({
  dataSource,
  createPlayer,
  updatePlayerById,
  deletePlayerById,
  deletePlayers,
  exchangePosition,
  isFetching,
  isExchanging,
  isDeleting,
  isBatchDeleting,
}) => {
  const { open, handleOpen } = useOpenModal()

  const classes = useStyles()
  const globalClasses = globalUseStyles()

  const columns: MUIDataTableColumn[] = [
    { name: '_id', label: 'Id' },
    { name: 'weight', label: 'Weight' },
    { name: 'title', label: 'Title' },
    { name: 'artist', label: 'Artist' },
    {
      name: 'lrc',
      label: 'LRC',
      options: {
        customBodyRender: (value: string) => {
          return (
            <PopupState variant="popover" popupId="lrcPoperOver">
              {(popupState) => (
                <div>
                  <Button
                    color="secondary"
                    variant="outlined"
                    {...bindTrigger(popupState)}
                  >
                    Click me!
                  </Button>
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={POPOVER_ANCHOR_ORIGIN}
                    transformOrigin={POPOVER_TRANSFORM_ORIGIN}
                    disableRestoreFocus
                  >
                    <pre className={classes.lrcTxt}>{value}</pre>
                  </Popover>
                </div>
              )}
            </PopupState>
          )
        },
      },
    },
    {
      name: 'coverUrl',
      label: 'Cover Url',
      options: {
        customBodyRender: (value: string, tableMeta: MUIDataTableMeta) => {
          const curName = tableMeta.rowData[1]
          return <ImagePopup imgName={curName} imgUrl={value} />
        },
      },
    },
    {
      name: 'musicFileUrl',
      label: 'Music File Url',
      options: {
        customBodyRender: (value: string) => {
          return (
            <audio src={value} controls>
              Your browser does not support the audio element.
            </audio>
          )
        },
      },
    },
    {
      name: 'isPublic',
      label: 'Is Public',
      options: {
        // @ts-ignore
        customBodyRender: (value: boolean, tableMeta: MUIDataTableMeta) => {
          const id = tableMeta.rowData[0]

          return (
            <Switch
              checked={value}
              onChange={(e) => {
                updatePlayerById({
                  variables: { input: { isPublic: e.target.checked, id } },
                  optimisticResponse: {
                    __typename: 'Mutation',
                    updatePlayerById: {
                      id,
                      __typename: 'PlayerModel',
                      isPublic: e.target.checked,
                    },
                  },
                })
              }}
            />
          )
        },
      },
    },
    {
      name: 'createdAt',
      label: 'Created At',
      options: {
        customBodyRender: (value: string) => <span>{formatJSONDate(value)}</span>,
      },
    },
    {
      name: 'updatedAt',
      label: 'Updated At',
      options: {
        customBodyRender: (value: string) => <span>{formatJSONDate(value)}</span>,
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
                  className={globalClasses.editIcon}
                  onClick={() => handleOpen(curId)}
                />
              </FormControl>
              <FormControl>
                <ConfirmPoper
                  onOk={() => deletePlayerById({ variables: { id: curId } })}
                >
                  <DeleteOutline />
                </ConfirmPoper>
              </FormControl>

              <Move
                dataSource={dataSource}
                tableMeta={tableMeta}
                exchangePosition={exchangePosition}
              />
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
        <Fab size="medium" className={globalClasses.addIconFab}>
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
        <Fab size="medium" className={globalClasses.addIconFab}>
          <ConfirmPoper onOk={() => deletePlayers({ variables: { ids } })}>
            <DeleteOutline />
          </ConfirmPoper>
        </Fab>
      )
    },
  }

  return (
    <>
      <TableWrapper tableName="Player" icon="save">
        <MUIDataTable
          title=""
          data={dataSource}
          columns={columns}
          options={options}
        />
        {(isFetching || isDeleting || isBatchDeleting || isExchanging) && (
          <Loading />
        )}
      </TableWrapper>

      <PlayerModal
        open={open}
        handleOpen={handleOpen}
        createPlayer={createPlayer}
        updatePlayerById={updatePlayerById}
      />
    </>
  )
}

export default PlayerTable
