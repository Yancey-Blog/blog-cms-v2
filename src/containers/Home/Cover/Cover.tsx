import React, { FC } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useSnackbar } from 'notistack'
import { sortBy } from 'yancey-js-util'
import {
  COVERS,
  CREATE_ONE_COVER,
  UPDATE_ONE_COVER,
  DELETE_ONE_COVER,
  BATCH_DELETE_COVER,
  EXCHANGE_POSITION,
} from './typeDefs'
import { ICover, Query } from './types'
import CoverTable from './components/CoverTable'
import CoverModal from './components/CoverModal'

const Cover: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const { loading: isFetching, data } = useQuery<Query>(COVERS, {
    notifyOnNetworkStatusChange: true,
  })

  const [createCover] = useMutation(CREATE_ONE_COVER, {
    errorPolicy: 'all',
    update(proxy, { data: { createCover } }) {
      const data = proxy.readQuery<Query>({ query: COVERS })

      if (data) {
        proxy.writeQuery({
          query: COVERS,
          data: {
            ...data,
            getCovers: [createCover, ...data.getCovers],
          },
        })
      }
    },

    onCompleted() {
      enqueueSnackbar('Create success!', { variant: 'success' })
    },
    onError() {},
  })

  const [updateCoverById] = useMutation(UPDATE_ONE_COVER, {
    errorPolicy: 'all',
    onCompleted() {
      enqueueSnackbar('Update success!', { variant: 'success' })
    },
    onError() {},
  })

  const [exchangePosition, { loading: isExchanging }] = useMutation(
    EXCHANGE_POSITION,
    {
      errorPolicy: 'all',
      onCompleted() {
        enqueueSnackbar('Update success!', { variant: 'success' })
      },
      onError() {},
    },
  )

  const [deleteCoverById, { loading: isDeleting }] = useMutation(
    DELETE_ONE_COVER,
    {
      errorPolicy: 'all',
      update(proxy, { data: { deleteCoverById } }) {
        const data = proxy.readQuery<Query>({ query: COVERS })

        if (data) {
          proxy.writeQuery({
            query: COVERS,
            data: {
              getCovers: data.getCovers.filter(
                (announcement: ICover) =>
                  announcement._id !== deleteCoverById._id,
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

  const [deleteCovers, { loading: isBatchDeleting }] = useMutation(
    BATCH_DELETE_COVER,
    {
      errorPolicy: 'all',
      update(proxy, { data: { deleteCovers } }) {
        const data = proxy.readQuery<Query>({ query: COVERS })

        if (data) {
          proxy.writeQuery({
            query: COVERS,
            data: {
              getCovers: data.getCovers.filter(
                (announcement: ICover) =>
                  !deleteCovers.ids.includes(announcement._id),
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
    <>
      <CoverTable
        dataSource={
          data ? data.getCovers.sort(sortBy('weight', 'descend')) : []
        }
        isFetching={isFetching}
        isDeleting={isDeleting}
        isExchanging={isExchanging}
        isBatchDeleting={isBatchDeleting}
        deleteCoverById={deleteCoverById}
        updateCoverById={updateCoverById}
        deleteCovers={deleteCovers}
        exchangePosition={exchangePosition}
      />

      <CoverModal createCover={createCover} updateCoverById={updateCoverById} />
    </>
  )
}

export default Cover
