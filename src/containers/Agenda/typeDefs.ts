import gql from 'graphql-tag'

const AGENDA_FRAGMENT = gql`
  fragment AgendaFragment on AgendaModel {
    _id
    title
    startDate
    endDate
    allDay
    notes
    rRule
    exDate
  }
`

export const CREATE_ONE_AGENDA = gql`
  mutation CreateAgenda($input: CreateAgendaInput!) {
    createAgenda(input: $input) {
      ...AgendaFragment
    }
  }
  ${AGENDA_FRAGMENT}
`

export const UPDATE_ONE_AGENDA = gql`
  mutation UpdateAgendaById($input: UpdateAgendaInput!) {
    updateAgendaById(input: $input) {
      ...AgendaFragment
    }
  }
  ${AGENDA_FRAGMENT}
`

export const AGENDAS = gql`
  query GetAgenda {
    getAgenda {
      ...AgendaFragment
    }
  }
  ${AGENDA_FRAGMENT}
`

export const DELETE_ONE_AGENDA = gql`
  mutation DeleteAgendaById($id: ID!) {
    deleteAgendaById(id: $id) {
      ...AgendaFragment
    }
  }
  ${AGENDA_FRAGMENT}
`
