import * as React from 'react'
import * as Theme from './Theme'

export interface {{ properCase name }}Props extends React.Props<{{ properCase name }}> {
  theme?: Theme.ThemeProps
}
export interface {{ properCase name }}State {
}

class {{ properCase name }} extends React.Component<{{ properCase name }}Props, {{ properCase name }}State> {

  static defaultProps: Partial<{{ properCase name }}Props> = {
    theme: Theme.defaultTheme
  }

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

export default {{ properCase name }}
