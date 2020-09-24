/// <reference types="react-scripts" />

declare interface Window {
  grecaptcha: {
    ready: Function
    execute: Promise
  }
}
