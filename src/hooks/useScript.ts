import { useEffect } from 'react'

export const useScriptUrl = (
  url: string,
  isAsync = true,
  htmlEl?: HTMLElement,
) => {
  useEffect(() => {
    const $scriptEl = document.createElement('script')

    $scriptEl.src = url
    if (isAsync) $scriptEl.async = true

    htmlEl
      ? htmlEl.appendChild($scriptEl)
      : document.body.appendChild($scriptEl)
    return () => {
      htmlEl
        ? htmlEl.removeChild($scriptEl)
        : document.body.removeChild($scriptEl)
    }
  }, [htmlEl, url, isAsync])
}

export const useScript = (content: any, htmlEl?: HTMLElement) => {
  useEffect(() => {
    const $scriptEl = document.createElement('script')
    $scriptEl.innerHTML = content

    htmlEl
      ? htmlEl.appendChild($scriptEl)
      : document.body.appendChild($scriptEl)
    return () => {
      htmlEl
        ? htmlEl.removeChild($scriptEl)
        : document.body.removeChild($scriptEl)
    }
  }, [htmlEl, content])
}
