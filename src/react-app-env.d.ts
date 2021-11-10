/// <reference types="react-scripts" />

declare module 'react/jsx-runtime' {
  export default any
}

declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_BEG_SERVICE_DOMAIN: string
    REACT_APP_UPLOADER_SERVICE_DOMAIN: string
    REACT_APP_ALGOLIA_APPLICATION_ID: string
    REACT_APP_ALGOLIA_ADMIN_API_KEY: string
    REACT_APP_ALGOLIA_SEARCH_INDEX: string
    REACT_APP_RECAPTCHA_KEY: string
    PORT: string
  }
}

declare interface Window {
  grecaptcha: {
    ready: Function
    execute: Promise
  }
}
