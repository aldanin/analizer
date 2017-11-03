import * as React from 'react'
import * as Theme from './Theme'
import styled, { ThemeProvider, withTheme } from 'styled-components';
import { TagData, TagId } from '../../types/Tag';
import RowTagList from './RowList';
import TagsList from '../Common/TagsList/index';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton'

// FIXME: border color should come from Theme
const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  width: 420px;
  height: 525px;
  overflow: hidden;
  box-sizing: border-box;
`;

const TitleContainer = styled.div`
  position: relative;
  display: flex;
  height: 35px;
  width: 100%;
  background-color: ${prop => prop.theme.titleBgColor};
  line-height: 35px;
`;

const TitleText = styled.div`
  color: ${prop => prop.theme.titleTextColor};
  font-size: 16px;
  padding: 0 0 0 20px;
`;

const TitleClose = styled.div`
  position: absolute;
  right: 13px;
  color: ${prop => prop.theme.titleCloseColor};
  font-size: 20px;
  cursor: pointer;
`;

const CurrentTagsContainer = styled.div`
  color: ${prop => prop.theme.textColor};
  font-size: 16px;
  padding: 35px 0 0 20px;
`;

const TagsContainer = styled.div`
  margin: 20px 20px 0 20px;
  // width: 100%;
  height: 25px;
  font-size: 13px;
  line-height: 16px;
  border-bottom: 1px solid ${prop => prop.theme.tagsBorderColor};
`;

const UnTaggedContainer = styled.span`
  line-height: 25px;
`;

const AddTagContainer = styled.div`
  color: ${prop => prop.theme.textColor};
  font-size: 16px;
  //padding: 20px 0 0 20px;
  padding: 20px;
`;

const Input = styled.input`
  margin: 0px 20px 0 20px;
  width: 370px;
  height: 20px;
  line-height: 20px;
  padding: 0 0 0 10px;
  border: 1px solid ${prop => prop.theme.tagsBorderColor};
`;

const TagListFrame = styled.div`
  position: relative;
  margin: 0 20px 0 20px;
  width: calc(100% - 38px);
  height: 290px;
  display: flex;
  flex-direction: column;
  overflow-y: overlay;
  overflow-x: hidden;
  border-left: 1px solid ${prop => prop.theme.tagsBorderColor};
  border-right: 1px solid ${prop => prop.theme.tagsBorderColor};
  border-bottom: 1px solid ${prop => prop.theme.tagsBorderColor};
`;

const AddTagCaption = styled.div`
  float: left;
  line-height: 36px;
`;

const styles = {
  progressBar: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -30px)',
    alignSelf: 'center',
  },
  addButton: {
    float: 'right'
  }
}

export interface AddTagBodyProps extends React.Props<AddTagBody> {
  onClose: (tags: TagData[]) => void;
  allTags: TagData[];
  theme?: Theme.ThemeProps
  requestTags: () => void;
  isFetching: boolean;
}

export interface AddTagBodyState {
  currentTags: TagData[];
  availableTags: TagData[];
  textTyped: string;
}

class AddTagBody extends React.Component<AddTagBodyProps, AddTagBodyState> {

  static defaultProps: Partial<AddTagBodyProps> = {
    theme: Theme.defaultTheme
  }

  private tagInput: HTMLInputElement;

  constructor(props: AddTagBodyProps) {
    super(props)

    this.state = {
      currentTags: [],
      availableTags: this.props.allTags,
      textTyped: '',
    }
  }

  componentDidMount() {
    this.props.requestTags();
  }

  componentWillReceiveProps(newProps: AddTagBodyProps) {
    if (this.props.allTags !== newProps.allTags) {
      this.removeUnMatchTags(this.state.textTyped, newProps.allTags)
    }
  }

  handleTyping = (ev: React.FormEvent<HTMLInputElement>) => {
    this.setState({textTyped: (ev.target as HTMLInputElement).value});
    this.removeUnMatchTags((ev.target as HTMLInputElement).value, this.props.allTags)
  }

  handleTagSelect = (tag: TagData) => {
    let tempTags = this.state.currentTags.slice();
    if (tempTags.indexOf(tag) > -1) {
      return null
    }
    tempTags.push(tag);
    this.setState({currentTags: tempTags})
  }

  handleCancelTag(tagId: TagId) {
    let tempTags = this.state.currentTags.slice();
    tempTags = tempTags.filter(tag => {
      return tag !== tagId
    });
    this.setState({currentTags: tempTags})
  }

  renderAllAvailableTagOptions() {
    if (this.props.isFetching) {
      return <CircularProgress size={60} thickness={6} style={styles.progressBar}/>
    }
    let tempTags = this.state.availableTags.slice();
    tempTags.sort(this.sortTags);

    return tempTags.map((tag, idx) => {
      return (
        <RowTagList
          key={tag}
          tag={tag}
          onTagSelect={(tagToBeAdd: TagData) => {
            this.handleTagSelect(tagToBeAdd)
          }}
        />
      )
    })
  }

  removeUnMatchTags(substring: string, allTags: TagData[]) {
    let tags = allTags.slice();
    tags = tags.filter(tag => {
      return tag.toLowerCase().includes(substring)
    });
    this.setState({availableTags: tags})
  }

  sortTags = (tag1: TagData, tag2: TagData) => {
    if (tag1.toLowerCase() > tag2.toLowerCase()) {
      return 1;
    }
    return -1;
  }

  AddNewTag = () => {
    if (this.tagInput && this.tagInput.value) {
      this.handleTagSelect(this.tagInput.value);
    }
  }

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <BodyContainer>
          <TitleContainer>
            <TitleText>
              Tag product
            </TitleText>
            <TitleClose onClick={() => this.props.onClose(this.state.currentTags)}>
              &times;
            </TitleClose>
          </TitleContainer>
          <CurrentTagsContainer>
            Current Tags
          </CurrentTagsContainer>
          <TagsContainer>
            {this.renderTags()}
          </TagsContainer>
          <AddTagContainer>
            <AddTagCaption>Add Tag</AddTagCaption>
            <RaisedButton
              label="New Tag"
              onClick={this.AddNewTag}
              disabled={!this.tagInput || !this.tagInput.value}
              style={styles.addButton}
            />
          </AddTagContainer>
          <Input
            innerRef={tagInput => this.tagInput = tagInput}
            placeholder="Type to add tag"
            onChange={this.handleTyping}
          />
          <TagListFrame>
            {this.renderAllAvailableTagOptions()}
          </TagListFrame>
        </BodyContainer>
      </ThemeProvider>
    )
  }

  renderTags() {
    if (this.state.currentTags.length === 0) {
      return <UnTaggedContainer>Untagged</UnTaggedContainer>;
    } else {
      return (
        <TagsList
          tags={this.state.currentTags}
          callback={(tagId: TagId) => this.handleCancelTag(tagId)}
          numberOfTagsToShow={4}
        />
      )
    }
  }
}

export default withTheme(AddTagBody)
