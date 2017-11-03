import * as React from 'react'
import * as Theme from './Theme'
import Dialog from 'material-ui/Dialog';
import AddTagBody from './TagWindowBody';
import { ThemeProvider } from 'styled-components';
import { TagData } from '../../types/Tag';

const style = {
  dialogBody: {
    padding: '1px',
  },
  dialog: {
    width: '422px',
  }
}

export interface AddTagProps extends React.Props<AddTag> {
  allTags: TagData[];
  requestTags: () => void;
  isFetching: boolean;
  isOpen: boolean;
  onClose: (tags: TagData[]) => void;
  theme?: Theme.ThemeProps
}
export interface AddTagState {
  isOpen: boolean;
}

class AddTag extends React.Component<AddTagProps, AddTagState> {

  static defaultProps: Partial<AddTagProps> = {
    theme: Theme.defaultTheme
  }

  constructor (props: AddTagProps) {
    super(props)

    this.state = {
      isOpen: this.props.isOpen,
    }
  }

  handleClose = (tags: TagData[]) => {
    //
    // Solves a bug where closing window by clicking outside
    // returns non-array values:
    //
    const returnTags = tags instanceof Array ? tags : [];
    this.props.onClose(returnTags);
    this.setState({isOpen: false})
  }

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <Dialog
          modal={false}
          open={this.state.isOpen}
          onRequestClose={this.handleClose}
          children={
            <AddTagBody
              onClose={(tags: TagData[]) => this.handleClose(tags)}
              isFetching={this.props.isFetching}
              requestTags={this.props.requestTags}
              allTags={this.props.allTags}
            />}
          bodyStyle={style.dialogBody}
          contentStyle={style.dialog}
        />
      </ThemeProvider>
    )
  }
}

export default AddTag
