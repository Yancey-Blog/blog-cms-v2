const ramda = require('ramda')
const zipObj = ramda.zipObj

const state = {
  byId: {
    1: {
      announcement: 'sayaka',
    },
  },
  ids: [1],
}

const newId = 2
const newContent = {
  2: {
    announcement: 'sayaka',
  },
}

const f = { byId: { ...state.byId, ...newContent }, ids: [...state.ids, newId] }

console.log(f)
