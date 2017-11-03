import * as React from 'react';
import GalleryContentPhotoDetails from './Details';
import Component = React.Component;
import { PhotoData } from '../../types/Photo';
import PhotoGrid from '../Common/PhotoGrid/index';
import styled from 'styled-components';
import FontIcon from 'material-ui/FontIcon'
import { withTheme } from 'styled-components';
import { ThemeProps } from './Theme';
import StarIcon from '../Common/StarIcon/StarIcon';
import { TagData, TagId } from '../../types/Tag';
import { ProductID } from 'common-interfaces/types/Product';
import DataFetcher from '../../containers/DataFetcherGeneric'
import { PRODUCT_TYPES } from '../../types/Product'

const PhotoGridWithDataFetcher = DataFetcher(
  PhotoGrid, PRODUCT_TYPES.GALLERY, 10)

const Content = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 99%;
  height: 100%;
`;

const Grid = styled.span`
  display: flex;
  width: 65%;
  height: 100%;
  flex-grow: 2;
`;

const Details = styled.span`
  display: block;
  width: 410px;
`;

const HeaderTool = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  background-color: ${props => (props.theme.defaultColors.photoGrid.titleBgColor)};
  width: 85.5%;
  position: absolute;
  top: 15px;
  left: 14px;
  height: 30px;
  z-index: 99;
`;

const RightTool = styled.span`
  display: flex;
  justify-content: flex-end;
  width: 20%;
  height: 100%;
`;

const LeftTool = styled.span`
  display: flex;
  justify-content: flex-start;
  width: 80%;
  height: 100%;
`;

const CheckboxSpan = styled.span`
  width: 34%;
  height: 100%;
`;

const Title = styled.span`
  position: relative;
  top: 7px;
  right: 7px;
  width: 60%;
  height: 100%;
  color: ${prop => prop.theme.defaultColors.photoGrid.titleColor};
  font-weight: bold;
  font-size: 70%;
  white-space: nowrap;
  overflow:hidden !important;
  text-overflow: ellipsis;
`;

const StarSpan = styled.span`
  position: absolute;
  top: 3px;
  right: 4px;
  height: 100%;
  position: relative;
  z-index: 999;
`;

const GalleryStarSpan = styled.span`
  position: absolute;
  top: 18px;
  right: 16px;
`;

export interface GalleryContentProps {
  photos: PhotoData[];
  handlers: {
    setStar: (id: ProductID, isFavorite: boolean) => void;
    setUnRead: (photoId: ProductID[]) => void;
    setRead: (photoId: ProductID[]) => void;
    addToNotebook: (photoId: ProductID[]) => void;
    askForTranslate: (photoId: ProductID[]) => void;
    askForTranscript: (photoId: ProductID[]) => void;
    exportItem: (photoId: ProductID[]) => void;
    addTag: (photoId: ProductID[], tag: TagData[]) => void;
    removeTag: (photoId: ProductID, tagId: TagId) => void;
    imageOption: (photoId: ProductID, optionIndex: number) => void;
    getFullSizeImage: () => void;
  }
  onChangeImage: (id: ProductID) => void;
  onItemSelected: (photoId: ProductID) => void;
  onItemUnSelected: (photoId: ProductID) => void;
  isItemSelected: (photoId: ProductID) => boolean;
  selectItem: (photoId: ProductID) => void;
  theme?: ThemeProps;
}

export interface GalleryContentState {
  photoId: number;
  degree: number;
}

class GalleryContent extends Component<GalleryContentProps, GalleryContentState> {

  constructor(props: GalleryContentProps) {
    super(props);
    this.state = {
      photoId: 0,
      degree: 0,
    };
  }

  changePhotoState(id: ProductID) {
    this.props.onChangeImage(id);
    this.props.selectItem(id);
    let photoId = this.props.photos.findIndex(item => item.id === id);
    this.setState({photoId: photoId, degree: 0});
  }

  renderDetails = () => {
    return this.props.photos[this.state.photoId]
      ? (
        <Details>
          <GalleryContentPhotoDetails
            photo={this.props.photos[this.state.photoId]}
            handlers={this.props.handlers}
            photoId={this.state.photoId}
            onRotate={() => {
              let degree = this.state.degree;
              degree += 90;
              if (degree > 270) {
                degree = 0;
              }
              this.setState({degree: degree})
            }}
            degree={this.state.degree}
          />
        </Details>
      )
      : (
        <div/>
      )
  }

  render() {
    return (
      <Content>
        <Grid>
          <PhotoGridWithDataFetcher
            photos={this.props.photos}
            isSinglePhoto={true}
            width={'176px'}
            height={'215px'}
            isCheckboxVisible={false}
            headerTool={(id, title, isFavorite, isChecked) => {
              return this.renderHeaderTool(id, title, isFavorite, isChecked)
            }}
            selectedItem={(id: ProductID) => {
              this.changePhotoState(id)
            }}
            starSpan={(
              <GalleryStarSpan>
                <StarIcon
                  isFull={true}
                  width={'15px'}
                  height={'15px'}
                  callback={() => null}
                  theme={{
                    fullStarStrokeColor: '#FFFFFF',
                    fullStarFillColor: '#49AAC8',
                    emptyStarStrokeColor: '#C5C8D7',
                    emptyStarFillColor: 'transparent',
                  }}
                />
              </GalleryStarSpan>
            )}
            theme={this.props.theme.defaultColors.photoGrid}
            onItemSelected={this.props.onItemSelected}
            onItemUnSelected={this.props.onItemUnSelected}
            isItemSelected={this.props.isItemSelected}
          />
        </Grid>
        {this.renderDetails()}
      </Content>)
  }

  renderHeaderTool(id: ProductID, title: string, isFavorite: boolean, isChecked: boolean): JSX.Element {
    return (
      <HeaderTool>
        <LeftTool>
          <CheckboxSpan/>
          <Title title={title}>{title}</Title>
        </LeftTool>
        <RightTool>
          <StarSpan>
            {isFavorite ? (
              <span
                style={{cursor: 'pointer'}}
              >
                <StarIcon
                  isFull={true}
                  width={'15px'}
                  height={'15px'}
                  callback={() => {
                    this.props.handlers.setStar(id, !isFavorite)
                  }}
                  theme={{
                    fullStarStrokeColor: '#FFFFFF',
                    fullStarFillColor: '#49AAC8',
                    emptyStarStrokeColor: '#C5C8D7',
                    emptyStarFillColor: 'transparent',
                  }}
                />
              </span>) : (
              <FontIcon
                onClick={() => {
                  this.props.handlers.setStar(id, !isFavorite)
                }}
                className="base_icons icon_star_empty"
                style={{
                  color: this.props.theme.defaultColors.photoGrid.starStroke,
                  fontSize: '80%',
                  cursor: 'pointer'
                }}
              />)}
          </StarSpan>
        </RightTool>
      </HeaderTool>
    )
  }
}

export default withTheme(GalleryContent);
