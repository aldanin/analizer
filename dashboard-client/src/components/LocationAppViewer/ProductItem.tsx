import * as React from 'react'
import { Location } from 'common-interfaces/types/Location';
import ListItem from '../Common/ListItem/index';
import ActionToolbar from '../Common/ActionToolbar/index';
import { TagData, TagId } from '../../types/Tag';
import styled from 'styled-components';
import moment = require('moment');
import { ProductID } from '../../types/Product';

const DetailsView = styled.div`
  display: block;
  width: 100%;
`;

const ProductView = styled.div`
  display: block;
  height: 30px;
  width: 100%;
`;

const ToggleIcon = styled.span`
  display: inline-block;
  color: ${prop => prop.theme.titleColor};
  font-size: 1rem;
  cursor: pointer;
  line-height: 30px;
  width: 5%;
`;

const PositionContainer = styled.span`
  display: inline-block;
  color: ${prop => prop.theme.textColor};
  font-size: 1.2rem;
  padding-right: 4rem;
  width: 33%;
`;

const TimeContainer = styled.span`
  display: inline-block;
  font-size: 1rem;
`;

const DuplicateContainer = styled.div`
  display: inline-block;
  color: ${prop => prop.theme.subTextColor};
  font-size: 1rem;
  width: 10%;
  padding-left: 0.5rem;
`;

const ExpandedLineView = styled.div`
  width: 100%;
  height: 3rem;
  background-color: ${prop => prop.theme.expandBgColor};
  text-indent: 51.5%;

  &:last-child {
    border-bottom: 1px solid ${prop => prop.theme.borderColor};
  }
`;

const TimeExpandContainer = styled.span`
  font-size: 1rem;
`;

export interface ProductItemProps extends React.Props<ProductItem> {
  data: Location[];
  onItemSelected: (id: ProductID) => void;
  onItemUnSelected: (id: ProductID) => void;
  isItemSelected: (id: ProductID) => boolean;
  updateOpenItems: (id: ProductID, isOpen: boolean) => void;
  isOpen: (id: ProductID) => boolean;
  isExpandMode: boolean;
  removeTag: (id: string, tagId: TagId) => void;
  setStar: (id: string, isFavorite: boolean) => void;
  addTag: (ids: string[], tags: TagData[]) => void;
  markAsRead: (ids: string[]) => void;
  markAsUnread: (ids: string[]) => void;
}
export interface ProductItemState {
  isExpand: boolean;
  isMouseOn: boolean;
  menuIsHidden: boolean;
  withFavorite: boolean;
  withNotebook: boolean;
  withTranslate: boolean;
}

class ProductItem extends React.Component<ProductItemProps, ProductItemState> {
  constructor(props: ProductItemProps) {
    super(props)

    this.state = {
      isExpand: this.props.isExpandMode ? true : this.props.isOpen(this.props.data[0].id),
      isMouseOn: false,
      menuIsHidden: true,
      withFavorite: false,
      withNotebook: false,
      withTranslate: false,
    }
  }

  componentWillReceiveProps(nextProps: ProductItemProps) {
    if (this.props.isExpandMode !== nextProps.isExpandMode) {
      this.setState({isExpand: nextProps.isExpandMode});
    }
    if (!this.props.isItemSelected(this.props.data[0].id)) {
      this.setState({
        isMouseOn: false,
      })
    }
  }

  onMouseEnter = () => {
    this.setState({
      isMouseOn: true,
      menuIsHidden: false,
      withFavorite: true,
      withNotebook: true,
      withTranslate: true,
    })
  }

  onMouseLeave = () => {
    this.setState({
      isMouseOn: false,
      menuIsHidden: true,
      withFavorite: false,
      withNotebook: false,
      withTranslate: false,
    })
  }

  onCheck = () => {
    if (this.props.isItemSelected(this.props.data[0].id)) {
      this.props.onItemUnSelected(this.props.data[0].id)
    } else {
      this.props.onItemSelected(this.props.data[0].id)
    }
  }

  getActionToolbar() {
    return (
      <ActionToolbar
        lineHeight={'30px'}
        fontSize={14}
        withMenu={true}
        menuIsHidden={this.state.menuIsHidden}
        menuOnItemSelect={{
          addTagCallback: (tags: TagData[]) => {
            this.props.addTag([this.props.data[0].id] as string[], tags)
          },
          addToNotebookCallback: () => null,
          markAsReadCallback: () => {
            this.props.markAsRead([this.props.data[0].id] as string [])
          },
          markAsUnreadCallback: () => {
            this.props.markAsUnread([this.props.data[0].id] as string [])
          },
          translateCallback: () => null,
          transcriptCallback: () => null,
          exportCallback: () => null,
        }}
        withFavorite={this.props.data[0].isFavorite || this.state.withFavorite}
        isFavorite={this.props.data[0].isFavorite}
        favoriteOnClick={() => this.props.setStar(this.props.data[0].id as string, !this.props.data[0].isFavorite)}
        withNotebook={this.props.data[0].hasNotes || this.state.withNotebook}
        notebookHasNotes={this.props.data[0].hasNotes}
        withTranslate={this.props.data[0].hasTranslation || this.state.withTranslate}
        hasTranslate={this.props.data[0].hasTranslation}
        withTags={true}
        tags={this.props.data[0].tags}
        tagOnRemove={(tagId: TagId) => this.props.removeTag(this.props.data[0].id as string, tagId)}
        tagsToShow={
          this.props.data[0].tags.length > 1 ?
            this.props.isItemSelected(this.props.data[0].id) || this.state.isMouseOn ? 0 : 1 : 1
        }
      />
    )
  }

  toggleLine() {
    if (!this.props.data[0].isRead) {
      this.props.markAsRead([this.props.data[0].id]  as string[])
    }
    this.props.updateOpenItems(this.props.data[0].id, !this.state.isExpand);
    this.setState({
      isExpand: !this.state.isExpand,
    })
  }

  render() {
    return (
      <DetailsView>
        <ListItem
          isNewItem={!this.props.data[0].isRead}
          content={this.renderContent()}
          isCheckboxAvailable={this.props.isItemSelected(this.props.data[0].id) || this.state.isMouseOn}
          checkboxSize={'14px'}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onCheck={() => this.onCheck()}
          isChecked={this.props.isItemSelected(this.props.data[0].id)}
          isSelected={this.props.isItemSelected(this.props.data[0].id)}
          isMouseOn={this.state.isMouseOn}
          actionToolbar={this.getActionToolbar()}
        />
        {this.state.isExpand ? this.renderExpand() : null}
      </DetailsView>
    )
  }

  renderExpand() {
    return (
      this.props.data.map((item, idx) => {
        if (idx > 0) {
          return (
            <ExpandedLineView key={idx}>
              <TimeExpandContainer>
                {moment(item.timestamp).format('DD/MM/YYYY HH:mm')}
              </TimeExpandContainer>
            </ExpandedLineView>
          )
        }
        return null;
      }))
  }

  renderDuplicate() {
    return ( <DuplicateContainer> {'(' + (this.props.data.length - 1) + ')'} </DuplicateContainer> )

  }

  renderContent() {
    return (
      <ProductView onClick={() => this.toggleLine()}>
        {this.renderToggleIcon()}
        <PositionContainer>{this.props.data[0].latitude}, {this.props.data[0].longitude}</PositionContainer>
        <TimeContainer>{moment(this.props.data[0].timestamp).format('DD/MM/YYYY HH:mm')}</TimeContainer>
        {this.props.data.length > 1 ? this.renderDuplicate() : null}
      </ProductView>
    )
  }

  renderToggleIcon() {
    if (this.state.isExpand && this.props.data.length > 1) {
      return (<ToggleIcon className="base_icons icon_tree_tri_opened"/>)
    } else {
      return (<ToggleIcon className="base_icons icon_tree_tri_closed"/>)
    }
  }
}

export default ProductItem
