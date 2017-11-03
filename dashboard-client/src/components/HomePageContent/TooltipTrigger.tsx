import * as React from 'react'

export interface TooltipTriggerProps {
  onShow: React.EventHandler<any>,
  onHide: React.EventHandler<any>,
}

class TooltipTrigger extends React.Component<TooltipTriggerProps, {}> {
  containerEl

  constructor (props: TooltipTriggerProps) {
    super(props)

    this.onWindowClick = this.onWindowClick.bind(this)
  }

  onWindowClick(ev: MouseEvent) {
    if (this.containerEl.contains(ev.target)) {
      // Clicked in box
      // Do nothing
    } else {
      // Clicked outside the box
      this.props.onHide(ev)
    }
  }

  componentDidMount() {
    window.addEventListener('click', this.onWindowClick);
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  render() {
    const { onShow, onHide, children } = this.props
    return (
      <div
        style={{display: 'inline-block'}}
        onMouseEnter={onShow}
        onMouseLeave={onHide}
        ref={el => this.containerEl = el}
      >
        {children}
      </div>
    )
  }
}

export default TooltipTrigger
