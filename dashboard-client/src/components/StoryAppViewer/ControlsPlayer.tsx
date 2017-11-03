import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background: ${props => props.theme.controlsPanelBackground};
  display: inline-block;
  height: 35px;
  line-height: 35px;
  padding: 0px 2px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px; 
`

interface SmallIconProps {
  disabled?: boolean,
  theme: any,
}
const SmallIcon = styled.div`
  color: ${(props: SmallIconProps) =>
    props.disabled ?
    props.theme.controlsPanelDisabledTextColor :
    props.theme.controlsPanelTextColor};
  font-size: 22px;
  display: inline-block;
  cursor: ${(props: SmallIconProps) => props.disabled ? 'auto' : 'pointer'};
  height: 24px;
  width: 24px;
  line-height: 24px;
  text-align: center;
  vertical-align: middle;
  margin: 0 5px;
`
const BigIcon = styled.div`
  color: ${props => props.theme.controlsPanelTextColor};
  font-size: 43px;
  display: inline-block;
  cursor: pointer;
  width: 45px;
  height: 45px;
  line-height: 45px;
  vertical-align: middle;
  border-radius: 50%;
  padding: 2px;
  background: ${props => props.theme.controlsPanelBackground};
`

export interface ControlsPlayerProps {
  isPlaying: boolean,
  onPlayPauseClick: () => void,
  onSkip: (seconds: number) => void,
}

const ControlsPlayer: React.SFC<ControlsPlayerProps> = ({ isPlaying, onPlayPauseClick, onSkip }) => {
  return (
    <Container>
      <SmallIcon
        className="base_icons icon_player_back_10"
        onClick={() => isPlaying && onSkip(-10)}
        disabled={!isPlaying}
      />
      <SmallIcon
        className="base_icons icon_player_back_5"
        onClick={() => isPlaying && onSkip(-5)}
        disabled={!isPlaying}
      />
      <BigIcon className="material-icons" onClick={onPlayPauseClick}>
        {isPlaying ? 'pause_circle_outline' : 'play_circle_outline'}
      </BigIcon>
      <SmallIcon
        className="base_icons icon_player_fw_5"
        onClick={() => isPlaying && onSkip(5)}
        disabled={!isPlaying}
      />
      <SmallIcon
        className="base_icons icon_player_fw_10"
        onClick={() => isPlaying && onSkip(10)}
        disabled={!isPlaying}
      />
    </Container>
  )
}

export default ControlsPlayer
