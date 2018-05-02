import React from "react"
import ReactDOM from "react-dom"

import { bootstrap, injectGlobalStyle } from "eppsa-ksm-shared"

import App from "./App"

bootstrap((data, callbacks) => {
  render(data, callbacks)
})

function render(data, callbacks) {
  injectGlobalStyle(data.staticServerUri)
  ReactDOM.render(
    <App data={ data } callbacks={ callbacks.callbacks } />,
    document.getElementById("root")
  )
}
