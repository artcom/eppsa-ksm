import React from "react"
import styled, { withTheme } from "styled-components"
import { Description, NextButton, Page, PageTitle } from "eppsa-ksm-shared"

import { goToNextChallenge } from "../../actionCreators"

const Container = styled(Page)`
  display: flex;
  flex-direction: column;
`

const Content = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

function ChallengeResult({ challengeData, content, dispatch }) {
  const title = challengeData.challenge.result.title
  const text = challengeData.challenge.result.text

  return (
    <Container>
      <PageTitle>{ title }</PageTitle>
      <Content>
        <Description>
          { text }
        </Description>
        <NextButton
          visible
          onClick={ () => dispatch(goToNextChallenge()) }
          text={ content.shared.texts.next } />
      </Content>
    </Container>
  )
}

export default withTheme(ChallengeResult)