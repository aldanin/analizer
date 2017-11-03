import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DEFAULT_PRODUCT_DATA_STATE } from '../state/interfaces'

import DataFetcherGeneric, { PayloadProps } from './DataFetcherGeneric';
import { DataFetcherProps, DataFetcherPropsExtension } from './DataFetcherGeneric';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: DataFetcherProps = {
    agentId: '1',
    loadData: (payload: PayloadProps, productType: string) => null,
    productDataState: DEFAULT_PRODUCT_DATA_STATE,
    isFetching: false,
    isFirstRequest: false,
    isError: false,
    filters: null,
  }

  const TestWithDataFetcher =
    DataFetcherGeneric(MockComponent, 'TEST', 5, false)

  ReactDOM.render(<TestWithDataFetcher {...props}/>, div);
});

export interface MockComponentProps extends React.Props<MockComponent & DataFetcherPropsExtension> {

}

////////////// MOCK COMPONENT FOR TESTING ONLY ////////////////

class MockComponent extends React.Component<MockComponentProps, {}> {
  constructor(props: MockComponentProps) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div>
        <h1>data fetcher test component</h1>
      </div>
    )
  }
}
