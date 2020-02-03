import gql from 'graphql-tag'

export const CREATE_ONE_AGENDA = gql`
  mutation CreateAgenda($input: CreateAgendaInput!) {
    createAgenda(input: $input) {
      _id
      title
      startDate
      endDate
      allDay
      notes
      rRule
      exDate
    }
  }
`

export const UPDATE_ONE_AGENDA = gql`
  mutation UpdateAgendaById($input: UpdateAgendaInput!) {
    updateAgendaById(input: $input) {
      _id
      title
      startDate
      endDate
      allDay
      notes
      rRule
      exDate
    }
  }
`

export const AGENDAS = gql`
  query GetAgenda {
    getAgenda {
      _id
      title
      startDate
      endDate
      allDay
      notes
      rRule
      exDate
    }
  }
`

export const DELETE_ONE_AGENDA = gql`
  mutation DeleteAgendaById($id: ID!) {
    deleteAgendaById(id: $id) {
      _id
      title
      startDate
      endDate
      allDay
      notes
      rRule
      exDate
    }
  }
`
