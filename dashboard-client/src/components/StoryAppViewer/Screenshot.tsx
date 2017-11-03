import * as React from 'react'
import styled from 'styled-components'
import { StyledComponentClass } from 'styled-components'
import { Link } from 'react-router'
import { ScreenshotData, ClickData } from '../../types/Screenshot'

const Container = styled.div`
  background: ${props => props.theme.slidePanelBackground};
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Header = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`
const Body = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
  position: relative;
`
const Title = styled.span`
  color: ${props => props.theme.slidePanelTitleColor};
`
const HeaderLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.linkColor};
` as StyledComponentClass<{to: string}, any>

// FIXME: box shadow color should come from Theme
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border: ${props => props.theme.slidePanelContentBorder};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
`
interface DotProps {
  size: string,
}

// FIXME: colors should come from Theme
const StyledDot = styled.div`
  color: ${props => props.theme.clickDot ? props.theme.clickDot.textColor : 'white'};
  font-weight: bold;
  font-size: 1.8rem;
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 0;
  left: 0;
  margin-left: -${(props: DotProps)  => props.size};
  margin-top: -${(props: DotProps)  => props.size};
  width: ${(props: DotProps)  => props.size};
  height: ${(props: DotProps) => props.size};
  border-radius: 50%;
  background-color: ${props => props.theme.clickDot ? props.theme.clickDot.bgColor : 'rgba(0,0,255,0.5)'};
  padding: 15px;
  box-shadow: 0 0 15px rgba(0,0,0,0.7);
  transition: transform 250ms cubic-bezier(.24,1,.48,1);
  &::after {
    content: ' ';
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.clickDot ? props.theme.clickDot.bgColor : 'rgba(0,0,255,0.2)'};
    display: block;
    text-align: center;
    line-height: ${(props: DotProps) => props.size};
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(0,0,0,0.5);
  }
` as any

export interface ScreenshotProps extends React.Props<Screenshot> {
  screenshot: ScreenshotData,
  click: ClickData,
}
export interface ScreenshotState {
}

class Screenshot extends React.Component<ScreenshotProps, ScreenshotState> {
  $imgContainer = null
  $img = null
  $dot = null
  imgPos = null

  constructor (props: ScreenshotProps) {
    super(props)

    this.state = {
    }
  }

  componentDidUpdate(prevProps: ScreenshotProps) {
    if (this.props.click !== prevProps.click) {
      this.positionDot()
    }
  }

  handleImageLoaded = (ev: React.SyntheticEvent<HTMLImageElement>) => {
    if (this.$img) {
      this.imgPos = this.$img.getBoundingClientRect()
    } else {
      this.imgPos = null
    }
    this.positionDot()
  }

  positionDot = () => {
    const {click, screenshot} = this.props

    if (click && this.$dot && this.imgPos) {
      const imgPos = this.$img.getBoundingClientRect()
      const contPos = this.$imgContainer.getBoundingClientRect()
      const left = click.x / screenshot.width * imgPos.width + imgPos.left - contPos.left
      const top = click.y / screenshot.height * imgPos.height + imgPos.top - contPos.top
      this.$dot.style.transform = 'scale(1)'
      this.$dot.style.left = left + 'px'
      this.$dot.style.top = top + 'px'
    } else {
      this.$dot.style.transform = 'scale(0)'
    }
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>Screenshot</Title>
          <HeaderLink to="/">
            View in Screenshots >
          </HeaderLink>
        </Header>
        <Body
          innerRef={el => this.$imgContainer = el}
        >
          <Image
            innerRef={el => this.$img = el}
            src={this.props.screenshot ? this.props.screenshot.imageUrl : ''}
            onLoad={this.handleImageLoaded}
          />
          <StyledDot
            innerRef={el => this.$dot = el}
            style={{top: -50, left: -50}}
            size="40px"
          />
        </Body>
      </Container>
    )
  }
}

export default Screenshot
