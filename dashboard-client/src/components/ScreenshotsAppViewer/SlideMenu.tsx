import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
`
// FIXME: box shadow color should come from Theme
const Group = styled.div`
  font-size: 1.2rem;
  background: ${props => props.theme.controlsBg};
  color: ${props => props.theme.controlsTextColor};
  border-radius: 3px;
  box-shadow: -2px 2px 3px rgba(0,0,0,0.25);
  margin-left: 5px;
  padding: 5px 7px;
  border: none;
  display: inline-block;
`
const Button = styled.button`
  background: transparent;
  border: none;
  padding: 0;
`

const Icon = styled.i`
`
const Separator = styled.span`
  padding: 0 4px;
`

export interface SlideMenuProps {
  onZoomClick: () => void,
  onRotateClick: () => void,
  onZoomInClick: () => void,
  onZoomOutClick: () => void,
}

const SlideMenu: React.SFC<SlideMenuProps> = (props) => {
  return (
    <Wrapper>
      <Group>
        <Button onClick={props.onZoomClick}>
          <Icon className="base_icons icon_expand"/>
        </Button>
      </Group>
      <Group>
        <Button onClick={props.onRotateClick}>
          <Icon className="base_icons icon_rotate_image"/>
        </Button>
      </Group>
      <Group>
        <Button onClick={props.onZoomInClick}>
          <Icon className="base_icons icon_zoom_in"/>
        </Button>
        <Separator>|</Separator>
        <Button onClick={props.onZoomOutClick}>
          <Icon className="base_icons icon_zoom_out"/>
        </Button>
      </Group>
    </Wrapper>
  )
}

export default SlideMenu
