import * as React from 'react'
import * as Theme from './Theme'

export interface {{ properCase name }}Props {
  theme?: Theme.ThemeProps
}

const {{ properCase name }}: React.SFC<{{ properCase name }}Props> = ({ }) => {
  return (
    <div>
      {{ name }}
    </div>
  )
}

{{ properCase name }}.defaultProps = {
  theme: Theme.defaultTheme
} as Partial<{{ properCase name }}Props>

export default {{ properCase name }}
