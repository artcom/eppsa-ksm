import * as gameStates from "./gameStates"
import * as types from "./actionTypes"

export function gameState(state = gameStates.NEW_GAME_AVATAR_SELECTION, action) {
  switch (action.type) {
    case types.UPDATE_GAME_STATE:
      return action.state
    case types.UPDATE_GAME_DATA:
      return action.data.finished ? gameStates.FINISHED : gameStates.NAVIGATION_TO_NEXT_CHALLENGE
    default:
      return state
  }
}

export function name(state = "", action) {
  switch (action.type) {
    case types.UPDATE_GAME_DATA:
      return action.data.name
    case types.UPDATE_NAME:
      return action.name
    default:
      return state
  }
}

export function avatar(state = null, action) {
  switch (action.type) {
    case types.UPDATE_GAME_DATA:
      return action.data.avatar
    case types.UPDATE_AVATAR:
      return action.avatar
    default:
      return state
  }
}

export function challengeNumber(state = 1, action) {
  switch (action.type) {
    case types.UPDATE_GAME_DATA:
      return action.data.challengeNumber
    default:
      return state
  }
}

export function score(state = 0, action) {
  switch (action.type) {
    case types.UPDATE_GAME_DATA:
      return action.data.score
    default:
      return state
  }
}

export function connected(state = false, action) {
  switch (action.type) {
    case types.UPDATE_CONNECTED:
      return action.connected
    default:
      return state
  }
}

export function connectedGames(state = [], action) {
  switch (action.type) {
    case types.UPDATE_CONNECTED_GAMES:
      return action.games
    default:
      return state
  }
}

export function showGameManual(state = false, action) {
  switch (action.type) {
    case types.SHOW_GAME_MANUAL:
      return action.show
    default:
      return state
  }
}

export function wrongQrCodeScanned(state = false, action) {
  switch (action.type) {
    case types.WRONG_QR_CODE_SCANNED:
      return true
    case types.UPDATE_GAME_STATE:
      return false
    default:
      return state
  }
}

export function cameraPermissonDenied(state = false, action) {
  switch (action.type) {
    case types.HANDLE_QR_READER_ERROR:
      return action.name === "NotAllowedError"
    default:
      return state
  }
}
