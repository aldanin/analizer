import * as React from 'react'
import styled from 'styled-components'
import { ScreenshotData, ScreenshotId } from '../../types/Screenshot'
import Slide from './Slide'
import ClickPointer from './ClickPointer'

export interface FilmStripProps extends React.Props<FilmStrip> {
  selectedId: ScreenshotId,
  slides: ScreenshotData[],
  onSlideClick: (id: ScreenshotId) => void,
  loadOlder: (count: number) => void,
  loadNewer: (count: number) => void,
}
export interface FilmStripState {
}

const FilmStripWrapper = styled.div`
  position: relative;
  height: 115px;
  min-height: 115px;
  flex: 0;
  width: 100%;
  background: ${props => props.theme.filmStripBg};
  overflow: hidden;
  box-sizing: border-box;
`

// FIXME: border and bg colors should come from Theme
interface TnWrapperProps {
  selectedBorderColor?: string,
}
const TnWrapper = styled.div`
  display: inline-block;
  height: calc(100% - 8px);
  box-sizing: border-box;
  border-radius: 4px;
  background-color: transparent;
  padding: 5px;
  position: absolute;
  top: 5px;
  left: 0;
  cursor: pointer;
  transition: all 0.5s;
  opacity: 0.7;

  &.isSelected {
    opacity: 1;
    background-color: ${(props: TnWrapperProps) => props.selectedBorderColor || 'white'};
  }
  &.isSelected:after {
    content: ' ';
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin: 0 -5px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid white;
  }

`

class FilmStrip extends React.Component<FilmStripProps, FilmStripState> {
  refContainer = null
  refThumbs = {}

  pos = {} // positions

  constructor (props: FilmStripProps) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
    this.calcPositions()
  }

  shouldComponentUpdate(nextProps: FilmStripProps, nextState: FilmStripState) {
    return (nextState !== this.state)
      || (nextProps.selectedId !== this.props.selectedId)
      || (nextProps.slides.length !== this.props.slides.length)
  }

  componentDidUpdate(prevProps: FilmStripProps, prevState: FilmStripState) {
    this.calcPositions()
  }

  calcPositions = () => {
    const setPosition = (leftPos, itemId) => {
      // this.refThumbs[itemId].style.left = leftPos + 'px'
      this.refThumbs[itemId].style.transform = `translate(${leftPos}px)`
    }

    const SPACE = 10
    let countLoadOlder = 0, countLoadNewer = 0
    const containerWidth = this.refContainer.offsetWidth
    // const containerHeight = this.refContainer.offsetHeight - 10
    const selectedIdx = this.props.slides.findIndex((slide) => slide.id === this.props.selectedId)

    if (selectedIdx < 0) {
      return
    }

    let slideWidth, leftPos, itemId, itemIdx, lastLeft, lastRight

    // position the center item (selected)
    itemIdx = selectedIdx
    itemId = this.props.slides[itemIdx].id

    // calculate slide height (need to be done once)
    const computedStyle = getComputedStyle(this.refThumbs[itemId])
    const slideHeight =
      parseFloat(computedStyle.height)
      - parseFloat(computedStyle.paddingTop)
      - parseFloat(computedStyle.paddingBottom);

    slideWidth = slideHeight / this.props.slides[itemIdx].height * this.props.slides[itemIdx].width
    leftPos = containerWidth / 2 - slideWidth / 2
    this.pos[itemId] = leftPos
    setPosition(leftPos, itemId)
    lastLeft = leftPos
    lastRight = leftPos + slideWidth

    const MAX_LOAD_DISTANCE = 8
    let handled = 1
    let distance = 1
    while (handled < this.props.slides.length) {
      // position left item
      itemIdx = selectedIdx + distance
      if (itemIdx > this.props.slides.length - 1) {
        if (distance < MAX_LOAD_DISTANCE) {
          countLoadOlder++
        }
      } else {
        itemId = this.props.slides[itemIdx].id
        slideWidth = slideHeight / this.props.slides[itemIdx].height * this.props.slides[itemIdx].width
        leftPos = lastLeft - SPACE - slideWidth
        this.pos[itemId] = leftPos
        setPosition(leftPos, itemId)
        lastLeft = leftPos
        handled++
      }

      // position right item
      itemIdx = selectedIdx - distance
      if (itemIdx < 0) {
        if (distance < MAX_LOAD_DISTANCE) {
          countLoadNewer++
        }
      } else {
        itemId = this.props.slides[itemIdx].id
        slideWidth = slideHeight / this.props.slides[itemIdx].height * this.props.slides[itemIdx].width
        leftPos = lastRight + SPACE
        this.pos[itemId] = leftPos
        setPosition(leftPos, itemId)
        lastRight = leftPos + slideWidth
        handled++
      }

      distance++
    }
    // console.log(`need to load: ${countLoadOlder} older, ${countLoadNewer} newer`)
    if (countLoadOlder > 0) {
      this.props.loadOlder(countLoadOlder)
    }
    if (countLoadNewer > 0) {
      this.props.loadNewer(countLoadNewer)
    }
  }

  render() {
    return (
      <FilmStripWrapper innerRef={el => {this.refContainer = el}}>
          {this.props.slides.map((shot, tnIdx) => (
            <TnWrapper
              key={shot.id}
              innerRef={el => {this.refThumbs[shot.id] = el}}
              onClick={() => {this.props.onSlideClick(shot.id)}}
              className={shot.id === this.props.selectedId ? 'isSelected' : ''}
            >
              <Slide imageUrl={shot.imageUrl} width={shot.width} height={shot.height}>
                {shot.clicks.map((click, idx) => (
                  <ClickPointer
                    key={`${idx}.${shot.id}`}
                    top={(click.y / shot.height * 100) + '%'}
                    left={(click.x / shot.width * 100) + '%'}
                    text={shot.clicks.length > 1 ? (idx + 1).toString() : ''}
                  />
                ))}
              </Slide>
            </TnWrapper>
          ))}
        </FilmStripWrapper>
    )
  }
}

export default FilmStrip
