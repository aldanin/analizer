import * as React from 'react'
import { connect } from 'react-redux'
import { Notebook as NotebookComponent } from '../components/Notebook'
import { NotebookData } from '../types/Notebook';
import { demoNotebookData } from '../mockData/Notebook';

const notebookData = demoNotebookData;

export interface NotebookProps extends React.Props<Notebook> {
  data: NotebookData;
}
export interface NotebookState {
}

class Notebook extends React.Component<NotebookProps, NotebookState> {
  constructor (props: NotebookProps) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <NotebookComponent
        data={this.props.data}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const data = notebookData;
  return {
    data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notebook)
