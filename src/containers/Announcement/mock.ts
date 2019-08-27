import { Random } from 'mockjs'

const mock = [...new Int8Array(100)].map((v, k) => ({
  name: Random.first(),
  sex: k % 2 === 0 ? '公' : '母',
  city: Random.city(),
  car: Random.url('https'),
}))

export default mock
