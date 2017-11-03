import { connect } from 'react-redux'
import ToolbarSearch from '../components/Common/AppViewFilterTool/Search'
import { searchKeyWord, setResultsCounter } from '../state/actions/Search';
import { PRODUCT_TYPES } from '../types/Product'

const mapStateToProps = (state, ownProps) => {
  const keyword = state[PRODUCT_TYPES.SEARCH].get('keyWord');
  let resultsCounter = state[PRODUCT_TYPES.SEARCH].get('resultsCounter');

  if (keyword === '' || keyword === ' ' || keyword === null || keyword === undefined) {
    resultsCounter = -1;
  }
  return {
    resultsCounter,
    keyword,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setKeyword: (keyword: string) => dispatch(searchKeyWord(keyword)),
    resetSearchResult: () => dispatch(setResultsCounter(-1)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolbarSearch)
