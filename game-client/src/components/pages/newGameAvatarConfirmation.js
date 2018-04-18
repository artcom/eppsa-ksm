import React from "react"
import autoBind from "react-autobind"
import styled from "styled-components"

import { updateGameState } from "../../actionCreators"
import { NEW_GAME_AVATAR_SELECTION, NEW_GAME_NAME_SELECTION } from "../../gameStates"
import Button from "../../../node_modules/eppsa-ksm-shared/styled-components/components/button"
import NextButton from "../../../node_modules/eppsa-ksm-shared/styled-components/components/nextButton"
import delay from "../../../node_modules/eppsa-ksm-shared/functions/delay"


const Container = styled.div `
  font-family: ${props => props.theme.font.fontFamily};
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: ${props => props.theme.layout.offsetX};
  padding-right: ${props => props.theme.layout.offsetX};
  height: 100%;
  width: 100%;
`

const Title = styled.div`
  margin-bottom: 0.5em;
  align-self: center;
  font-size: ${props => props.theme.font.headline.size};
  font-weight: ${props => props.theme.font.headline.weight};
  color: ${props => props.theme.font.headline.color};
  text-align: center;
`

const Icon = styled.div`
  height: 15em;
  width: 15em;
  border-radius: 50%;
  align-self: center;
  border: ${props => props.theme.layout.iconBorder} solid ${props => props.theme.colors.areaColor};
  background-image: url(${props => props.icon});
  background-size: cover;
`

const Description = styled.div`
  margin-top: 1em;
  padding-bottom: 0.25em;
  max-height: 4.5em;
  font-size: ${props => props.theme.font.text.size};
  font-weight: ${props => props.theme.font.text.weight};
  color: ${props => props.theme.font.text.color};
  text-align: center;
`

const ConfirmButton = styled(NextButton)`
  border-color: ${props => props.theme.colors.areaColor};
  width: 100%;
`

const BackButton = styled(Button)`
  width: 67%;
  align-self: center;
  border-color: ${props => props.theme.colors.secondary};
`

export default class NewGameAvatarConfirmation extends React.Component {
  constructor(props) {
    super(props)
    autoBind(this)
    this.state = { nextClicked: false, backClicked: false }
  }

  render() {
    const { assetServerUri, avatar, content } = this.props

    return (
      <Container>
        <Title>{ avatar }</Title>
        <Icon icon={ `${assetServerUri}/${content.avatars[avatar].icon.src}` } />
        <Description>{ content.avatars[avatar].description }</Description>
        <ConfirmButton
          visible
          onClick={ this.confirm }
          clicked={ this.state.nextClicked }
          text={ content.shared.texts.toPlayerName } />
        <BackButton
          onClick={ this.back }
          clicked={ this.state.backClicked }>
          { content.shared.texts.back }
        </BackButton>
      </Container>
    )
  }

  async confirm() {
    this.setState({ nextClicked: true })
    await delay(100)
    this.props.dispatch(updateGameState(NEW_GAME_NAME_SELECTION))
  }

  async back() {
    this.setState({ backClicked: true })
    await delay(100)
    this.props.dispatch(updateGameState(NEW_GAME_AVATAR_SELECTION))
  }
}
