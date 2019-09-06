const ramda = require('ramda')

const zipObj = ramda.zipObj

const res = [
  {
    _id: '4850c6de-9604-44da-9ffc-b38d5c24c9e9',
    announcement: 'the first announcement',
    createdAt: '2019-09-04T14:01:57.776Z',
    updatedAt: '2019-09-04T14:01:57.776Z',
    __v: 0,
  },
  {
    _id: 'dbf4cb6a-d249-4f9a-b3a9-cc853332ffd1',
    announcement: 'the second announcement',
    createdAt: '2019-09-04T14:00:41.306Z',
    updatedAt: '2019-09-04T14:00:41.306Z',
    __v: 0,
  },
  {
    _id: '3f81a6df-1a6f-4113-a88e-7527f47d86c0',
    announcement: 'the third announcement',
    createdAt: '2019-09-04T13:55:32.483Z',
    updatedAt: '2019-09-04T13:55:32.483Z',
    __v: 0,
  },
]

const allIds = res.map(v => v._id)
const byId = zipObj(allIds, res)

console.log({ byId, allIds })
