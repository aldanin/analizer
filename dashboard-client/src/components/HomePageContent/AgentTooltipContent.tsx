import * as React from 'react'
import { AgentData } from '../../types/Agent'
import Icon from 'material-ui/FontIcon'
import * as moment from 'moment'
import styled, { withTheme } from 'styled-components'
import * as Theme from './Theme'

export interface AgentTooltipContentProps {
  agent: AgentData
  theme?: Theme.ThemeProps,
}

const Wrapper = styled.div`
  color: ${props => props.theme.dashboard.tooltip.textColor};
  font-weight: lighter;
`

const Title = styled.h2`
  margin: 0;
  border-bottom: 1px solid ${props => props.theme.dashboard.tooltip.highlightColor};
  font-weight: lighter;
  padding-bottom: 10px;
`

const TitleNumber = styled.span`
  float: right;
  font-size: 1.1em;
  color: ${props => props.theme.dashboard.tooltip.textColor};
`

const Section = styled.section`
  border-bottom: 1px solid ${props => props.theme.dashboard.tooltip.highlightColor};
  padding-bottom: 1em;
  margin-bottom: 1em;
`

const SectionTitle = styled.h3`
  font-size: 1em;
  color: ${props => props.theme.dashboard.tooltip.highlightColor};
  font-weight: lighter;
`

const SectionTable = styled.table`
  width: 100%;
`
const IconCell = styled.td`
  color: ${props => props.theme.dashboard.tooltip.highlightColor};
  padding-left: 22px;
  padding-right: 10px;
  &:first-child {
    padding-left: 0;
  }
  width: 10%;
`
const Icon = styled.i`
  font-size: 2.2rem;
`

const LabelCell = styled.td`
  color: ${props => props.theme.dashboard.tooltip.textColor};
  width: 30%;
`

const DataCell = styled.td`
  padding-left: 1.5em;
  width: 10%;
`

const DarkLabelCell = styled.td`
  color: ${props => props.theme.dashboard.tooltip.highlightColor};
  width: 42%;
`

const AgentTooltipContent: React.SFC<AgentTooltipContentProps> = ({ agent }) => {
  const totalUnread = Object.keys(agent.counters).reduce(
    (sum, key) => sum + agent.counters[key],
    0
  )

  return (
    <Wrapper>
      <Title>{agent.name}<TitleNumber>{totalUnread}</TitleNumber></Title>
      <Section>
        <SectionTitle>User Apps</SectionTitle>
        <SectionTable>
          <tbody>
            <tr>
              <IconCell><Icon className="base_icons icon_calls" color="inherit"/></IconCell>
              <LabelCell>Calls</LabelCell>
              <DataCell>{agent.counters.calls}</DataCell>
              <IconCell><Icon className="base_icons icon_social" color="inherit"/></IconCell>
              <LabelCell>Social</LabelCell>
              <DataCell>{agent.counters.socialNetwork}</DataCell>
            </tr>
            <tr>
              <IconCell><Icon className="base_icons icon_im" color="inherit"/></IconCell>
              <LabelCell>IM</LabelCell>
              <DataCell>{agent.counters.im}</DataCell>
              <IconCell><Icon className="base_icons icon_browser" color="inherit"/></IconCell>
              <LabelCell>Browser</LabelCell>
              <DataCell>{agent.counters.browser}</DataCell>
            </tr>
            <tr>
              <IconCell><Icon className="base_icons icon_mail" color="inherit"/></IconCell>
              <LabelCell>Mail</LabelCell>
              <DataCell>{agent.counters.mail}</DataCell>
              <IconCell><Icon className="base_icons icon_gallery" color="inherit"/></IconCell>
              <LabelCell>Gallery</LabelCell>
              <DataCell>{agent.counters.gallery}</DataCell>
            </tr>
            <tr>
              <IconCell><Icon className="base_icons icon_contacts" color="inherit"/></IconCell>
              <LabelCell>Contacts</LabelCell>
              <DataCell>{agent.counters.contacts}</DataCell>
              <IconCell><Icon className="base_icons icon_calendar" color="inherit"/></IconCell>
              <LabelCell>Calendar</LabelCell>
              <DataCell>{agent.counters.calendar}</DataCell>
            </tr>
          </tbody>
        </SectionTable>
      </Section>
      <Section>
        <SectionTitle>Sensors</SectionTitle>
        <SectionTable>
          <tbody>
            <tr>
              <IconCell><Icon className="base_icons icon_pointer" color="inherit"/></IconCell>
              <LabelCell>Activity</LabelCell>
              <DataCell>{agent.counters.activity}</DataCell>
              <IconCell><Icon className="base_icons icon_environmental_audio" color="inherit"/></IconCell>
              <LabelCell>Environmental Audio</LabelCell>
              <DataCell>{agent.counters.envAudio}</DataCell>
            </tr>
            <tr>
              <IconCell><Icon className="base_icons icon_snapshots" color="inherit"/></IconCell>
              <LabelCell>Snapshots</LabelCell>
              <DataCell>{agent.counters.snapshots}</DataCell>
              <IconCell><Icon className="base_icons icon_location" color="inherit"/></IconCell>
              <LabelCell>Locations</LabelCell>
              <DataCell>{agent.counters.locations}</DataCell>
            </tr>
          </tbody>
        </SectionTable>
      </Section>
      <Section>
        <SectionTitle>Device System</SectionTitle>
        <SectionTable>
          <tbody>
            <tr>
              <IconCell><Icon className="base_icons icon_directory" color="inherit"/></IconCell>
              <LabelCell>Directory</LabelCell>
              <DataCell>{agent.counters.directory}</DataCell>
              <IconCell><Icon className="base_icons icon_accounts" color="inherit"/></IconCell>
              <LabelCell>Accounts</LabelCell>
              <DataCell>{agent.counters.accounts}</DataCell>
            </tr>
            <tr>
              <IconCell><Icon className="base_icons icon_Cogwheel" color="inherit"/></IconCell>
              <LabelCell>System Info</LabelCell>
              <DataCell>{agent.counters.systemInfo}</DataCell>
            </tr>
          </tbody>
        </SectionTable>
      </Section>
      <div>
        <SectionTable>
          <tbody>
            <tr>
              <DarkLabelCell>Last Communication</DarkLabelCell>
              <td>{new Date(agent.status.lastCommunication).getUTCDate()}</td>
            </tr>
            <tr>
              <DarkLabelCell>Successful Extractions</DarkLabelCell>
              <td>{agent.status.extractionsSuccesful} of {agent.status.extractionsTotal}</td>
            </tr>
            <tr>
              <DarkLabelCell>Data Usage Last 1d / 7d</DarkLabelCell>
              <td>{agent.status.dataUsageLastDay} mib / {agent.status.dataUsageLastWeek} mib</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
            {agent.expiry > 0 && (
              <tr>
                <DarkLabelCell>{new Date(agent.expiry).getTime() < Date.now() ? 'Expired ' : 'Expires '}</DarkLabelCell>
                <td>{moment(agent.expiry).fromNow()}</td>
              </tr>
            )}
          </tbody>
        </SectionTable>
      </div>
    </Wrapper>
  )
}

export default withTheme(AgentTooltipContent)
