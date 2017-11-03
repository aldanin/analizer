import * as React from 'react'
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import * as Prod from '../../../types/Product'
import * as Theme from './Theme';
import * as Tags from '../../../types/Tag';
import ListItem from '../ListItem/index';
import ActionToolbar from '../ActionToolbar/index';
import * as Defs from './definitions'
import DefaultRenderer from './columnRenderers/DefaultRenderer'
import RowCell from './RowCell'

const Content = styled.div`
  display: flex;
  width: calc(100% - 23px);
  height: 100%;
  cursor: pointer;
`;

export interface GridRowProps extends React.Props<GridRow> {
  index: number;
  id: Prod.ProductID;
  rowData: any;
  columns: Defs.ColumnProps[],
  isCurrent: boolean; // Tells the row if it is the currently selected (clicked-on) one
  isChecked: boolean; // Tells the row if it is in checked state
  onRowClick: (rowData: any, index: number) => void;
  withCheckbox?: boolean;
  onRowCheck?: (id: Prod.ProductID, state: boolean) => void;
  actionsFieldNameMapping: Defs.FieldNamesMapping,
  actions?: {
    setStar: (id: Prod.ProductID, isFavorite: boolean) => void;
    removeTag: (id: Prod.ProductID, tag: Tags.TagId) => void;
    addTag: (id: Prod.ProductID, tag: Tags.TagData[]) => void;
    addToNotebook: (id: Prod.ProductID) => void;
    markAsRead: (id: Prod.ProductID) => void;
    markAsUnRead: (id: Prod.ProductID) => void;
    askForTranslate: (id: Prod.ProductID) => void;
    askForTranscript: (id: Prod.ProductID) => void;
    openNotebook: () => void;
    getTranslate: (id: Prod.ProductID) => void;
    getTranscript: (id: Prod.ProductID) => void;
    exportItem: (id: Prod.ProductID) => void;
  }
  additionalTheme: any;
  theme: Theme.ThemeProps;
}

export interface GridRowState {
  isCurrent: boolean;
  isMouseOn: boolean;
  menuIsHide: boolean;
  withFavorite: boolean;
  withNotebook: boolean;
  withTranslate: boolean;
}

class GridRow extends React.Component<GridRowProps, GridRowState> {
  static contextTypes = {
    keyword: PropTypes.string,
  }
  static defaultProps: Partial<GridRowProps> = {
    withCheckbox: true,
    onRowCheck: () => {/* NOT implemented */
    },
    actions: null,
    theme: Theme.DEFAULT_THEME,
  }

  constructor(props: GridRowProps) {
    super(props);

    this.state = {

      isCurrent: !!props.isCurrent,
      isMouseOn: false,
      menuIsHide: true,
      withFavorite: false,
      withNotebook: false,
      withTranslate: false,
    }
  }

  onMouseEnter = () => {
    this.changeIsMouseOnState(true);
  }

  onMouseLeave = () => {
    if (this.props.isChecked || this.props.isCurrent) {
      return
    }
    this.changeIsMouseOnState(false);
  }

  changeIsMouseOnState(isOn: boolean) {
    this.setState({
      isMouseOn: isOn,
      menuIsHide: !isOn,
      withFavorite: isOn,
      withNotebook: isOn,
      withTranslate: isOn,
    })
  }

  onRowCheck = () => {
    this.props.onRowCheck(this.props.id, !this.props.isChecked)
  }

  rowClick = () => {
    this.props.onRowClick(this.props.rowData, this.props.index)
  }

  autoMarkRowAsRead = () => {
    if (!this.props.rowData.isRead) {
      this.props.actions.markAsRead(this.props.rowData.id);
    }
  }

  getContent() {
    const contentPart = this.props.columns.map((column: Defs.ColumnProps, index: number) => {
      const renderer = column.renderer || DefaultRenderer;
      const jsxElement = renderer({
        rowData: this.props.rowData,
        field: column.field,
        withMarker: column.withMarker,
        theme: this.props.theme,
        additionalTheme: this.props.additionalTheme,
        options: column.options
      });

      return (
        <RowCell
          key={index}
          cellProps={{
            fontColor: column.cellColor || this.props.theme.genericTextColors.textColor,
            fontSize: column.cellFontSize || '1.2rem',
            width: column.width || 30,
            minWidth: column.minWidth || 0,
            maxWidth: column.maxWidth || null,
            flexShrink: column.flexShrink || 0,
            flexGrow: column.flexGrow || 0,
            additionalStyle: column.additionalStyle,
          }}
        >
          {jsxElement}
        </RowCell>
      )
    })

    return (
      <Content
        onClick={() => {
          this.rowClick()
        }}
      >
        {contentPart}
      </Content>
    )
  }

  componentWillReceiveProps(nextProps: GridRowProps) {
    if (nextProps.isCurrent !== this.props.isCurrent) {
      this.changeIsMouseOnState(nextProps.isCurrent);

      if (nextProps.isCurrent) {
        //
        // This row is found to be the current row in the next render.
        // We need to automatically register it as read:
        //
        this.autoMarkRowAsRead();
      }
    }

    if (!nextProps.isChecked) {
      this.setState({
        isMouseOn: false,
      })
    }
  }

  shouldComponentUpdate(nextProps: GridRowProps, nextState: GridRowState, nextContext: any) {
    const should =
      JSON.stringify(nextProps) !== JSON.stringify(this.props) ||
      JSON.stringify(nextState) !== JSON.stringify(this.state) ||
      this.context.keyword !== nextContext.keyword;
    return should;
  }

  render() {
    const actions = this.props.actions;
    const nameMappings = this.props.actionsFieldNameMapping;
    const rowDataStates = {
      withFavorite: this.props.rowData.isFavorite || this.state.withFavorite,
      isFavorite: this.props.rowData.isFavorite,
      favoriteOnClick: () => {
        actions.setStar(this.props.rowData.id, !this.props.rowData.isFavorite)
      },
      withNotebook: this.props.rowData[nameMappings.isNoteBook] || this.state.withNotebook,
      notebookHasNotes: this.props.rowData[nameMappings.isNoteBook],
      withTranslate: this.props.rowData[nameMappings.isTranslate] || this.state.withTranslate,
      hasTranslate: this.props.rowData[nameMappings.isTranslate],
      withTags: true,
      tags: this.props.rowData.tags,
      tagOnRemove: (tagId: Tags.TagId) => {
        actions.removeTag(this.props.id, tagId)
      },
    }

    const applyActions = this.props.actions != null;
    const isCheckboxAvailable = this.props.withCheckbox &&
      (this.props.isChecked || this.state.isMouseOn || this.props.isCurrent);
    return (
      <ListItem
        style={{
          lineHeight: 'initial',
          height: '40px'
        }}
        isNewItem={!this.props.rowData.isRead}
        isCheckboxAvailable={isCheckboxAvailable}
        onCheck={this.onRowCheck}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        isChecked={this.props.isChecked}
        checkboxSize={this.props.withCheckbox ? '14px' : '1px'}
        isSelected={this.props.isCurrent}
        isMouseOn={this.state.isMouseOn}
        content={this.getContent()}
        actionToolbar={
          <ActionToolbar
            lineHeight={'40px'}
            withMenu={applyActions}
            menuIsHidden={this.state.menuIsHide}
            menuOnItemSelect={{
              addTagCallback: (tags: Tags.TagData[]) => {
                actions.addTag(this.props.id, tags)
              },
              addToNotebookCallback: () => {
                actions.addToNotebook(this.props.id)
              },
              markAsReadCallback: () => {
                actions.markAsRead(this.props.id)
              },
              markAsUnreadCallback: () => {
                actions.markAsUnRead(this.props.id)
              },
              translateCallback: () => {
                actions.askForTranslate(this.props.id)
              },
              transcriptCallback: () => {
                actions.askForTranscript(this.props.id)
              },
              exportCallback: () => {
                actions.exportItem(this.props.id)
              },
            }}
            withFavorite={applyActions && rowDataStates.withFavorite}
            isFavorite={rowDataStates.isFavorite}
            favoriteOnClick={rowDataStates.favoriteOnClick}
            withNotebook={applyActions && rowDataStates.withNotebook}
            notebookHasNotes={applyActions && rowDataStates.notebookHasNotes}
            withTranslate={applyActions && rowDataStates.withTranslate}
            hasTranslate={applyActions && rowDataStates.hasTranslate}
            withTags={applyActions && rowDataStates.withTags}
            tags={applyActions && rowDataStates.tags}
            tagsToShow={1}
            tagOnRemove={applyActions && rowDataStates.tagOnRemove}
          />
        }
      />)
  }
}

export default GridRow
