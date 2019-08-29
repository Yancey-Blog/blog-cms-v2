import { Random } from 'mockjs'

const mock = [...new Int8Array(97)].map((v, k) => ({
  name: Random.first(),
  sex: k % 2 === 0 ? '公' : '母',
  city: Random.city(),
  time: new Date(Random.date('yyyy-MM-dd') + ' ' + Random.time()).toISOString(),
}))

export default mock
