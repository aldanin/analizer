import * as React from 'react'
import styled from 'styled-components'
import { ScreenshotData, ScreenshotId } from '../../types/Screenshot'

const SELECTED_BORDER_WIDTH = 5

const Wrapper = styled.div`
  background: transparent;
  height: 100%;
  min-height: 100%;
  width: 100%;
  position: relative;
`
const Container = styled.div`
  height: 100%;
  position: absolute;
  right: 0;
  text-align: right;
  white-space: nowrap;
  &.paused {
    transition: all 100ms;
  }
  transition: all 100ms;
`
interface TnContainerProps {
  selectedBorderColor?: string,
}

// FIXME: border and bg color should come from Theme
const TnContainer = styled.div`
  display: inline-block;
  height: calc(100% - ${2 * SELECTED_BORDER_WIDTH}px);
  box-sizing: border-box;
  border-radius: ${SELECTED_BORDER_WIDTH}px;
  background-color: transparent;
  padding: ${SELECTED_BORDER_WIDTH}px;

  cursor: pointer;
  opacity: 0.7;
  margin: ${SELECTED_BORDER_WIDTH}px 0;
  position: relative;

  transition: 0.3s opacity;

  &:hover {
    opacity: 1.0;
    transition: 0.1s opacity;
  }

  &.isSelected {
    opacity: 1;
    background-color: ${(props: TnContainerProps) => props.selectedBorderColor || 'white'};
  }
  &.isSelected:after {
    content: ' ';
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin: 0 -${SELECTED_BORDER_WIDTH}px;
    border-left: ${SELECTED_BORDER_WIDTH}px solid transparent;
    border-right: ${SELECTED_BORDER_WIDTH}px solid transparent;
    border-bottom: ${SELECTED_BORDER_WIDTH}px solid white;
  }
`
const Image = styled.img`
  height: 100%;
  width: auto;
`
// FIXME: Color should come from Theme
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
`
// indicators
// FIXME: border color should come from Theme
const Click = styled.div`
  position: absolute;
  top: 10%;
  left: 10%;
  margin-left: -7px;
  margin-top: -7px;
  background-color: ${props => props.theme.clickDot.bgColor};
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid white;
`
// FIXME: bg and box shadow color should come from Theme
const Star = styled.div`
  position: absolute;
  top: -4px;
  right: 10px;
  background-color: white;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  color: ${props => props.theme.clickDot.bgColor};
  line-height: 14px;
  text-align: center;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
  &:before {
    content: "\\2605";
    font-size: 11px;
    vertical-align: middle;
  }
`

export interface FilmStripProps extends React.Props<FilmStrip> {
  slides: ScreenshotData[],
  selectedId: ScreenshotId,
  onSlideClick: (id: ScreenshotId) => void,
  loadOlder: (count: number) => void,
  loadNewer: (count: number) => void,
}
export interface FilmStripState {
}

class FilmStrip extends React.Component<FilmStripProps, FilmStripState> {
  wrapperRef = null
  containerRef = null
  tnRefs = {}
  selectedIdx = -1
  needToUpdatePosition: boolean = false;

  constructor (props: FilmStripProps) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
    this.updatePosition()
  }

  componentWillReceiveProps(nextProps: FilmStripProps) {
    this.selectedIdx = nextProps.slides.findIndex(story => story.id === nextProps.selectedId)
  }

  shouldComponentUpdate(nextProps: FilmStripProps, nextState: FilmStripState) {
    const should = ! (
      this.props.slides === nextProps.slides &&
      this.props.selectedId === nextProps.selectedId
    )

    if (should ) {
      // position update will happen via componentDidUpdate
      this.needToUpdatePosition = true
    }

    return should
  }

  componentDidUpdate() {
    if (this.needToUpdatePosition) {
      this.updatePosition()
      this.needToUpdatePosition = false
    }
  }

  updatePosition = () => {
    if (this.tnRefs[this.props.selectedId]) {
      const wrapperPos = this.wrapperRef.getBoundingClientRect(),
        containerPos = this.containerRef.getBoundingClientRect(),
        tnPos = this.tnRefs[this.props.selectedId].getBoundingClientRect()

      const offsetPct = 0.5 // center

      const trans = - wrapperPos.width / 2 - (tnPos.right - containerPos.right) + tnPos.width * (1 - offsetPct)
      this.containerRef.style.transform = 'translate(' + trans + 'px)'

      // check if we need to load more items
      const rightDelta = trans,
        leftDelta = - (wrapperPos.width - containerPos.width + trans)
      // console.log('left: ', leftDelta, 'right: ', rightDelta)
      if (rightDelta < wrapperPos.width * 0.25) {
        this.props.loadNewer(3)
      }
      if (leftDelta < wrapperPos.width * 0.25) {
        this.props.loadOlder(3)
      }
    }
  }

  renderClicks = (screenshot: ScreenshotData) => {
    return screenshot.clicks.map(click => {
      const leftPct = Math.round(click.x / screenshot.width * 100)
      const topPct = Math.round(click.y / screenshot.height * 100)
      return (
        <Click key={'click' + click.timeOffset} style={{left: leftPct + '%', top: topPct + '%'}}/>
      )
    })
  }

  render() {
    return (
      <Wrapper innerRef={el => {this.wrapperRef = el}}>
        <Container
          innerRef={el => {this.containerRef = el}}
        >
          {this.props.slides.map(slide => (
            <TnContainer
              innerRef={el => {this.tnRefs[slide.id] = el}}
              key={slide.id}
              onClick={() => {this.props.onSlideClick(slide.id)}}
              className={slide.id === this.props.selectedId ? 'isSelected' : ''}
            >
              <Image
                src={slide.imageUrl}
                width={slide.width}
                height={slide.height}
              />
              <Overlay>
                {/*slide.id*/}
                {this.renderClicks(slide)}
                {slide.isFavorite ? <Star/> : null}
              </Overlay>
            </TnContainer>
          )).reverse()}
        </Container>
      </Wrapper>
    )
  }
}

export default FilmStrip
