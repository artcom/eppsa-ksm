import React from "react"
import ReactDOM from "react-dom"

import { injectGlobalStyle } from "../lib/eppsa-ksm-shared/styled-components/globalStyle"

import App from "./App"
import bootstrap from "../lib/eppsa-ksm-shared/functions/bootstrap"

bootstrap((data, config, onCompleteChallenge) => {
  render(data, config, onCompleteChallenge)
})

function render(data, onCompleteChallenge) {
  injectGlobalStyle(data.staticServerUri)

  ReactDOM.render(
    <App content={ data } completeChallenge={ onCompleteChallenge } />,
    document.getElementById("root")
  )
}
