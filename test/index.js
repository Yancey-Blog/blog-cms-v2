const o = {
  '0d10c6cf-798c-45eb-9596-7afc521c522d': { startDate: 'a', endDate: 'b' },
}

function formatChangedData(o) {
  const id = Object.keys(o)[0]
  return {
    id,
    ...o[id],
  }
}

console.log(formatChangedData(o))
