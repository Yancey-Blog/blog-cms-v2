import React, { FC } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useSnackbar } from 'notistack'
import {
  PLAYERS,
  CREATE_ONE_PLAYER,
  UPDATE_ONE_PLAYER,
  DELETE_ONE_PLAYER,
  BATCH_DELETE_PLAYER,
} from './typeDefs'
import { IPlayer, Query } from './types'
import PlayerTable from './components/PlayerTable'

const Player: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const { loading: isFetching, data } = useQuery<Query>(PLAYERS, {
    notifyOnNetworkStatusChange: true,
  })

  const [createPlayer] = useMutation(CREATE_ONE_PLAYER, {
    update(proxy, { data: { createPlayer } }) {
      const data = proxy.readQuery<Query>({ query: PLAYERS })

      if (data) {
        proxy.writeQuery({
          query: PLAYERS,
          data: {
            ...data,
            getPlayers: [createPlayer, ...data.getPlayers],
          },
        })
      }
    },

    onCompleted() {
      enqueueSnackbar('Create success!', { variant: 'success' })
    },
    onError() {},
  })

  const [updatePlayerById] = useMutation(UPDATE_ONE_PLAYER, {
    onCompleted() {
      enqueueSnackbar('Update success!', { variant: 'success' })
    },
  })

  const [deletePlayerById, { loading: isDeleting }] = useMutation(
    DELETE_ONE_PLAYER,
    {
      update(proxy, { data: { deletePlayerById } }) {
        const data = proxy.readQuery<Query>({ query: PLAYERS })

        if (data) {
          proxy.writeQuery({
            query: PLAYERS,
            data: {
              getPlayers: data.getPlayers.filter(
                (player: IPlayer) => player._id !== deletePlayerById._id,
              ),
            },
          })
        }
      },
      onCompleted() {
        enqueueSnackbar('Delete success!', { variant: 'success' })
      },
      onError() {},
    },
  )

  const [deletePlayers, { loading: isBatchDeleting }] = useMutation(
    BATCH_DELETE_PLAYER,
    {
      update(proxy, { data: { deletePlayers } }) {
        const data = proxy.readQuery<Query>({ query: PLAYERS })

        if (data) {
          proxy.writeQuery({
            query: PLAYERS,
            data: {
              getPlayers: data.getPlayers.filter(
                (player: IPlayer) => !deletePlayers.ids.includes(player._id),
              ),
            },
          })
        }
      },
      onCompleted() {
        enqueueSnackbar('Delete success!', { variant: 'success' })
      },
      onError() {},
    },
  )

  return (
    <PlayerTable
      dataSource={data ? data.getPlayers : []}
      isFetching={isFetching}
      isDeleting={isDeleting}
      isBatchDeleting={isBatchDeleting}
      createPlayer={createPlayer}
      updatePlayerById={updatePlayerById}
      deletePlayerById={deletePlayerById}
      deletePlayers={deletePlayers}
    />
  )
}

export default Player
