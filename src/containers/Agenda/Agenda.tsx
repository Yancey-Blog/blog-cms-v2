import React, { FC } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  AGENDAS,
  CREATE_ONE_AGENDA,
  UPDATE_ONE_AGENDA,
  DELETE_ONE_AGENDA,
} from './typeDefs'
import { IAgenda, Query } from './types'
import Schedule from './components/Schedule/Schedule'
import { dateStringToDate } from './tools'

const Agenda: FC = () => {
  const { data } = useQuery<Query>(AGENDAS, {
    notifyOnNetworkStatusChange: true,
  })

  const [createAgenda] = useMutation(CREATE_ONE_AGENDA, {
    update(proxy, { data: { createAgenda } }) {
      const data = proxy.readQuery<Query>({ query: AGENDAS })

      if (data) {
        proxy.writeQuery({
          query: AGENDAS,
          data: {
            ...data,
            getAgenda: [createAgenda, ...data.getAgenda],
          },
        })
      }
    },

    onError() {},
  })

  const [updateAgendaById] = useMutation(UPDATE_ONE_AGENDA, {
    onError() {},
  })

  const [deleteAgendaById] = useMutation(DELETE_ONE_AGENDA, {
    update(proxy, { data: { deleteAgendaById } }) {
      const data = proxy.readQuery<Query>({ query: AGENDAS })

      if (data) {
        proxy.writeQuery({
          query: AGENDAS,
          data: {
            getAgenda: data.getAgenda.filter(
              (agenda: IAgenda) => agenda._id !== deleteAgendaById._id,
            ),
          },
        })
      }
    },
    onError() {},
  })

  return (
    <Schedule
      dataSource={data ? dateStringToDate(data.getAgenda) : []}
      createAgenda={createAgenda}
      updateAgendaById={updateAgendaById}
      deleteAgendaById={deleteAgendaById}
    />
  )
}

export default Agenda
