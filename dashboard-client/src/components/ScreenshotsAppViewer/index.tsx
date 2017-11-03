import * as React from 'react'
import InfoBar from './InfoBar'
import Slide from './Slide'
import SlideMenu from './SlideMenu'
import Dialog from 'material-ui/Dialog'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import ClickDot from './ClickDot'
import FilmStrip from './FilmStrip02'
import * as Theme from './Theme'
import { ScreenshotData, ScreenshotId } from '../../types/Screenshot'
import { Filters } from '../../types/GenericFilters'
import { TagId } from '../../types/Tag'

import { StdProductActions } from '../../helpers/StdProductActionsFunctory'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 5;
  overflow: hidden;
  height: 100%;
`
const SlideAreaWrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex: 5;
  height: 100%;

  background: ${props => props.theme.slideBg};
`
const SlideContainer = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`

const PrevArrow = styled.div`
  font-size: 3rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 130px;
  height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.arrowsColor};
  cursor: pointer;
`
const NextArrow = styled.div`
  font-size: 3rem;
  position: absolute;
  top: 0;
  right: 0;
  width: 130px;
  height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.arrowsColor};
  cursor: pointer;
`
const SlideMenuContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 10;
`

// FIXME: box shadow color should come from Theme
const ZoomImg = styled.img`
  max-width: 75vw;
  max-height: 75vh;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  width: auto;
  height: auto;
`

// FIXME: Colors should come from Theme
const ZoomCloseButton = styled.div`
  width: 20px;
  height: 20px;
  background: red;
  position: absolute;
  top: 40px;
  right: 40px;
  color: white;
  background: ${props => props.theme.dialogCloseBtnBg};
  border-radius: 50%;
  font-size: 0.9rem;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
`
const FilmStripContainer = styled.div`
  background: ${props => props.theme.filmStripBg};
  position: relative;
  text-align: center;
  overflow: hidden;

  position: relative;
  height: 95px;
  min-height: 95px;
  flex: 0;
  width: 100%;
  background: ${props => props.theme.filmStripBg};
  overflow: hidden;
  box-sizing: border-box;
`

export interface ScreenshotsProps extends React.Props<Screenshots> {
  slides: ScreenshotData[],
  isFetching: boolean,
  hasOlder: boolean,
  hasNewer: boolean,
  loadInitialData: () => void,
  loadMoreData: (isOlder: boolean) => void, // TODO
  setFilters: (filters: Filters) => void, // TODO
  theme?: Theme.ThemeProps

  setFavorite: (id: ScreenshotId, isFavorite: boolean) => void,
  removeTag: (itemID: ScreenshotId, tagId: TagId) => void,
  stdActions: StdProductActions,
}
export interface ScreenshotsState {
  selectedId: ScreenshotId,
  isZoomed: boolean,
  scale: number,
  rotation: number,
}

class Screenshots extends React.Component<ScreenshotsProps, ScreenshotsState> {
  static defaultProps: Partial<ScreenshotsProps> = {
    theme: Theme.defaultTheme
  }

  selectedIdx

  constructor (props: ScreenshotsProps) {
    super(props)

    this.state = {
      selectedId: props.slides.length > 0 ? props.slides[0].id : -1,
      isZoomed: false,
      scale: 1.0,
      rotation: 0,
    }
    this.selectedIdx = props.slides.length > 0 ? 0 : -1
  }

  updateSelectedIdx = (slides, id = this.state.selectedId) => {
    this.selectedIdx = slides.findIndex((slide) => slide.id === id)
  }

  componentWillReceiveProps(nextProps: ScreenshotsProps) {
    this.updateSelectedIdx(nextProps.slides)
    if ((this.state.selectedId < 0 || this.selectedIdx < 0) && nextProps.slides.length > 0) {
      this.selectedIdx = 0
      this.setState({
        selectedId: nextProps.slides[0].id
      })
    }
  }

  componentDidMount() {
    if (this.props.slides.length === 0 && !this.props.isFetching) {
      // this.props.loadInitialData()
    }
  }

  handleSlideChange = (delta) => {
    const newIdx = this.selectedIdx + delta
    if (newIdx > this.props.slides.length - 1 || newIdx < 0) {
      return
    }
    this.setState({
      selectedId: this.props.slides[newIdx].id,
      rotation: 0,
      scale: 1,
    })
    this.selectedIdx = newIdx
  }

  handleTnClick = (id: ScreenshotId) => {
    this.updateSelectedIdx(this.props.slides, id)
    this.setState({
      selectedId: id,
      rotation: 0,
      scale: 1,
    })
  }

  handleZoomOpen = () => {
    this.setState({
      isZoomed: true,
    })
  }
  handleZoomClose = () => {
    this.setState({
      isZoomed: false,
    })
  }
  handleRotateClick = () => {
    this.setState({
      rotation: (this.state.rotation - 90) % 360,
    })
  }
  changeZoom = (delta) => {
    this.setState({
      scale: Math.min(Math.max(this.state.scale + delta, 0.5), 5),
    })
  }

  handleLoadMoreOlder = () => {
    if (! this.props.isFetching && this.props.hasOlder) {
      this.props.loadMoreData(true)
    }
  }
  handleLoadMoreNewer = () => {
    if (! this.props.isFetching && this.props.hasNewer) {
      this.props.loadMoreData(false)
    }
  }

  render() {
    if (this.props.slides.length === 0) {
      if (this.props.isFetching) {
        return (
          <Wrapper>
            Loading slides...
          </Wrapper>
        )
      } else {
        return (
          <Wrapper>
            No screenshots found
          </Wrapper>
        )
      }
    }
    if (! (this.selectedIdx in this.props.slides)) {
      return (
        <Wrapper>
          Selected slide not found
        </Wrapper>
      )
    }

    const slideData = this.props.slides[this.selectedIdx]
    return (
      <ThemeProvider theme={this.props.theme}>
        <Wrapper>
          <InfoBar
            item={slideData}
            setFavorite={this.props.setFavorite}
            removeTag={this.props.removeTag}
            stdActions={this.props.stdActions}
          />
          <SlideAreaWrapper>
            <PrevArrow onClick={() => {this.handleSlideChange(1)}}>
              <i className="base_icons icon_arrow_left"/>
            </PrevArrow>
            <SlideContainer>
              <Slide
                imageUrl={slideData.imageUrl}
                width={slideData.width}
                height={slideData.height}
                style={{boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)'}}
                scale={this.state.scale}
                rotation={this.state.rotation}
              >
                {slideData.clicks.map((click, idx) => (
                  <ClickDot
                    key={idx}
                    top={(click.y / slideData.height * 100) + '%'}
                    left={(click.x / slideData.width * 100) + '%'}
                    text={slideData.clicks.length > 1 ? (idx + 1).toString() : ''}
                    clickTime={click.timestamp}
                    intervalTime={click.timeOffset}
                  />
                ))}
              </Slide>
            </SlideContainer>
            <NextArrow onClick={() => {this.handleSlideChange(-1)}}>
              <i className="base_icons icon_arrow_right"/>
            </NextArrow>
            <SlideMenuContainer>
              <SlideMenu
                onZoomClick={this.handleZoomOpen}
                onRotateClick={this.handleRotateClick}
                onZoomInClick={() => this.changeZoom(0.5)}
                onZoomOutClick={() => this.changeZoom(-0.5)}
              />
            </SlideMenuContainer>
          </SlideAreaWrapper>
          <FilmStripContainer>
            <FilmStrip
              slides={this.props.slides}
              selectedId={this.state.selectedId}
              onSlideClick={this.handleTnClick}
              loadOlder={this.handleLoadMoreOlder}
              loadNewer={this.handleLoadMoreNewer}
            />
          </FilmStripContainer>
          <Dialog
            open={this.state.isZoomed}
            onRequestClose={this.handleZoomClose}
            contentStyle={{display: 'inline-block', maxWidth: '100%', width: 'auto'}}
            bodyStyle={{padding: '10px', lineHeight: '0'}}
            style={{textAlign: 'center'}}
          >
            <ZoomCloseButton
              onClick={this.handleZoomClose}
            >
              <i className="base_icons icon_collapse"/>
            </ZoomCloseButton>
            <ZoomImg src={slideData.imageUrl} width={slideData.width} height={slideData.height}/>
          </Dialog>
        </Wrapper>

      </ThemeProvider>
    )
  }
}

export default Screenshots
