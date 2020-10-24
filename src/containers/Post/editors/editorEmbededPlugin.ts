import ToastUIEditor from '@toast-ui/editor'
import { randomSeries } from 'yancey-js-util'

const getEmbededEL = (wrapperId: string, iframeEl: string) => {
  const el = document.querySelector(`#${wrapperId}`)
  if (el) {
    el.innerHTML = iframeEl
  }
}

const renderEmbeded = () => {
  ToastUIEditor.codeBlockManager.setReplacer('embeded', (iframeEl: string) => {
    const wrapperId = `embeded_${randomSeries(6)}`
    setTimeout(getEmbededEL.bind(null, wrapperId, iframeEl), 0)
    return `<div id="${wrapperId}"></div>`
  })
}

export default renderEmbeded
