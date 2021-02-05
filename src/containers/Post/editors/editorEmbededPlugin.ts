import ToastUIEditor from '@toast-ui/editor'
import { randomSeries } from 'yancey-js-util'

const renderEmbeded = (wrapperId: string, iframeEl: string) => {
  const el = document.querySelector(`#${wrapperId}`)
  if (el) {
    el.innerHTML = iframeEl
  }
}

const addEmbededEl = () => {
  ToastUIEditor.codeBlockManager.setReplacer('embeded', (iframeEl: string) => {
    const wrapperId = `embeded_${randomSeries(6)}`
    setTimeout(renderEmbeded.bind(null, wrapperId, iframeEl), 0)
    return `<div id="${wrapperId}"></div>`
  })
}

export default addEmbededEl
