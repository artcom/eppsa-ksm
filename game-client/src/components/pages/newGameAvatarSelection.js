import React from "react"
import styled, { withTheme } from "styled-components"

import { Description, PageTitle, QrReader } from "eppsa-ksm-shared"

import {
  handleQrReaderError,
  handleAvatarQrCode,
  updateAvatar,
  updateGameState
} from "../../actionCreators"
import { NEW_GAME_AVATAR_CONFIRMATION } from "../../gameStates"


const Container = styled.div `
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Content = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const Avatars = styled.img`
  margin-top: ${props => props.theme.layout.smallSpacing}vw;
  width: 100%;
`

export default withTheme(NewGameAvatarSelection)

function NewGameAvatarSelection(props) {
  const { assetServerUri, content, dispatch } = props
  console.log(process.env.NODE_ENV)

  return (
    <Container>
      <PageTitle text={ content.shared.texts.selectAvatar } />
      <Content>
        <Avatars
          onClick={ process.env.NODE_ENV === "development"
            ? () => {
              dispatch(updateAvatar("airplane"))
              dispatch(updateGameState(NEW_GAME_AVATAR_CONFIRMATION))
            }
            : () => {} }
          src={ `${assetServerUri}/${content.avatarsMedium.src}` }
          srcSet={ `${assetServerUri}/${content.avatarsSmall.src} 250w,
                    ${assetServerUri}/${content.avatarsMedium.src} 500w,
                    ${assetServerUri}/${content.avatarsLarge.src} 1000w` } />
        <QrReader
          seekerColor={ props.theme.colors.primary }
          onScan={ data => dispatch(handleAvatarQrCode(data)) }
          onError={ (error) => dispatch(handleQrReaderError(error)) } />
        <Description>{ content.shared.texts.selectAvatarInstructions }</Description>
      </Content>
    </Container>
  )
}
