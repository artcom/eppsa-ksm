import React from "react"
import styled, { css, withTheme } from "styled-components"
import { Button, clickEffect, pulse } from "eppsa-ksm-shared"

const StyledButton = styled(Button)`
  align-self: stretch;
  margin-top: ${props => props.theme.layout.mediumSpacing}vw;
  border-color: ${props => selectionColor(props.selection, props.theme)};
  ${props => props.visible ? css`
      transform: scale(1, 1);
      transition:
        transform 150ms cubic-bezier(0.2, 0.7, 0.55, 1.2)
          ${props => props.initialDelay + props.index * 150}ms,
        opacity  150ms ease ${props => props.initialDelay + props.index * 150}ms;
    ` : css`
      transform: scale(0, 0);
      opacity: 0;
    `}
  animation: ${props =>
    selectionAnimation(
      props.selection,
      props.blinking,
      props.theme.colors.area,
      "border-color",
      props.theme
    )}
  ${props => props.clicked ? css`, ${clickEffect()};` : ";"}
  ${props => props.selection === "greyed" ? css`
    opacity: 0.8;
    transition: opacity ${props.greyOutDuration}ms ease;
  ` : css`
    opacity: 1;
  `}
`

const Title = styled.div`
  flex-basis: 10%;
  align-self: center;
  color: ${props => selectionColor(props.selection, props.theme)};
  animation: ${props =>
    selectionAnimation(
      props.selection,
      props.blinking,
      props.theme.colors.primaryFont,
      "color",
      props.theme
    )};
  opacity: 0.5;
`

const Answer = styled.div`
  flex-basis: 90%;
  align-self: center;
  padding-right: 10%;
  color: ${props => selectionColor(props.selection, props.theme, "text")};
  animation: ${props =>
    selectionAnimation(
      props.selection,
      props.blinking,
      props.theme.colors.primaryFont,
      "color",
      props.theme
    )};
  }
`

function selectionAnimation(selection, blinking, initialColor, colorType, theme) {
  const { rightAnswer, wrongAnswer } = theme.colors
  switch (selection) {
    case "right": return pulse(initialColor, rightAnswer, blinking, colorType)
    case "wrong": return pulse(initialColor, wrongAnswer, blinking, colorType)
    default: return ""
  }
}

function selectionColor(selection, theme, colorType = "area") {
  const {
    rightAnswer,
    wrongAnswer,
    secondary,
    area,
    primaryFont
  } = theme.colors
  switch (selection) {
    case "right": return rightAnswer
    case "wrong": return wrongAnswer
    case "greyed": return secondary
    default: return colorType === "area" ? area : primaryFont
  }
}

function AnswerButton(props) {
  return (
    <StyledButton { ...props }>
      <Title selection={ props.selection } blinking={ props.blinking }>{ props.title }:</Title>
      <Answer selection={ props.selection } blinking={ props.blinking }>{ props.answer }</Answer>
    </StyledButton>
  )
}

export default withTheme(AnswerButton)

AnswerButton.defaultProps = {
  selection: null
}
