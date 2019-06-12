import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import Card from "./card"
import { default as Background } from "./background"
import Header from "./header"
import pages from "./pages"

const Container = styled.div`
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
`

class Application extends React.Component {
  constructor(props) {
    super(props)
    this.state = { renderCardContent: true, showHeader: getPageData(props).showHeader }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const previousPage = getPageData(this.props)
    const nextPage = getPageData(nextProps)
    if (previousPage.showHeader !== nextPage.showHeader) {
      this.setState({ renderCardContent: false, showHeader: nextPage.showHeader })
      setTimeout(() => this.setState({ renderCardContent: true }), 500)
    }
  }

  render() {
    const { content, showScore } = this.props
    const { render, showHeader } = getPageData(this.props)

    return (
      <Container>
        <Header { ...this.props } show={ showHeader || showScore } />
        <Background
          { ...this.props }
          showHeader={ showHeader || showScore }
          bannerText={ content.name } >
          <Card small={ showHeader }>
            { this.state.renderCardContent && React.createElement(render, this.props) }
          </Card>
        </Background>
      </Container>
    )
  }
}

function getPageData({ showGameManual, gameState }) {
  return showGameManual ? pages.GAME_MANUAL : pages[gameState]
}

export default connect((state) => state)(Application)
