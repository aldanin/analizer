import * as React from 'react'
import * as Theme from './Theme'
import { TagData, TagId } from '../../../types/Tag';
import TagItem from './TagItem';
import styled, { ThemeProvider } from 'styled-components';
import * as Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

interface LineHeightProp {
  lineHeight: string;
}

const TagListView = styled.div`
  font-size: 0.7em;
  line-height: ${(prop: LineHeightProp) => prop.lineHeight};
  white-space: nowrap;
`;

const TagHintContainer = styled.span`
  color: ${prop => prop.theme.textColor};
  background-color: ${prop => prop.theme.backgroundColor};
  border: 1px solid ${prop => prop.theme.borderColor};
  border-radius: 10em;
  cursor: pointer;
`;

const TagHintText = styled.span`
  padding: 0 0.3em 0 0.3em;
`;

const HintContainer = styled.div`
  width: 250px;
  height: auto;
`;

const TagHintView = styled.span`
  padding: 0 0.5em 0 0.3em;
`;

export interface TagsListProps extends React.Props<TagsList> {
  tags: TagData[];
  numberOfTagsToShow?: number;
  removeTagCallback: (tagId: TagId) => void;
  lineHeight?: string;
  theme?: Theme.TagThemeProps
}
export interface TagsListState {
}

class TagsList extends React.Component<TagsListProps, TagsListState> {
  static defaultProps: Partial<TagsListProps> = {
    theme: Theme.DEFAULT_THEME,
    numberOfTagsToShow: 2,
    lineHeight: '2.2',
  }

  tagsToShow: TagData[];

  constructor (props: TagsListProps) {
    super(props)
    this.tagsToShow = [];

    this.state = {
    }
  }

  copyFromTagsArrayTagsThatAreNeedToShow() {
    this.tagsToShow = this.props.tags.slice(0, this.props.numberOfTagsToShow);
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
        <TagListView
          lineHeight={this.props.lineHeight}
        >
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
                        removeTagCallback={() => {this.props.removeTagCallback(tag)}}
                        theme={this.props.theme}
                      />))}
                  </HintContainer>
                )}
                trigger={'hover'}
                mouseEnterDelay={0.5}
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
              removeTagCallback={() => {this.props.removeTagCallback(tag)}}
              theme={this.props.theme}
            />))}
        </TagListView>
      </ThemeProvider>
    )
  }
}

export default TagsList
