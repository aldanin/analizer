import * as React from 'react'
import { connect } from 'react-redux'
import * as Filters from '../types/GenericFilters'
import * as Actions from '../state/actions/ProductActions'
import * as Agent from '../types/Agent'
import { PRODUCT_TYPES } from '../types/Product'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton';
import LoadingIndicatorSmall from '../components/Common/LoadingIndicatorSmall'
import { ProductDataState, DEFAULT_PRODUCT_DATA_STATE } from '../state/interfaces'

export interface DataFetcherPropsExtension {
  onAutoRequestStateChange?: (isDisabled: boolean) => void,
  loadMoreData?: (isPrevious: boolean) => void
}

interface AddUIWrapProps {
  marginLeft: number;
}

export const DEFAULT_INNER_PROPS_EXTENSION: DataFetcherPropsExtension = {
  onAutoRequestStateChange: () => null,
  loadMoreData: () => null
}

export interface PayloadProps {
  agentid: Agent.AgentId,
  skip: number,
  limit: number,
  isRefreshing: boolean,
  filters: Filters.Filters
}

export interface DataFetcherProps extends DataFetcherPropsExtension {
  agentId: Agent.AgentId,
  loadData: (payload: PayloadProps, productType: string) => void,
  productDataState: ProductDataState,
  isFetching: boolean,
  isFirstRequest: boolean,
  isError: boolean,
  filters: Filters.Filters,
}

interface DataFetcherState {
  // isFirstRequest: boolean; // true if the current request happens on componentDidMount event
  isRequesting: boolean; // true when in manual mode, and the wrapped component has scrolled all the way down or up
  autoRequestDisabled: boolean;
}

const SPINNER_WIDTH = 30;
const BUTTON_HALF_WIDTH = 65;

const Root = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const AddUIWrap = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  margin-left: ${(props: AddUIWrapProps) => props.marginLeft}px;
`;

const buttonStyle = {
  margin: 12,
}

function DataFetcher<innerProps>(InnerComponent: React.ComponentClass<innerProps & DataFetcherPropsExtension> |
                                   React.StatelessComponent<innerProps & DataFetcherPropsExtension>,
                                 productType: string,
                                 limit: number,
                                 autoRequest: boolean = true)
: React.ComponentClass<innerProps & DataFetcherPropsExtension> {

  type resultProps = innerProps & DataFetcherPropsExtension;

  class WrappedComponent extends React.Component<resultProps & DataFetcherProps, DataFetcherState> {
    static defaultProps: Partial<DataFetcherProps & DataFetcherPropsExtension> = {
      isFetching: true,
      isError: false,
      productDataState: DEFAULT_PRODUCT_DATA_STATE,
      filters: null,
    }

    private rootDiv;

    constructor(props: resultProps & DataFetcherProps) {
      super(props);

      this.state = {
       // isFirstRequest: true,
        isRequesting: false,
        autoRequestDisabled: !autoRequest
      }

    }

    onAutoRequestStateChange = (isDisabled: boolean) => {
      this.setState({autoRequestDisabled: isDisabled});
    }

    loadMoreData = (isPreviousPage: boolean) => {
      if (this.props.isFetching) {
        return;
      }

      if (autoRequest) {
        this.doRequest(isPreviousPage)
      } else {
        this.setState({
          isRequesting: true
        })
      }
    }

    doRequest = (isPreviousPage: boolean) => {
      const factor = isPreviousPage ? -1 : 1;
      const skip = this.props.productDataState.skip + factor * limit;

      this.props.loadData(
        {
          agentid: this.props.agentId,
          skip,
          limit: limit,
          isRefreshing: false,
          filters: this.props.filters
        },
        productType)
    }

    renderRequestUI = () => {
      let JSXElement: JSX.Element = <span/>;
      let marginLeft = 0;

      if (this.props.isFetching && !this.props.isFirstRequest) {
        marginLeft = SPINNER_WIDTH;
        JSXElement = <LoadingIndicatorSmall/>;

      } else if (this.state.isRequesting && !autoRequest || this.state.autoRequestDisabled) {
        marginLeft = BUTTON_HALF_WIDTH;

        JSXElement = (
          <RaisedButton
            label="Load More"
            style={buttonStyle}
            onClick={() => this.doRequest(false)}
          />
        )
      }

      return (
        <AddUIWrap
          marginLeft={-marginLeft}
        >
          {JSXElement}
        </AddUIWrap>
      );
    }

    componentWillReceiveProps(nextProps: any) {
      if (this.state.isRequesting && this.props.isFetching && !nextProps.isFetching) {
        //
        // isFetchingMore in props has changed from true to false =>
        // A load more request was completed one way or another. Let's reset the state:
        //
        this.setState({
          isRequesting: false
        })
      }
      // if (this.state.isFirstRequest && !this.state.isRequesting && !nextProps.isFetching) {
      //   //
      //   // Data was fetched. The next request won't be the first one:
      //   //
      //   this.setState({isFirstRequest: false})
      // }
      if (JSON.stringify(nextProps.filters) !== JSON.stringify(this.props.filters)) {
        this.props.loadData(
          {
            agentid: this.props.agentId,
            skip: 0,
            limit: limit,
            isRefreshing: true,
            filters: nextProps.filters
          },
          productType)
      }
    }

    componentDidMount() {
      if (this.props.isFirstRequest && !this.props.isFetching) {
        this.props.loadData(
          {
            agentid: this.props.agentId,
            skip: this.props.productDataState.skip,
            limit: limit,
            isRefreshing: null,
            filters: null
          },
          productType)
      }
    }

    render() {
      const newProps = {loadMoreData: this.loadMoreData, onAutoRequestStateChange: this.onAutoRequestStateChange};
      return (
        <Root
          innerRef={(thisDiv) => {
            this.rootDiv = thisDiv
          }}
        >
          <InnerComponent {...this.props} {...newProps} />
          {this.renderRequestUI()}
        </Root>
      )
    }
  }

  const mapStateToProps = (state, ownProps) => {
    const agentId = state[PRODUCT_TYPES.APP].get('agentId');
    const isFetching = state[productType].get('isFetching');
    const isFirstRequest = state[productType].get('isFirstRequest');
    const error = state[productType].get('error');
    const productDataStateImut = state[productType].get('productDataState');
    const filtersImut = state[productType].get('filters');
    const filters = filtersImut ? filtersImut.toJS() : null;
    const productDataState = productDataStateImut ? productDataStateImut.toJS() : null;
    return {
      agentId,
      isFetching,
      isFirstRequest,
      error,
      productDataState,
      filters,
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      loadData: (payload: PayloadProps, productType1: string) => {
        dispatch(Actions.productLoadRequest(payload, productType1))
      },
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WrappedComponent)
}

export default DataFetcher;
