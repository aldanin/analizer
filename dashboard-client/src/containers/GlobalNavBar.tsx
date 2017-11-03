import * as React from 'react'
import { connect } from 'react-redux';
import GlobalNavBar from '../components/Common/GlobalNavBar/index';
import * as Theme from '../components/Common/GlobalNavBar/Theme'
import { AgentUnreadProducts } from '../types/Agent';
import { PRODUCT_TYPES } from '../types/Product'
import { agentSelected, navMenuLoadRequest, pageNavigate } from '../state/actions/App';
import { ParamsData } from '../urlHelper';
import { withRouter } from 'react-router';

export interface GlobalNavBarContainerProps extends React.Props<any> {
  agentId: number;
  isFetching: boolean;
  navMenuLoadRequest: (agentId: number) => void;
  navMenuPollRequest: (agentId: number) => void;
  agentSelected: (agentId: number) => void;
  pageOpen: string;
  pageNavigate: (page: string) => void;
  data: AgentUnreadProducts;
  theme?: Theme.ThemeProps;
  params?: ParamsData;
};

class GlobalNavBarContainer extends React.Component<GlobalNavBarContainerProps, {}> {

  static defaultProps: Partial<GlobalNavBarContainerProps> = {
    theme: Theme.defaultTheme,
    params: {
      agent_id: '1',
    }
  }

  constructor(props: GlobalNavBarContainerProps) {
  super(props);

  }

  componentWillMount() {
    this.props.agentSelected(parseInt(this.props.params.agent_id, 10));
  }

  componentDidMount() {
    this.props.navMenuLoadRequest(this.props.agentId);
  }

  render() {
    return (
      <GlobalNavBar
        {...this.props}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const agentId = state[PRODUCT_TYPES.APP].get('agentId');
  const isFetching = state[PRODUCT_TYPES.APP].get('isMenuFetching');
  const pageOpen = state[PRODUCT_TYPES.APP].get('currentPage');
  let data = state[PRODUCT_TYPES.APP].get('menuData');

  if (!!data) {
    data = data.toJS();
  }

  return {
    agentId,
    isFetching,
    data,
    pageOpen,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navMenuLoadRequest: (agentId: number) => {dispatch(navMenuLoadRequest({agentId}))},
    agentSelected: (agentId: number) => {dispatch(agentSelected({agentId}))},
    pageNavigate: (page: string) => {dispatch(pageNavigate({page}))},
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalNavBarContainer))
