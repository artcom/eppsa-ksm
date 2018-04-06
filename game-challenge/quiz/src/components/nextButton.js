import styled, { css } from "styled-components"
import React from "react"
import Button from "./button"
import ButtonIcon from "../assets/svg/EPPSA_Assets_Button_Icon.svg"
import clickEffect from "../animations/clickEffect"


const Container = styled.div`
  width 100%;
  display: flex;
  justify-content: center;
  flex: ${props => props.visible ? "0 1 4em" : "0 0 0em"};
  transition: flex 1000ms ease;
`

const NextButton = styled(Button)`
  margin-top: 1em;
  width: 67%;
  align-self: center;
  ${props => props.visible ? css`
      transform: scale(1, 1);
      transition:
        transform 250ms cubic-bezier(0.2, 0.7, 0.55, 1.6) 250ms;
    ` : css`
      transform: scale(0, 0);
      transition: transform 250ms ease;
    `
  }
  ${props => props.clicked ? css`${clickEffect()}` : ""}
`

const NextIcon = styled(ButtonIcon)`
  margin-left: 1em;
  margin-top: 0.2em;
  height: 0.9em;
  fill: black;
`

export default props => {
  return (
    <Container { ...props }>
      <NextButton { ...props }>{ props.text }<NextIcon/></NextButton>
    </Container>
  )
}
