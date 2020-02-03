export interface IAgenda {
  _id: string
  title: string
  startDate: string
  endDate?: string
  rRule?: string
  exDate?: string
  createdAt: string
  updatedAt: string
}

export interface Query {
  getAgenda: IAgenda[]
}

export interface ScheduleProps {
  data: Query | undefined
  createAgenda: Function
  updateAgendaById: Function
  deleteAgendaById: Function
}
