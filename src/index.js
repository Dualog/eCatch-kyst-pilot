import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import {I18nextProvider} from 'react-i18next'
import i18next from 'i18next'

import * as serviceWorker from './serviceWorker'

import common_en from "./locales/en/common.json"
import common_no from "./locales/no/common.json"
import languages from "./locales/locales.json"


i18next.init({
  lng: navigator.language || languages.default,
  resources: {
    en: {common: common_en},
    no: {common: common_no}
  }
})

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <App/>
  </I18nextProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
