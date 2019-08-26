const mock = [...new Int8Array(200)].map((v, k) => ({
  name: 'name-' + k,
  sex: 'sex-' + k,
  city: 'city-' + k,
  car: 'car-' + k,
}))

export default mock
