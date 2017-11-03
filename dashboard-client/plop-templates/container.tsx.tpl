import * as React from 'react'
import { connect } from 'react-redux'

export interface {{ properCase name }}Props extends React.Props<{{ properCase name }}> {
}
export interface {{ properCase name }}State {
}

class {{ properCase name }} extends React.Component<{{ properCase name }}Props, {{ properCase name }}State> {
  constructor (props: {{ properCase name }}Props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <div>
        <h1>{{ name }}</h1>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)({{ properCase name }})
