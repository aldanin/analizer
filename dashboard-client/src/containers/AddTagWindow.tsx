import * as React from 'react'
import { TagData } from '../types/Tag';
import * as Theme from '../components/AddTag/Theme'
import { tagsDataRequest } from '../state/actions/Tags';
import { connect } from 'react-redux';
import AddTag from '../components/AddTag'
import { PRODUCT_TYPES } from '../types/Product'

export interface AddTagWindowProps extends React.Props<AddTagWindow> {
  allTags: TagData[];
  requestTags: () => void;
  isFetching: boolean;
  isOpen: boolean;
  onClose: (tags: TagData[]) => void;
  theme?: Theme.ThemeProps
}

class AddTagWindow extends React.Component<AddTagWindowProps, {}> {

  static defaultProps: Partial<AddTagWindowProps> = {
    theme: Theme.defaultTheme
  }

  constructor (props: AddTagWindowProps) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
     <AddTag
       {...this.props}
     />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const isFetching = state[PRODUCT_TYPES.TAGS].get('isFetching');
  let allTags = state[PRODUCT_TYPES.TAGS].get('data');
  if (!!allTags) {
    allTags = allTags.toJS();
  }

  return {
    allTags,
    isFetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestTags: () => {dispatch(tagsDataRequest())},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (AddTagWindow)
