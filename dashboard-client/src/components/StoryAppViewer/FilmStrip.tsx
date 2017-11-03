import * as React from 'react'
import styled from 'styled-components'
import { StoryData, StoryId } from '../../types/Story'
import { ScreenshotData } from '../../types/Screenshot'

const Wrapper = styled.div`
  background: transparent;
  height: 95px;
  min-height: 95px;
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
const TnContainer = styled.div`
  display: inline-block;
  height: 100%;
  margin: 0 3px;
  position: relative;
`
const Image = styled.img`
  height: 100%;
  width: auto;
`
// FIXME: color should come from Theme
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
// FIXME: color and box shadow colors should come from Theme
const KeyStroke = styled.div`
  width: 25%;
  height: 18px;
  border-radius: 9px;
  background: ${props => props.theme.keyLoggerPanelBackground};
  position: absolute;
  bottom: 7px;
  left: 7px;
  color: white;
  line-height: 18px;
  padding: 0 9px;
  box-sizing: border-box;
  text-align: left;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.5);
  &:before {
    content: "\\e932";
    font-family: 'base';
    font-size: 18px;
  }
`
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
  top: -7px;
  right: 5px;
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
  stories: StoryData[],
  selectedStoryId: StoryId,
  time: number,
  isPlaying: boolean,
}
export interface FilmStripState {
}

class FilmStrip extends React.Component<FilmStripProps, FilmStripState> {
  wrapperRef = null
  containerRef = null
  tnRefs = {}
  selectedStoryIdx = -1
  needToUpdatePosition: boolean = false;

  constructor (props: FilmStripProps) {
    super(props)

    this.state = {
    }
  }

  componentWillReceiveProps(nextProps: FilmStripProps) {
    this.selectedStoryIdx = nextProps.stories.findIndex(story => story.id === nextProps.selectedStoryId)
  }

  shouldComponentUpdate(nextProps: FilmStripProps, nextState: FilmStripState) {
    // Don't re-render if only time have changed as this happens at 60fps
    const should = ! (
      this.props.stories === nextProps.stories &&
      this.props.selectedStoryId === nextProps.selectedStoryId &&
      this.props.isPlaying === nextProps.isPlaying
    )

    if (! should ) {
      if (this.props.time !== nextProps.time) {
        // componentDidUpdate won't be called but we need to update the position,
        // so call it explicitly
        this.updatePosition()
      }
    } else {
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
    if (this.tnRefs[this.props.selectedStoryId]) {
      const containerPos = this.containerRef.getBoundingClientRect(),
        tnPos = this.tnRefs[this.props.selectedStoryId].getBoundingClientRect(),
        wrapperPos = this.wrapperRef.getBoundingClientRect()

      const offsetPct = this.props.time / this.props.stories[this.selectedStoryIdx].durationMs

      const trans = - wrapperPos.width / 2 - (tnPos.right - containerPos.right) + tnPos.width * (1 - offsetPct)
      this.containerRef.style.transform = 'translate(' + trans + 'px)'
    }
  }

  renderKeyRanges = (story: StoryData) => {
    return story.keyStrokes.map(stroke => {
      const startPct = Math.ceil((stroke.timeStart - story.timeStart) / story.durationMs * 100)
      const lengthPct = Math.floor(stroke.durationMs / story.durationMs * 100)
      return (
        <KeyStroke key={'keys' + stroke.id} style={{width: lengthPct + '%', left: startPct + '%'}}>
          {stroke.isFavorite ? <Star/> : null}
        </KeyStroke>
      )
    })
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
          className={this.props.isPlaying ? '' : 'paused'}
        >
          {this.props.stories.map(story => (
            <TnContainer
              innerRef={el => {this.tnRefs[story.id] = el}}
              key={story.id}
            >
              <Image
                src={story.screenshot.imageUrl}
                width={story.screenshot.width}
                height={story.screenshot.height}
              />
              <Overlay>
                {this.renderKeyRanges(story)}
                {this.renderClicks(story.screenshot)}
                {story.screenshot.isFavorite ? <Star/> : null}
              </Overlay>
            </TnContainer>
          )).reverse()}
        </Container>
      </Wrapper>
    )
  }
}

export default FilmStrip
