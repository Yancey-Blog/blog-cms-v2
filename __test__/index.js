// if (str.slice(-1) === '/') {
//   const _str = str.slice(0, -1)
//   if (_str.match(/\//g).length === 2) {
//     return {
//       parent: _str.match(/\/(.*)\//g).slice(0, -1),
//       child: _str,
//     }
//   } else {
//     return {
//       parent: _str,
//       child: '',
//     }
//   }
// } else {
//   if (str.match(/\//g).length === 2) {
//     return {
//       parent: str.match(/\/(.*)\//g).slice(0, -1),
//       child: str,
//     }
//   } else {
//     return {
//       parent: str,
//       child: '',
//     }
//   }
// }

const str = '/home/xxx'
const _str = str.split('/').filter(v => v !== '')

if (_str.length > 1) {
  return {
    parent: `/${_str[0]}`,
    child: `/${_str.join('/')}`,
  }
} else {
  return {
    parent: `/${_str}`,
    child: '',
  }
}
