import { Dict, IAgenda } from './types'

export const formatChangedData = (o: Dict) => {
  const id = Object.keys(o)[0]
  return {
    id,
    ...o[id],
  }
}

export const dateStringToDate = (agendaList: IAgenda[]) =>
  agendaList.map((agenda) => ({
    ...agenda,
    id: agenda._id,
    startDate: new Date(agenda.startDate),
    endDate: new Date(agenda.endDate),
  }))
