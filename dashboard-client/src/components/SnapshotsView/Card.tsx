import * as React from 'react'
import styled, { withTheme } from 'styled-components';
import { ThemeProps } from './Theme';
import { SnapshotID } from '../../types/Snapshots';
import { TagData, TagId } from '../../types/Tag';
import moment = require('moment');
import DialogZoom from './DialogZoom';
import ActionToolbar from '../Common/ActionToolbar/index';
import SearchMarker from '../Common/SearchMarker/index';

const CardView = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${prop => prop.theme.photoDetails.bodyBgColor};
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: ${prop => prop.theme.photoDetails.headerBgColor};
`;

const HeaderLeft = styled.span`
  display: flex;
  justify-content: flex-start;
  width: 40%;
  height: 100%;
`;

const HeaderRight = styled.span`
  display: flex;
  justify-content: flex-end;
  width: 60%;
  height: 100%;
`;

const Body = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${prop => prop.theme.photoDetails.bodyBgColor};
  height: 89%;
  width: 100%;
`;

const InformationArea = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 5%;
  font-size: 60%;
  margin-left: 5%;
  width: 50%;
  height: 15%;
`;

const InformationLine = styled.span`
  display: flex;
  width: 100%;
  padding: 0 0 20px 0;
`;

const Title = styled.span`
  justify-content: flex-start;
  width: 25%;
  color: ${prop => prop.theme.photoDetails.labelTitleColor};
`;

const Details = styled.span`
  justify-content: flex-start;
  width: 75%;
  color: ${prop => prop.theme.photoDetails.labelTextColor};
`;

const PhotosAreaVertical = styled.div`
  position: relative;
  top: -4%;
  display: flex;
  flex-direction: column;
  padding: 80px 0 0 0;
`;

const VerticalTitleState = styled.span`
  display: flex;
  width: 100%;
`;

const VerticalPhotoState = styled.span`
  display: flex;
  height: 94%;
  width: 100%;
`;

const CameraSide = styled.span`
  color: ${prop => prop.theme.photoDetails.labelTextColor};
  text-align: center;
  font-size: 70%;
  position: relative;
  width: 48%;
  height: 30px;
`;

const PhotosAreaHorizontal = styled.div`
  position: relative;
  top: -5%;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 60%;
  height: 76%;
  padding: 100px 0 0 0;
`;

const HorizontalTitleState = styled.span`
  height: 6%;
  position: relative;
  left: 30%;
`;

const PhotoHorizontal = styled.span`
  position: relative;
  background-color: snow;
  width: 370px;
  height: 185px;
  margin-bottom: 20px;
`;

const OnlyOnePhotoHorizontal = styled.span`
  position: relative;
  background-color: snow;
  width: 370px;
  height: 185px;
  margin: 2rem 0 15rem 0;
`;

const FooterContainer = styled.div`
  display: flex;
  position: relative;
  left: 77%;
  padding: 0 0 10px 0;
`;

const RotateIcon = styled.span`
  color: ${prop => prop.theme.photoDetails.linkTextColor};
  font-size: 60%;
  cursor: pointer;
  position: relative;
  padding: 0 0 0 5px;
`;

const PhotoVertical = styled.span`
  position: relative;
  width: 235px;
  height: 370px;
  margin-right: 15px;
`;

const RotateLink = styled.span`
  color: ${prop => prop.theme.photoDetails.linkTextColor};
  font-size: 60%;
  cursor: pointer;
`;

const AlignToCenter = styled.div`
  text-align: center;
`;

const InlineBlock = styled.div`
  display: inline-block;
`;

export interface CardProps extends React.Props<Card> {
  id: SnapshotID;
  frontPhoto: string;
  backPhoto: string;
  time: number;
  latitude: number;
  longitude: number;
  lastExtracted: number;
  isVertical: boolean;
  isFavorite: boolean;
  getFullSizeImage: () => void;
  tags: TagData[];
  addTag: (ids: SnapshotID[], tags: TagData[]) => void;
  addToNotebook: (ids: SnapshotID[]) => void;
  markAsRead: (ids: SnapshotID[]) => void;
  markAsUnRead: (ids: SnapshotID[]) => void;
  askForTranslate: (ids: SnapshotID[]) => void;
  askForTranscript: (ids: SnapshotID[]) => void;
  exportItem: (ids: SnapshotID[]) => void;
  setStar: (id: SnapshotID, isFavorite: boolean) => void;
  removeTag: (itemID: SnapshotID, tagId: TagId) => void;
  theme?: ThemeProps;
}

export interface CardState {
  isVerticalMode: boolean;
  rotationAngle: number;
}

class Card extends React.Component<CardProps, CardState> {
  constructor (props: CardProps) {
    super(props)

    this.state = {
      isVerticalMode: this.props.isVertical,
      rotationAngle: 0,
    }
  }

  componentWillReceiveProps(nextProps: CardProps) {
    this.setState({isVerticalMode: nextProps.isVertical, rotationAngle: 0}); // Init state
  }

  rotateImage() {
    switch (this.state.rotationAngle) {
      case 0:
        this.setState({isVerticalMode: !this.state.isVerticalMode, rotationAngle: 90});
        break;

      case 90:
        this.setState({isVerticalMode: !this.state.isVerticalMode, rotationAngle: 180});
        break;

      case 180:
        this.setState({isVerticalMode: !this.state.isVerticalMode, rotationAngle: 270});
        break;

      default:
        this.setState({isVerticalMode: !this.state.isVerticalMode, rotationAngle: 0});
        break;
    }
  }

  renderLocation() {
    if (this.props.longitude === 0 && this.props.latitude === 0) { return 'N/A'}
    return this.props.latitude + ', ' + this.props.longitude;
  }

  renderTime(ticks: number) {
    if (ticks === 0) { return 'N/A'}
    return moment(ticks).format('DD/MM/YYYY HH:mm');
  }

  render() {
    return (
      <CardView>
        <Header>
          <HeaderLeft/>
          <HeaderRight>
            <ActionToolbar
              lineHeight={'40px'}
              withMenu={true}
              menuOnItemSelect={{
                addTagCallback: (tags: TagData[]) => {this.props.addTag([this.props.id], tags)},
                addToNotebookCallback: () => {this.props.addToNotebook([this.props.id])},
                markAsReadCallback: () => {this.props.markAsRead([this.props.id])},
                markAsUnreadCallback: () => {this.props.markAsUnRead([this.props.id])},
                translateCallback: () => {this.props.askForTranslate([this.props.id])},
                transcriptCallback: () => {this.props.askForTranscript([this.props.id])},
                exportCallback: () => {this.props.exportItem([this.props.id])},
              }}
              withFavorite={true}
              isFavorite={this.props.isFavorite}
              favoriteOnClick={() => {this.props.setStar(this.props.id, !this.props.isFavorite)}}
              withTags={true}
              tags={this.props.tags}
              tagOnRemove={(tagId: TagId) => {this.props.removeTag(this.props.id, tagId)}}
            />
          </HeaderRight>
        </Header>
        <Body>
          <InformationArea>
            <InformationLine>
              <Title>Time:</Title>
              <Details><SearchMarker>{this.renderTime(this.props.time)}</SearchMarker></Details>
            </InformationLine>
            <InformationLine>
              <Title>Location:</Title>
              <Details><SearchMarker>{this.renderLocation()}</SearchMarker></Details>
            </InformationLine>
            <InformationLine>
              <Title>Extracted:</Title>
              <Details>
                <SearchMarker>{this.renderTime(this.props.lastExtracted)}</SearchMarker>
              </Details>
            </InformationLine>
          </InformationArea>
          <AlignToCenter>
            <InlineBlock>
              {this.getImages()}
            </InlineBlock>
          </AlignToCenter>
          <FooterContainer>
            <RotateLink onClick={() => {this.rotateImage()}}>Rotate image</RotateLink>
            <RotateIcon className="base_icons icon_rotate_image" onClick={() => {this.rotateImage()}}/>
          </FooterContainer>
        </Body>
      </CardView>
    )
  }

  getImages() {
    if (this.state.isVerticalMode) {
      // return this.getVerticalImages();
      return this.getOnlyOneVerticalImage();
    }
    // return this.getHorizontalImages();
    return this.getOnlyOneHorizontalImage();
  }

  getOnlyOneVerticalImage() {
    return (
      <PhotosAreaVertical>
        <VerticalPhotoState>
          <PhotoVertical>
            <DialogZoom
              imageSrc={this.props.frontPhoto}
              rotationAngle={this.state.rotationAngle}
              width={this.props.isVertical ? 220 : 370}
              height={this.props.isVertical ? 370 : 220}
              isVertical={this.props.isVertical}
              getFullSizeImage={this.props.getFullSizeImage}
            />
          </PhotoVertical>
        </VerticalPhotoState>
      </PhotosAreaVertical>
    )
  }

  getOnlyOneHorizontalImage() {
    return (
      <PhotosAreaHorizontal>
        <OnlyOnePhotoHorizontal>
          <DialogZoom
            imageSrc={this.props.frontPhoto}
            rotationAngle={this.state.rotationAngle}
            width={this.props.isVertical ? 185 : 370}
            height={this.props.isVertical ? 370 : 185}
            isVertical={this.props.isVertical}
            getFullSizeImage={this.props.getFullSizeImage}
          />
        </OnlyOnePhotoHorizontal>
      </PhotosAreaHorizontal>
    )
  }

  getVerticalImages() {
    return (
      <PhotosAreaVertical>
        <VerticalTitleState>
          <CameraSide>Front</CameraSide>
          <CameraSide>Back</CameraSide>
        </VerticalTitleState>
        <VerticalPhotoState>
          <PhotoVertical>
            <DialogZoom
              imageSrc={this.props.frontPhoto}
              rotationAngle={this.state.rotationAngle}
              width={this.props.isVertical ? 220 : 370}
              height={this.props.isVertical ? 370 : 220}
              isVertical={this.props.isVertical}
              getFullSizeImage={this.props.getFullSizeImage}
            />
          </PhotoVertical>
          <PhotoVertical>
            <DialogZoom
              imageSrc={this.props.backPhoto}
              rotationAngle={this.state.rotationAngle}
              width={this.props.isVertical ? 220 : 370}
              height={this.props.isVertical ? 370 : 220}
              isVertical={this.props.isVertical}
              getFullSizeImage={this.props.getFullSizeImage}
            />
          </PhotoVertical>
        </VerticalPhotoState>
      </PhotosAreaVertical>
    )
  }

  getHorizontalImages() {
    return (
      <PhotosAreaHorizontal>
        <HorizontalTitleState>
          <CameraSide>Front</CameraSide>
        </HorizontalTitleState>
        <PhotoHorizontal>
          <DialogZoom
            imageSrc={this.props.frontPhoto}
            rotationAngle={this.state.rotationAngle}
            width={this.props.isVertical ? 185 : 370}
            height={this.props.isVertical ? 370 : 185}
            isVertical={this.props.isVertical}
            getFullSizeImage={this.props.getFullSizeImage}
          />
        </PhotoHorizontal>
        <HorizontalTitleState>
          <CameraSide>Back</CameraSide>
        </HorizontalTitleState>
        <PhotoHorizontal>
          <DialogZoom
            imageSrc={this.props.backPhoto}
            rotationAngle={this.state.rotationAngle}
            width={this.props.isVertical ? 185 : 370}
            height={this.props.isVertical ? 370 : 185}
            isVertical={this.props.isVertical}
            getFullSizeImage={this.props.getFullSizeImage}
          />
        </PhotoHorizontal>
      </PhotosAreaHorizontal>
    )
  }
}

export default withTheme(Card)
