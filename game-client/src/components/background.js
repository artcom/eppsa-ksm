import React from "react"
import styled from "styled-components"
import BackgroundArcSvg from "../assets/Background_Arc.svg"

import Banner from "./banner"
import { default as TimerBarComponent } from "./timerBar"

const Container = styled.div`
  position: relative;

  padding-top: 4%;

  box-sizing: border-box;

  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  transition: transform 500ms ease;
  animation: ${props => props.showScore ? "slideDown 3s;" : ";"}

  @keyframes slideDown {
      0% {transform: translateY(0vw);}
      20% {transform: translateY(5vw);}
      80% {transform: translateY(5vw);}
      100% {transform: translateY(0vw);}
  }
`

const BackgroundArcSVG = styled(BackgroundArcSvg)`
  fill: ${props => props.theme.colors.area};
  margin-bottom: -1px;
  width: 100%;
  height: 5%;
  background-color: white;
  transition: fill 0.5s ease;
`

const BackgroundContainer = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  background-color: ${props => props.theme.colors.area};
  transition: background-color 0.5s ease;
`

const BannerContainer = styled.div`
  visibility: ${props => props.visible ? "visible" : "hidden"};
  display: flex;
  position: absolute;
  transform: translateY(-3vw);
  width: 100%;
  justify-content: center;
`

const TimerBarContainer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TimerBar = styled(TimerBarComponent)`
  position: absolute;

  top: 5vw;

  z-index: 9999;

  width: 50%;
`

export default function Background(props) {
  return (
    <Container
      className={ props.className }
      isBannerVisible={ isBannerVisible(props.gameState) }
      showScore={ props.showScore }>
      <BannerContainer visible={ isBannerVisible(props.gameState) }>
        <Banner>{ props.bannerText }</Banner>
      </BannerContainer>
      <BackgroundArcSVG />
      { props.gameState === "CHALLENGE" && renderTimerBar(props) }
      <BackgroundContainer>
        { props.children }
      </BackgroundContainer>
    </Container>
  )
}

function renderTimerBar(props) {
  return (
    <TimerBarContainer>
      <TimerBar
        initSeconds={ props.challengeData.challenge.score.sessionLength }
        isRunning={ props.timelineClockRunning } />
    </TimerBarContainer>
  )
}

function isBannerVisible(gamestate) {
  switch (gamestate) {
    case "NEW_GAME_AVATAR_SELECTION":
    case "NEW_GAME_AVATAR_CONFIRMATION":
    case "NEW_GAME_NAME_SELECTION":
      return true
    default:
      return false
  }
}
