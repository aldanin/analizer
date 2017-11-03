import * as React from 'react'
import * as Theme from './Theme'

import styled, { ThemeProvider } from 'styled-components'

import { StoryData, StoryId, INITIAL_ID } from '../../types/Story'
import { Context } from '../../types/Keylog'
import { ClickData } from '../../types/Screenshot'

import Url from './Url'
import Screenshot from './Screenshot'
import KeyLogger from './KeyLogger'
import FilmStrip from './FilmStrip'
import ControlsPlayer from './ControlsPlayer'
import ControlsSpeed from './ControlsSpeed'
import ControlsTime from './ControlsTime'
import Cursor from './Cursor'

const FRAME_DELAY = 100
const CLICK_TOLLERANCE = 200

const Grid = styled.div`
  background: ${props => props.theme.viewerBackground};
  box-sizing: border-box;

  height: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-rows: minmax(100px, 1fr) 160px;
  grid-template-columns: 20% minmax(100px, 1fr) 20%;
  grid-template-areas: "url main keys"
                         "film film film";
`
const ScreenshotAreaWrapper = styled.div`
  overflow: hidden;
  grid-area: main;
  box-sizing: border-box;
  padding-top: 10px;
`
const UrlAreaWrapper = styled.div`
  grid-area: url;
  padding: 10px 0 0 10px;
  box-sizing: border-box;
  color: ${props => props.theme.arrowsColor};
`
const KeyLoggerAreaWrapper = styled.div`
  grid-area: keys;
  overflow: hidden;
  padding: 10px 10px 0 0;
  box-sizing: border-box;
  color: ${props => props.theme.arrowsColor};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`
const FilmStripAreaWrapper = styled.div`
  grid-area: film;
  background: ${props => props.theme.filmStripBg};
  position: relative;
  text-align: center;
  overflow: hidden;
`
const PlayControlsWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 10px;
  left: 10px;
`
const FilmStripContainer = styled.div`
  background: transparent;
  width: 100%;
  height: 100px;
  position: relative;
  margin-top: 15px;
`

export interface StoryAppViewerProps extends React.Props<StoryAppViewer> {
  stories: StoryData[],
  theme?: Theme.ThemeProps
}
export interface StoryAppViewerState {
  isPlaying: boolean,
  speed: number,
  curStoryId: StoryId,
  curStoryIdx: number,
  curTimeOffset: number,
}

class StoryAppViewer extends React.Component<StoryAppViewerProps, StoryAppViewerState> {

  static defaultProps: Partial<StoryAppViewerProps> = {
    stories: [],
    theme: Theme.defaultTheme
  }

  curStory: StoryData = null
  curContext: Context = null
  curClick: ClickData = null

  lastTickTs: number = 0 // to calculate time passed between ticks
  timer = null

  constructor (props: StoryAppViewerProps) {
    super(props)

    this.state = {
      isPlaying: false,
      speed: 1,
      curStoryId: INITIAL_ID,
      curStoryIdx: -1,
      curTimeOffset: 0,
    }
  }

  componentWillReceiveProps(nextProps: StoryAppViewerProps) {
    this.updatCurStory(nextProps.stories)
  }

  updatCurStory = (stories) => {
    if (stories.length === 0) {
      this.setState({
        isPlaying: false,
        curStoryId: INITIAL_ID,
        curStoryIdx: -1,
      })
    } else {
      // sync idx to id
      const idx = stories.findIndex(story => story.id === this.state.curStoryId)
      if (idx < 0) {
        const newId = stories[0].id
        // stop playback
        this.setState({
          isPlaying: false,
          curStoryIdx: 0,
          curStoryId: newId,
        })
      } else {
        this.setState({
          isPlaying: false,
          curStoryIdx: idx,
        })
      }
    }
  }

  componentDidMount() {
    this.updatCurStory(this.props.stories)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  componentWillUpdate(nextProps: StoryAppViewerProps, nextState: StoryAppViewerState) {
    if (nextState.curStoryIdx < 0) {
      this.curStory = null
      this.curContext = null
      this.curClick = null
    } else {
      this.curStory = this.props.stories[nextState.curStoryIdx]
      this.curContext = this.calcCurContext(this.curStory, nextState.curTimeOffset)
      this.curClick = this.calcCurClick(this.curStory, nextState.curTimeOffset)
    }
  }

  handlePlayClick = () => {
    const newIsPlaying = ! this.state.isPlaying
    if (newIsPlaying && this.state.curStoryId !== INITIAL_ID) {
      this.setState({
        isPlaying: true,
      })
      // start playback
      this.lastTickTs = Date.now()
      requestAnimationFrame(this.tick)
    } else {
      this.setState({
        isPlaying: false,
      })
    }
  }

  handleSkip = (sec) => {
    if (this.state.isPlaying) {
      const newOffset = Math.max(0, Math.min(this.curStory.durationMs, this.state.curTimeOffset + sec * 1000))
      this.setState({
        curTimeOffset: newOffset,
      })
    }
  }

  handleSpeedClick = (speed) => {
    this.setState({
      speed,
    })
  }

  shiftSlide = (delta) => {
    const newIdx = Math.max(0, Math.min(this.state.curStoryIdx + delta, this.props.stories.length - 1))
    if (newIdx === this.state.curStoryIdx) {
      return
    }

    const newId = this.props.stories[newIdx].id
    this.setState({
      curStoryIdx: newIdx,
      curStoryId: newId,
      curTimeOffset: 0,
    })
  }

  tick = () => {
    if (this.state.curStoryId === INITIAL_ID) {
      return
    }
    const { curTimeOffset } = this.state
    const now = Date.now()

    // end of story
    if (curTimeOffset > this.curStory.durationMs) {
      // if (this.curStoryIdx > this.props.stories.length - 2) {
      if (this.state.curStoryIdx === 0) {
        // no more stories - stop playback
        this.setState({
          isPlaying: false,
          curTimeOffset: 0,
        })
      } else {
        // move to next story
        const newIdx = this.state.curStoryIdx - 1
        const newId = this.props.stories[newIdx].id
        this.setState({
          curStoryIdx: newIdx,
          curStoryId: newId,
          curTimeOffset: 0,
        })
      }
    } else {
      const elapsed = now - this.lastTickTs
      this.setState({
        curTimeOffset: curTimeOffset + elapsed * this.state.speed
      })
    }
    this.lastTickTs = now
    if (this.state.isPlaying) {
      this.timer = setTimeout(this.tick, FRAME_DELAY)
      // requestAnimationFrame(this.tick) // too cpu-intensive
    }
  }

  // calculate current keylogger context from story and offset
  calcCurContext = (story: StoryData, timeOffset: number) => {
    if (! story) {
      return null
    }

    // keylog chunk start offset related to story
    let keyLogStartOffset

    const keyLog = story.keyStrokes.find(keyStroke => {
      keyLogStartOffset = keyStroke.timeStart - story.timeStart
      return timeOffset > keyLogStartOffset && timeOffset < keyLogStartOffset + keyStroke.durationMs
    })

    if (keyLog === undefined) {
      return null
    }

    const curContext = keyLog.contexts.find(context => {
      return timeOffset > keyLogStartOffset + context.startOffset &&
        timeOffset < keyLogStartOffset + context.startOffset + context.durationMs
    })

    if (curContext === undefined) {
      return null
    }

    return curContext
  }

  // calculate current click from story and offset
  calcCurClick = (story: StoryData, timeOffset: number) => {
    if (! story) {
      return null
    }

    const curClick = story.screenshot.clicks.find(click => {
      return Math.abs(timeOffset - click.timeOffset) < CLICK_TOLLERANCE
    })

    return curClick
  }

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <Grid>
          <UrlAreaWrapper>
            <Url url={this.curContext ? this.curContext.url : ''}/>
          </UrlAreaWrapper>
          <ScreenshotAreaWrapper>
            <Screenshot
              screenshot={this.curStory ? this.curStory.screenshot : null}
              click={this.curClick}
            />
          </ScreenshotAreaWrapper>
          <KeyLoggerAreaWrapper>
            <KeyLogger
              context={this.curContext}
            />
          </KeyLoggerAreaWrapper>
          <FilmStripAreaWrapper>
            <PlayControlsWrapper>
              <ControlsPlayer
                isPlaying={this.state.isPlaying}
                onSkip={this.handleSkip}
                onPlayPauseClick={this.handlePlayClick}
              />
              {
                this.state.isPlaying ?
                  <ControlsSpeed speed={this.state.speed} onClick={this.handleSpeedClick}/> :
                  null
              }
            </PlayControlsWrapper>
            <ControlsTime
              onPrevClick={() => this.shiftSlide(1)}
              onNextClick={() => this.shiftSlide(-1)}
              currentTime={Date.now()}
            />
            <FilmStripContainer>
              <Cursor/>
              <FilmStrip
                stories={this.props.stories}
                selectedStoryId={this.state.curStoryId}
                time={this.state.curTimeOffset}
                isPlaying={this.state.isPlaying}
              />
            </FilmStripContainer>
          </FilmStripAreaWrapper>
        </Grid>
      </ThemeProvider>
    )
  }
}

export default StoryAppViewer
