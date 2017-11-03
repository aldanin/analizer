import * as React from 'react'
import { StoryData } from '../../types/Story'
import styled from 'styled-components'

const ImgContainer = styled.div`
  display: inline-block;
  height: 100%;
`
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`

// FIXME: colors should come from Theme
const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 2em;
  color: white;
  font-weight: bold;
  text-align: center;
  display: none;
`

export interface SlideProps extends React.Props<Slide> {
  story: StoryData,
  time: number,
}
export interface SlideState {
}

class Slide extends React.Component<SlideProps, SlideState> {
  constructor (props: SlideProps) {
    super(props)

    this.state = {
    }
  }

  render() {
    const {story} = this.props
    if (! story || ! ('screenshot' in story)) {
      return null
    }

    return (
      <ImgContainer>
        {story ?
          <Image
            src={story.screenshot.imageUrl}
            width={story.screenshot.width}
            height={story.screenshot.height}
          /> : null
        }
        <Overlay>
          <h1>slide {this.props.story ? this.props.story.id : null}</h1>
          {this.props.time}
        </Overlay>
      </ImgContainer>
    )
  }
}

export default Slide
