import * as React from 'react'
import styled from 'styled-components'

export enum PointDirection {
  right = 0,
  left = 1,
  center = 2,
}

export interface ChatBubbleProps {
  pointDirection: PointDirection;
  backgroundColor?: string;
  borderColor?: string;
  style?: any;
}

interface ChatBubbleState {
  height?: number;
}

interface BubbleWrapProps {
  bgColor: string;
  borderColor: string;
}

const BubbleWrap = styled.div`
  margin: 5px 40px;
  display: inline-block;
  position: relative;
  width: auto;
  max-width: calc(100% - 80px);
  height: auto;
  border-radius: 5px; 
  padding: 1.2rem 15px 0px 15px; 
  background-color: ${(prop: BubbleWrapProps) => prop.bgColor};
  border: solid 2px ${(prop: BubbleWrapProps) => prop.borderColor};
  
  &::after{
  content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    top: 0px;
    bottom: auto;
    border-style: solid;
    border: 14px solid;
    border-color: ${(prop: BubbleWrapProps) => prop.bgColor} transparent transparent transparent;
  }
  
  &::before{
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    top: -2px;
    bottom: auto;
    border: 16px solid;
    border-color: ${(prop: BubbleWrapProps) => prop.borderColor} transparent transparent transparent;
  }
`;

const LeftBubble = styled(BubbleWrap)`
  border-top-left-radius: 0;
  
  &::after{
    left: -14px;
    right: auto;
  }
  &::before{
    right: auto;
    left: -18px;
  }
`;

const RightBubble = styled(BubbleWrap)`
  border-top-right-radius: 0;
  
  &::after{
    left: auto;
    right: -14px;
  }
  &::before{
    left: auto;
    right: -18px;
  }
`;

const CenterBubble = styled(BubbleWrap)`
  &::after{
  content: ' ';
    display: none;
  }
  
  &::before{
    content: ' ';
    display: none;
  }
`;

const Content = styled.div`
  // padding: 5px 10px;
`;

class ChatBubble extends React.Component<ChatBubbleProps, ChatBubbleState> {
  static defaultProps: Partial<ChatBubbleProps> = {
    pointDirection: PointDirection.left,
    backgroundColor: 'white',
    borderColor: 'silver',
    style: {}
  }
  static defaultState: Partial<ChatBubbleState> = {
    height: 100
  }

  private rootElement;

  constructor(props: ChatBubbleProps) {
    super(props)

  }

  getDimentions = () => {
    return this.state.height;
  }

  componentDidMount() {
    const height = this.rootElement.clientHeight;
    this.setState({height});
  }

  render() {
    let bubble;

    switch (this.props.pointDirection) {
      case PointDirection.left:
        bubble =
          (
            <LeftBubble
              style={this.props.style}
              innerRef={(rootElement) => this.rootElement = rootElement}
              bgColor={this.props.backgroundColor}
              borderColor={this.props.borderColor}
            >
              <Content>
                {this.props.children}
              </Content>
            </LeftBubble>
          )
        break;
      case PointDirection.right:
        bubble =
          (
            <RightBubble
              style={this.props.style}
              innerRef={(rootElement) => this.rootElement = rootElement}
              bgColor={this.props.backgroundColor}
              borderColor={this.props.borderColor}
            >
              <Content>
                {this.props.children}
              </Content>
            </RightBubble>
          )
        break;
      case PointDirection.center:
        bubble =
          bubble =
            (
              <CenterBubble
                style={this.props.style}
                innerRef={(rootElement) => this.rootElement = rootElement}
                bgColor={this.props.backgroundColor}
                borderColor={this.props.borderColor}
              >
                <Content>
                  {this.props.children}
                </Content>
              </CenterBubble>
            )
        break;
      default:
        break;
    }

    return bubble;
  }
}

export default ChatBubble
