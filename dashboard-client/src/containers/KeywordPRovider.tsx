import { connect } from 'react-redux'
import KeywordProvider from '../components/Common/SearchMarker/KeywordProvider';
import { setResultsCounter } from '../state/actions/Search';

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchResult: (results: number) => dispatch(setResultsCounter(results)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeywordProvider)
