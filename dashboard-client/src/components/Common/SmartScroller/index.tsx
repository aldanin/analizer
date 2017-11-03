import * as React from 'react'
import * as ReactDom from 'react-dom'
import styled from 'styled-components'
import { ReactInstance } from 'react';
import ReactResizeDetector from 'react-resize-detector'

const Container = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const SCROLLTOP_OVERHEAD = 50;

export interface SmartScrollerProps extends React.Props<SmartScroller> {
  withTop?: boolean,
  onBottomReach: () => void,
  onTopReach?: () => void,
  fetchedFirstPage?: boolean, // used only when withTop is true
  scrollToSelectedRow?: boolean,
  scrollToComponent?: ReactInstance,
  onScrollerStateChange?: (isHidden: boolean) => void, // Used when scroll height is less than the scroller height
}

export interface SmartScrollerState {
  isHidden: boolean
}

class SmartScroller extends React.Component<SmartScrollerProps, SmartScrollerState> {
  static defaultProps: Partial<SmartScrollerProps> = {
    withTop: false,
    onTopReach: () => null,
    fetchedFirstPage: false,
    scrollToSelectedRow: null,
    scrollToComponent: null,
    onScrollerStateChange: (isHidden: boolean) => null,
  }

  private containerDiv;
  private firstChild: HTMLElement;
  private scrollingIntoViewTop: boolean = false;

  constructor(props: SmartScrollerProps) {
    super(props);

    this.state = {
      isHidden: false,
    }
  }

  ensureComponentVisible = (component: ReactInstance) => {
    var domNode = ReactDom.findDOMNode(component)
    if (domNode) {
      this.scrollElementIntoViewIfNeeded(domNode);
    }
  }

  scrollElementIntoViewIfNeeded = domNode => {
    // If element is in top position, we would like to scrolltop ALMOST to it, as to
    // not trigger "scroller reached the top" event:
    //
    this.containerDiv.scrollTop = domNode.offsetTop - domNode.clientHeight;

    this.scrollingIntoViewTop = true;
  }

  onScroll = (ev) => {
    const scrollTop = this.containerDiv.scrollTop;
    if (scrollTop === 0 && this.props.withTop) {
      if (this.scrollingIntoViewTop) {
        this.scrollingIntoViewTop = false;
        this.containerDiv.scrollTop = SCROLLTOP_OVERHEAD;
      } else {
        this.firstChild = this.containerDiv.firstChild;
        this.props.onTopReach();
        if (!this.props.fetchedFirstPage) {
          //
          // At this point, reaching the top scroller position means fetching a descending (previous) page.
          // We want to accommodate this behaviour by lowering the scroller position to an up-scrollable position,
          // for smooth action:
          //
          this.containerDiv.scrollTop = SCROLLTOP_OVERHEAD;
        }
      }
    }

    if (this.containerDiv.scrollHeight - 70 < scrollTop + this.containerDiv.clientHeight) {
      this.firstChild = null;

      this.props.onBottomReach();
    }
  }

  onContentResize = () => {

    if (this.containerDiv && this.containerDiv.scrollHeight <= this.containerDiv.clientHeight) {
      if (!this.state.isHidden) {
        this.setState({isHidden: true});
        this.props.onScrollerStateChange(true);
      }
    } else {
      if (this.state.isHidden) {
        this.setState({isHidden: false});
        this.props.onScrollerStateChange(false);
      }
    }
  }

  componentDidUpdate(prevProps: SmartScrollerProps, prevState: SmartScrollerState) {
    if (this.props.scrollToComponent && this.props.scrollToComponent !== prevProps.scrollToComponent) {
      this.ensureComponentVisible(this.props.scrollToComponent);
    }

    this.onContentResize();
  }

  componentDidMount() {
    this.ensureComponentVisible(this.props.scrollToComponent);

    this.onContentResize();
  }

  render() {
    return (

      <Container
        innerRef={(thisDiv) => {
          this.containerDiv = thisDiv
        }}
        onScroll={this.onScroll}
      >
        <ReactResizeDetector handleWidth={false} handleHeight={true} onResize={this.onContentResize}/>
        {this.props.children}
      </Container>
    )
  }
}

export default SmartScroller
