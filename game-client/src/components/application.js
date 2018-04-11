import omit from "lodash.omit"
import React from "react"
import { connect } from "react-redux"

import { showGameManual } from "../actionCreators"
import GameBoard from "./gameBoard"
import GameManual from "./gameManual"
import pages from "./pages"

function Application(props) {
  const pageData = pages[props.gameState]

  const enhancedProps = enhance(props)

  return (
    <div>
      { pageData.showHeader && renderHeader(enhancedProps) }
      { props.showGameManual
        ? <GameManual { ...props } />
        : React.createElement(pageData.render, enhancedProps)
      }
    </div>
  )
}

function renderHeader(props) {
  return (
    <div>
      <button onClick={ () => props.dispatch(showGameManual(true)) }>i</button>
      <GameBoard { ...props } />
    </div>
  )
}

function enhance(props) {
  const challengeTypes = props.content.challenges[props.challengeNumber].challengeTypes
  const challengeType = Object.keys(omit(challengeTypes, "template"))[0]
  const challengeUri = resolveChallengeWebAppUri(challengeType)

  return Object.assign({ challengeUri, challengeType }, props)
}

export default connect((state) => state)(Application)

function resolveChallengeWebAppUri(webApp, props) {
  const { contentServerUri, assetServerUri, gameServerUri, challengeNumber } = props

  const protocol = document.location.protocol
  const environment = document.location.hostname.split(".").slice(1).join(".")
  const challengeUri = new URL(`${protocol}//${webApp}.${environment}`)

  challengeUri.searchParams.append("contentServerUri", contentServerUri)
  challengeUri.searchParams.append("assetServerUri", assetServerUri)
  challengeUri.searchParams.append("gameServerUri", gameServerUri)
  challengeUri.searchParams.append("challengeNumber", challengeNumber)

  return challengeUri.toString()
}
