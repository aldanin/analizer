import * as React from 'react'
import { ClickData } from '../../types/Screenshot'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  display: inline-block;
  transition: 0.2s transform;
`
const Img = styled.img`
  width: auto;
  height: 100%;
`

export interface SlideProps extends React.Props<Slide> {
  imageUrl: string,
  width: number,
  height: number,
  rotation?: number,
  scale?: number,
  clicks?: ClickData[],
  style?: Object,
}
export interface SlideState {
}

class Slide extends React.Component<SlideProps, SlideState> {
  static defaultProps: Partial<SlideProps> = {
    rotation: 0,
    scale: 1,
    clicks: [],
    style: {},
  }

  // ref
  container
  image

  constructor (props: SlideProps) {
    super(props)

    this.state = {
    }
  }

  componentDidUpdate() {
    // a workaround for Chome's issues with flexbox
    this.container.style.width = this.image.offsetWidth + 'px'
  }

  // calcPctPos = (width, height, x, y) => ({top: (x/width), left: ()})
  getTransform = () => {
    const {scale, rotation} = this.props
    return {
      transform: `scale(${scale}) rotate(${rotation}deg) translate(0, 0)`,
    }
  }

  render() {
    const { imageUrl, width, height, style } = this.props
    const compStyle = Object.assign({}, style, this.getTransform())
    return (
      <Wrapper innerRef={(el) => {this.container = el}} style={compStyle}>
        <Img src={imageUrl} innerRef={(el) => {this.image = el}} width={width} height={height}/>
        {this.props.children}
      </Wrapper>
    )
  }
}

export default Slide
