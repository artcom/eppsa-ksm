import React from "react";
import { DragLayer } from "react-dnd";
import styled from "styled-components"

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  background: ${props => `url(${props.item.image})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: ${props => props.theme.borderRadius}px;

  border: 5px solid black;
  height: 80px;
  width: 100%;
`

function collect (monitor) {
  const item = monitor.getItem();
  return {
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
    item: item && item.item
  }
}

function getItemStyles (currentOffset) {
    if (!currentOffset) {
        return {
            display: 'none'
        }
    }

    // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
    var x = currentOffset.x;
    var y = currentOffset.y;
    var transform = `translate(${x}px, ${y}px)`;

    return {
        pointerEvents: 'none',
        transform: transform,
        WebkitTransform: transform
    }
}

class PreviewItem extends React.Component {
  render() {
    if (!this.props.isDragging) {
        return null;
    }

    return (
      <Container item={ this.props.item } style={ getItemStyles(this.props.currentOffset) }>
      </Container>
    )
  }
}

export default DragLayer(collect)(PreviewItem);
