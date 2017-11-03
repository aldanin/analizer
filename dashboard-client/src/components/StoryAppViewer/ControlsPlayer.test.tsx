import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ControlsPlayer from './ControlsPlayer';
import { ControlsPlayerProps } from './ControlsPlayer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ControlsPlayerProps = {
    isPlaying: true,
    onPlayPauseClick: () => null,
    onSkip: (seconds) => null,
  }

  ReactDOM.render(<ControlsPlayer {...props}/>, div);
});
