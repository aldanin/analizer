import * as React from 'react'
import * as Theme from './Theme'
import { TagData, TagId } from '../../../types/Tag';
import TagItem from './TagItem';
import styled, { ThemeProvider } from 'styled-components';
import * as Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

const TagListView = styled.div`
  display: inline-box;
`;

const TagHintContainer = styled.span`
  color: ${prop => prop.theme.textColor};
  background-color: ${prop => prop.theme.backgroundColor};
  border: 1px solid ${prop => prop.theme.borderColor};
  border-radius: 15px;
  margin-right: 5px;
  margin-left: 5px;
  cursor: pointer;
`;

const TagHintText = styled.span`
  margin-right: 5px;
  margin-left: 5px;
`;

const HintContainer = styled.div`
  width: 250px;
  height: auto;
`;

const TagHintView = styled.span`
`;

const style = {
  tooltipOverlay: {
    zIndex: '1501',
  }
}

export interface TagsListProps extends React.Props<TagsList> {
  tags: TagData[];
  numberOfTagsToShow?: number;
  callback: (tagId: TagId) => void;
  theme?: Theme.TagThemeProps
}
export interface TagsListState {
}

class TagsList extends React.Component<TagsListProps, TagsListState> {
  static defaultProps: Partial<TagsListProps> = {
    theme: Theme.DEFAULT_THEME,
    numberOfTagsToShow: 2,
  }

  tagsToShow: TagData[];

  constructor (props: TagsListProps) {
    super(props)
    this.tagsToShow = [];

    this.state = {
    }
  }

  copyFromTagsArrayTagsThatAreNeedToShow() {
    const numberOfTags = this.props.tags.length;
    const minimize = this.props.numberOfTagsToShow <= numberOfTags ? this.props.numberOfTagsToShow : numberOfTags;
    this.tagsToShow = this.props.tags.slice(0, minimize);
  }

  isMoreTagToShow() {
    return (this.tagsToShow.length < this.props.tags.length);
  }

  componentWillReceiveProps() {
    this.copyFromTagsArrayTagsThatAreNeedToShow();
  }

  render() {
    this.copyFromTagsArrayTagsThatAreNeedToShow();
    return (
      <ThemeProvider theme={this.props.theme}>
        <TagListView>
          {this.isMoreTagToShow() ? (
            <TagHintView>
              <Tooltip
                placement={'left'}
                arrowContent={<div className="rc-tooltip-arrow-inner"/>}
                overlay={(
                  <HintContainer>
                    {this.props.tags.map((tag, idx) => (
                      <TagItem
                        key={idx}
                        tag={tag}
                        callback={() => {this.props.callback(tag)}}
                        theme={this.props.theme}
                      />))}
                  </HintContainer>
                )}
                trigger={'hover'}
                mouseEnterDelay={0.5}
                overlayStyle={style.tooltipOverlay}
              >
                <TagHintContainer>
                  <TagHintText>+{this.props.tags.length - this.tagsToShow.length}</TagHintText>
                </TagHintContainer>
              </Tooltip>
            </TagHintView>
          ) : null}
          {this.tagsToShow.map((tag, idx) => (
            <TagItem
              key={idx}
              tag={tag}
              callback={() => {this.props.callback(tag)}}
              theme={this.props.theme}
            />))}
        </TagListView>
      </ThemeProvider>
    )
  }
}

export default TagsList
