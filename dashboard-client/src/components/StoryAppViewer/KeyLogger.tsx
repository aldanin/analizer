import * as React from 'react'
import styled from 'styled-components'
import { StyledComponentClass } from 'styled-components'
import { Link } from 'react-router'
import { Context } from '../../types/Keylog'

// FIXME: color should come from Theme
const Container = styled.div`
  background: ${props => props.theme.keyLoggerPanelBackground};
  color: white,
  display: inline-block;
  padding: 10px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
`
const Header = styled.div`
  width: 100%;
  box-sizing: border-box;
`
const Body = styled.div`
  margin: 10px 0;
  flex: 1;
`
const Footer = styled.div`
`
const Title = styled.span`
  color: ${props => props.theme.keyLoggerTitleColor};
`
// FIXME: bg color should come from Theme
const Content = styled.div`
  background: white;
  border: ${props => props.theme.keyLoggerPanelContentBorder};
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
  color: ${props => props.theme.textColor};
`

const RightLink = styled(Link)`
  float: right;
  text-decoration: none;
  color: ${props => props.theme.linkColor};
` as StyledComponentClass<{to: string}, any>

const ContextArea = styled.span`
  color: ${props => props.theme.keyLoggerContextColor};
`

export interface KeyLoggerProps {
  context: Context,
}

const getProcessIcon = (context) => {
  if (! context) {
    return <i/>
  }
  return <i className="base_icons icon_chrome"/>
}

const KeyLogger: React.SFC<KeyLoggerProps> = ({ context }) => {
  return (
    <Container>
      <Header>
        <Title>Key Logger</Title>
      </Header>
      <Body>
        <Content>
          {context ? context.content : ''}
        </Content>
      </Body>
      <Footer>
        <ContextArea>
          In {getProcessIcon(context)} {context ? context.process : 'Unknown Process'}
        </ContextArea>
        <RightLink to="/">
          View in Key Logger >
        </RightLink>
      </Footer>
    </Container>
  )
}

KeyLogger.defaultProps = {
  contextIcon: null,
} as Partial<KeyLoggerProps>

export default KeyLogger
