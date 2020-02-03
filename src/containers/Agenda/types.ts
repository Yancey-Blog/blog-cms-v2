export interface IAgenda {
  _id: string
  title: string
  startDate: Date
  endDate: Date
  allDay: boolean
  notes: string | null
  rRule: string | null
  exDate: string | null
  createdAt: string
  updatedAt: string
}

export interface Query {
  getAgenda: IAgenda[]
}

export interface ScheduleProps {
  dataSource: IAgenda[]
  createAgenda: Function
  updateAgendaById: Function
  deleteAgendaById: Function
}
