import * as React from 'react'
import { connect } from 'react-redux'
import SummaryView from '../components/SummaryView/index';
import { sortOptionSelected, summaryLoadRequest } from '../state/actions/Summary';
import { AgentId } from '../types/Agent';
import { SummaryData } from '../types/Summary';
import { SummaryTheme } from '../theme/ScTheme';
import { PRODUCT_TYPES } from '../types/Product';

export interface SummaryProps extends React.Props<Summary> {
  loadingSummaryRequest: (agentId: AgentId) => void;
  isFetching: boolean;
  data: SummaryData;
  contactFilter: number;
  onSortOptionSelect: (sortFilter: number) => void;
  params?: any;
}
export interface SummaryState {
}

class Summary extends React.Component<SummaryProps, SummaryState> {
  constructor (props: SummaryProps) {
    super(props)

    this.state = {
    }
  }

  loadSummaryProps = () => {
    this.props.loadingSummaryRequest(this.props.params.agent_id);
  }

  public componentDidMount() {
    this.loadSummaryProps();
  }

  render() {
    return (
      <SummaryView
        isFetching={this.props.isFetching}
        data={this.props.data}
        contactFilter={this.props.contactFilter}
        onSortOptionSelect={this.props.onSortOptionSelect}
        theme={SummaryTheme}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const isFetching = state[PRODUCT_TYPES.SUMMARY].get('isFetching');
  const contactFilter = state[PRODUCT_TYPES.SUMMARY].get('filters');
  let data = state[PRODUCT_TYPES.SUMMARY].get('data');

  if (!isFetching) {
    data = data.toJS();
  }

  return {
    isFetching,
    data,
    contactFilter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadingSummaryRequest: (agentId: AgentId) => {dispatch(summaryLoadRequest(agentId))},
    onSortOptionSelect: (sortFilter: number) => {dispatch(sortOptionSelected(sortFilter))},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Summary)
