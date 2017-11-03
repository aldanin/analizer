import * as React from 'react'
import { CellRendererParams } from 'react-virtualized';
import StarIcon from '../../../Common/StarIcon/StarIcon';

const getFavoriteIcon = (isFavorite, accountItem, setFavorite) => {
  let result =
    (
      <StarIcon
        isFull={isFavorite}
        callback={() => {setFavorite(accountItem.id, !isFavorite)}}
      />
    );
  return result;
};

const FavoriteRenderer: React.SFC<CellRendererParams> = (props) => {

  const renderer = ({
    columnData,
    cellData,
    dataKey,
    rowIndex,
    rowData
  }: CellRendererParams): any => {
    const {setFavorite} = columnData;
    return getFavoriteIcon(cellData, rowData, setFavorite);
  };

  return (
    renderer(props)
  )
};

export default FavoriteRenderer
