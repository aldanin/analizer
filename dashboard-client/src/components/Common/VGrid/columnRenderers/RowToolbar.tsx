import * as React from 'react'
import { CellRendererParams } from 'react-virtualized';
import * as Prod from '../../../../types/Product'
import * as Tag from '../../../../types/Tag'
import ActionToolbar from '../../../Common/ActionToolbar';
import * as Generic from '../../../../types/GenericInterfaces'

const createRowMenu = (item: Prod.ProductData,
                       handlers: any,
                       switches: Generic.ActionToolbarSwitches,
                       isHovered: boolean) => {
  const productId = handlers.getProductId(item);

  const menu =
    (
      <ActionToolbar
        fontSize={16}
        lineHeight={'30px'}
        withMenu={isHovered || handlers.checkedRowHandler(item.id)}
        menuIsHidden={false}
        menuOnItemSelect={{
          addTagCallback: (tags: Tag.TagData[]) => {handlers.addTags(productId, tags)},
          addToNotebookCallback: () => {handlers.addToNotebook(productId)},
          markAsReadCallback: () => {handlers.markAsRead(productId, true)},
          markAsUnreadCallback: () => {handlers.markAsRead(productId, false)},
          translateCallback: () => {handlers.askForTranslate(productId)},
          transcriptCallback: () => {handlers.getTranscription(productId)},
          exportCallback: () => {/*TODO: implement selected items*/},
        }}
        withFavorite={
          switches.withFavorite &&
          (item.isFavorite || isHovered || handlers.checkedRowHandler(item.id))}
        isFavorite={item.isFavorite}
        favoriteOnClick={() => {handlers.setFavourite(productId, !item.isFavorite)}}
        withTranslate={
          switches.withTranslate &&
          (item.hasTranslation || isHovered || handlers.checkedRowHandler(productId))}
        hasTranslate={item.hasTranslation}
        translateOnClick={() => {handlers.askForTranslate(productId)}}
        withNotebook={
          switches.withNotebook &&
          (item.hasTranscript || isHovered || handlers.checkedRowHandler(productId))}
        notebookHasNotes={item.hasTranscript}
        notebookOnClick={() => {handlers.openNotebook(productId)}}
        withTags={switches.withTags}
        tags={item.tags}
        tagOnRemove={(tagId: Tag.TagId) => {handlers.removeTag(productId, tagId)}}
        tagsToShow={1}
      />
    );
  return menu;
};

const RowToolbarRenderer: React.SFC<CellRendererParams> = (props) => {
  const {
    columnData,
    rowData,
    rowIndex
  } = props;

  const isHovered = columnData.gridStatus.hoveredRowIndex === rowIndex;

  return createRowMenu(
    rowData,
    columnData.handlers,
    columnData.actionToolbarSwitches,
    isHovered)
};

export default RowToolbarRenderer;
