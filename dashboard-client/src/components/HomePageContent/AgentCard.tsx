import * as React from 'react'
import styled from 'styled-components'
import * as Theme from './Theme'

import { CardTitle, CardText } from 'material-ui/Card'

import * as moment from 'moment'

import AgentIcon from './AgentIcon'

import { AgentData } from '../../types/Agent'
import { Link } from 'react-router';
import { buildURL, ViewPage } from '../../urlHelper';

// wrapper component
interface WrapperProps {
  idx: number
}
const Wrapper = styled.div`
  display: inline-block;
  border-left: ${(props: WrapperProps) => (props.idx > 0 ? '1px solid silver' : 'none')};
  position: relative;
  padding: 10px;
  min-width: 244px;
  box-sizing: border-box;
`
const InnerWrapper = styled.div`
  border: 1px solid transparent;
  height: 100%;
  &:hover {
    background-color: ${props => props.theme.dashboard.cardHoverBgColor};
    border: 1px solid ${props => props.theme.dashboard.cardHoverBorderColor};
  }
`

const TitleNumber = styled.span`
  color: ${({theme, disabled}) => (disabled ? theme.dashboard.textColorDisabled : theme.dashboard.textColorCounter)};
  line-height: initial;
`
const DataLine = styled.p`
  margin-bottom: 0;
`
// highlight component
const Highlight = styled.span`
  color: ${({theme, disabled}) => (disabled ? theme.dashboard.textColorDisabled : theme.dashboard.textColorCounter)};
  margin-right: 10px;
`

// grayed component
const Grayed = styled.span`
  color: silver;
  margin-right: 1em;
`

// aligned icon
const AlignedIcon = styled.i`
  margin-left: -3px;
  margin-right: 3px;
  vertical-align: middle;
`

const IconWrap = styled.div`
  float: left;
  color: ${({theme, disabled}) => (disabled ? theme.dashboard.textColorDisabled : theme.dashboard.textColorCounter)};
`

const AlertText = styled.span`
  color: ${props => (props.theme.dashboard.textColorAlert)};
`

export interface AgentCardProps {
  agent: AgentData,
  idx: number,
  theme?: Theme.ThemeProps
}

export const AgentCard: React.SFC<AgentCardProps> = ({ agent, idx }) => {

  const isExpired = new Date(agent.expiry).getTime() < Date.now()
  const FIVE_DAYS_MILIS = 5 * 24 * 60 * 60 * 1000
  const totalUnread = Object.keys(agent.counters).reduce(
    (sum, key) => sum + agent.counters[key],
    0
  )

  function getTitle() {
    return (
      <div>
          <IconWrap disabled={isExpired}>
            <AgentIcon device={agent.deviceType} os={agent.deviceOs} height="40px"/>
          </IconWrap>
          <div style={{display: 'inline-block', marginLeft: '10px'}}>
            <div style={{fontSize: '45%', lineHeight: 'initial'}}>
              {agent.deviceOs}
            </div>
            <div style={{lineHeight: 'initial'}}>
              <TitleNumber disabled={isExpired}>{totalUnread}</TitleNumber>
            </div>
          </div>
        </div>
    )
  }

  function renderExpiryText(expiryTs: number) {
    if (expiryTs <= 0) {
      return 'Non Expiring'
    }
    const deltaS = (expiryTs - Date.now())
    if (deltaS < 0) {
      return 'Expired'
    } else {
      if (deltaS < FIVE_DAYS_MILIS) {
        return <AlertText>Expires {moment(expiryTs).fromNow()}</AlertText>
      } else {
        return ''
      }
    }
  }

  return (

    <Wrapper idx={idx} key={agent.id}>
      <InnerWrapper>
        <Link
          to={buildURL({agent_id: agent.id, viewPage: ViewPage.SUMMARY})}
          style={{textDecoration: 'none'}}
        >
          <CardTitle
            title={getTitle()}
            style={{padding: '8px'}}
          />
          <CardText style={{padding: '8px'}}>
            <DataLine>
              IM <Highlight disabled={isExpired}>{agent.counters.im}</Highlight>
              Calls <Highlight disabled={isExpired}>{agent.counters.calls}</Highlight>
              Mail <Highlight disabled={isExpired}>{agent.counters.mail}</Highlight>
            </DataLine>
            <DataLine>
              <Grayed>
                <AlignedIcon className="material-icons">schedule</AlignedIcon>
                {moment.duration(agent.extractInterval).humanize()}
              </Grayed>
              {renderExpiryText(new Date(agent.expiry).getTime())}
            </DataLine>
          </CardText>
        </Link>
      </InnerWrapper>
    </Wrapper>
  )
}

AgentCard.defaultProps = {
  theme: Theme.defaultTheme,
}
