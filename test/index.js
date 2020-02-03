const data = [
  {
    _id: '56f61cf3-fb23-4c25-ad30-855741e377f1',
    title: '全天候',
    startDate: '2020-02-03T16:30:21.018Z',
    endDate: '2020-02-03T17:00:21.018Z',
    allDay: true,
    notes: '无死角',
    rRule: null,
    exDate: null,
    __typename: 'AgendaModel',
  },
]

const dateStringToDate = agendaList =>
  agendaList.map(agenda => ({
    ...agenda,
    startDate: new Date(agenda.startDate),
    endDate: new Date(agenda.endDate),
  }))

const res = dateStringToDate(data)

console.log(res)
