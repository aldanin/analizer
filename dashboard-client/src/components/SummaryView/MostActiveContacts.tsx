import * as React from 'react'
import * as Theme from './Theme'
import styled from 'styled-components';
import Avatar from 'material-ui/Avatar';
import ActiveContactsStatus from './ActiveContactsStatus';
import { MostActiveContactsData } from '../../types/Summary';
import MostActiveContactInfo from './MostActiveContactInfo';
import * as Tooltip from 'rc-tooltip';

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const Title = styled.span`
  font-size: 14px;
  margin-top: 10px;
  padding-right: 30px;
  text-indent: 20px;
  padding-bottom: 20px;
`;

const ContactsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 380px;
  height: 390px;
`;

const ContactRow = styled.div`
  display: flex;
  height: 34px;
  margin-bottom: 6px;
  padding: 0 4.5rem;
  border-sizing: border-box;
`;

const AvatarContainer = styled.span`
  display: inline-block;
  width: 50px;
`;

const ContactName = styled.span`
  display: inline-block;
  width: 150px;
  white-space: nowrap;
  overflow:hidden !important;
  text-overflow: ellipsis;
  line-height: 35px;
  font-size: 14px;
  margin-left: 10px;
  margin-right: 30px;
`;

const InfoBlock = styled.div`
  display: inline-block;
  width: 100%;
`;

const style = {
  contactAvatar: {
    maxHeight: '34px',
    width: 'auto',
    height: 'auto',
  },
  tooltip: {
    padding: 0,
  }
}

export interface MostActiveContactsProps extends React.Props<MostActiveContacts> {
  data: MostActiveContactsData[];
  contactFilter: number;
  onSortOptionSelect: (sortFilter: number) => void;
  theme?: Theme.ThemeProps;
}
export interface MostActiveContactsState {
  infoTooltipOpenedIndex: number;
}

class MostActiveContacts extends React.Component<MostActiveContactsProps, MostActiveContactsState> {

  static defaultProps: Partial<MostActiveContactsProps> = {
    theme: Theme.defaultTheme
  }

  constructor (props: MostActiveContactsProps) {
    super(props)

    this.state = {
      infoTooltipOpenedIndex: -1,
    }
  }

  handleInfoTooltipWindow(index: number, isOpen: boolean) {
    if (isOpen) {
      this.setState({infoTooltipOpenedIndex: index})
    } else {
      this.setState({infoTooltipOpenedIndex: -1})
    }
  }

  render() {
    const maxWidthIndicator = this.props.data[0].bar.calls + this.props.data[0].bar.im + this.props.data[0].bar.mails;
    return (
      <ViewContainer>
          <Title>Most Active Contacts</Title>
        <ContactsContainer>
          {this.props.data.map((contact, idx) => {
            return (
              <ContactRow key={idx}>
                  <AvatarContainer>
                    <Avatar
                      src={contact.avatar}
                      style={style.contactAvatar}
                    />
                  </AvatarContainer>
                  <ContactName title={contact.name}>{contact.name}</ContactName>
                  <Tooltip
                    placement="top"
                    overlayStyle={style.tooltip}
                    onVisibleChange={(isOpen: boolean) => {this.handleInfoTooltipWindow(idx, isOpen)}}
                    overlay={(
                      <MostActiveContactInfo
                        avatar={(
                          <AvatarContainer>
                            <Avatar
                              src={contact.avatar}
                              style={style.contactAvatar}
                            />
                          </AvatarContainer>)}
                        contactName={contact.name}
                        data={contact.bar}
                      />)}
                    trigger="hover"
                    mouseEnterDelay={0.5}
                    arrowContent={<div className="rc-tooltip-arrow-inner"/>}
                  >
                    <InfoBlock>
                      <ActiveContactsStatus
                        data={contact.bar}
                        maxWidthIndicator={maxWidthIndicator}
                        isInfoOpen={idx === this.state.infoTooltipOpenedIndex}
                      />
                    </InfoBlock>
                  </Tooltip>
              </ContactRow>
            )
          })}
        </ContactsContainer>
      </ViewContainer>
    )
  }
}

export default MostActiveContacts
