import * as React from 'react'
import styled from 'styled-components'
import { StyledComponentClass } from 'styled-components'
import { Link } from 'react-router'

const Container = styled.div`
  background: ${props => props.theme.urlPanelBackground};
  display: inline-block;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
`
const Header = styled.div`

`
const Body = styled.div`
  margin: 10px 0;
`
const Footer = styled.div`
  text-align: right;
`
const Title = styled.span`
  color: ${props => props.theme.urlPanelTitleColor};
`
const Content = styled.div`
  background: white;
  color: ${props => props.theme.textColor};
  border: ${props => props.theme.urlPanelContentBorder};
  padding: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.linkColor};
` as StyledComponentClass<{to: string}, any>

export interface UrlProps {
  url: string,
}

const Url: React.SFC<UrlProps> = ({ url }) => {
  return (
    <Container>
      <Header>
        <Title>URL</Title>
      </Header>
      <Body>
        <Content title={url}>
          {url}&nbsp;
        </Content>
      </Body>
      <Footer>
        <StyledLink to="/">
          View in Browser History &gt;
        </StyledLink>
      </Footer>
    </Container>
  )
}

export default Url
