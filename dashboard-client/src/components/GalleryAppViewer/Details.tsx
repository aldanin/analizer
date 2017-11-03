import * as React from 'react';
import moment = require('moment');
import DialogZoomImage from './Zoom';
import FontIcon from 'material-ui/FontIcon'
import styled from 'styled-components';
import { withTheme } from 'styled-components';
import { ThemeProps } from './Theme';
import { PhotoData } from '../../types/Photo';
import { TagData, TagId } from '../../types/Tag';
import ActionToolbar from '../Common/ActionToolbar/index';
import SearchMarker from '../Common/SearchMarker/index';
import { ProductID } from 'common-interfaces/types/Product';

const Card = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  position: relative;
  background-color: ${prop => prop.theme.photoDetails.headerBgColor};
  display: flex;
  width: 430px;
  height: 40px;
  line-height: 40px;
`;

const HeaderLeftSide = styled.span`
  display: flex;
  justify-content: flex-start;
  width: 30%;
` ;

const HeaderRightSide = styled.span`
  display: flex;
  justify-content: flex-end;
  width: 70%;
  padding: 0 15px 0 0;
` ;

const Title = styled.span`
  background-color: ${prop => prop.theme.photoDetails.headerBgColor};
  color: ${prop => prop.theme.defaultColors.textColor};
  margin-left: 16%;
  font-size: 90%;
`;

const Body = styled.div`
  position: relative;
  background-color: ${prop => prop.theme.photoDetails.bodyBgColor};
  width: 430px;
  text-align: center;
  height: 100%;
  overflow: auto;
`;

const Container = styled.span`
  width: 80%;
  height: 80px;
`;

const Row = styled.span`
  display: flex;
  width: 90%;
  height: 30px;
  margin-left: 5%;
  margin-top: 1%;
  line-height: 100%;
  text-align: left;
`;

const RowLeft = styled.span`
  display: flex;
  width: 50%;
  height: 100%;
`;

const RowRight = styled.span`
  display: flex;
  width: 50%;
  height: 100%;
`;

const Label = styled.span`
  color: ${prop => prop.theme.photoDetails.labelTitleColor};
  width: 35%;
  margin-right: 5%;
  font-size: 70%;
`;

const Text = styled.span`
  color: ${prop => prop.theme.photoDetails.labelTextColor};
  width: 50%;
  font-size: 60%;
  white-space: nowrap;
  overflow:hidden !important;
  text-overflow: ellipsis;
`;

export interface RotationSpanProps {
  degree: number;
}

const PhotoContainer = styled.span`
  max-width: 80%;
  max-height: 80%;
`;

const VideoContainer = styled.span`
  max-width: 80%;
  max-height: 80%;
`;

const Video = styled.video`
  width: 32rem;
  height: 24rem;
  border: 1px solid black;
`;

const PhotoSpan = styled.span`
  display: inline-block;
  position: relative;
  top: -15px;
  width: 370px;
  height: 370px;
  transform: rotate(${(prop: RotationSpanProps) => prop.degree}deg);
  z-index: 10;
`;

const VideoSpan = styled.span`
  display: inline-block;
  width: 32rem;
  height: 32rem;
  transform: rotate(${(prop: RotationSpanProps) => prop.degree}deg);
  z-index: 10;
  margin-bottom: 5rem;
  line-height: 55rem;
`;

const Footer = styled.div`
  position: relative;
  bottom: 4%;
  width: 90%;
  margin-left: 5%;
  display: flex;
`;

const FooterLeft = styled.span`
  width: 65%;
  display: flex;
  justify-content: flex-start;
`;

const FooterRight = styled.span`
  width: 35%;
  display: flex;
  justify-content: flex-end;
`;

const FooterTitle = styled.span`
  color: ${prop => prop.theme.photoDetails.labelTitleColor};
  font-size: 80%;
  margin-right: 2%;
  font-size: 65%;
`;

const FooterLink = styled.span`
  color: ${prop => prop.theme.photoDetails.linkTextColor};
  cursor: pointer;
  font-size: 65%;
`;

const FooterSpace = styled.div`
  width: 100%;
  height: 20px;
`;

const styles = {
  rotateIcon: {

  },
  actionMenu: {

  }
}

export interface GalleryContentPhotoDetailsProps {
  photo: PhotoData;
  photoId: ProductID;
  degree: number;
  onRotate: () => void;
  theme?: ThemeProps;

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
    imageOption: (photoId: number, optionIndex: number) => void;
    getFullSizeImage: () => void;
  }
}

export interface GalleryContentPhotoDetailsState {
  isOpen: boolean;
  isRotateMode: boolean;
}

class GalleryContentPhotoDetails extends React.Component<GalleryContentPhotoDetailsProps,
  GalleryContentPhotoDetailsState> {
  state = {
    isOpen: false,
    isRotateMode: false,
  };

  addTag(tags: TagData[]) {
    this.props.handlers.addTag([this.props.photo.id], tags);
  }

  markAsUnRead() {
    this.props.handlers.setRead([this.props.photo.id]);
  }

  markAsRead() {
    this.props.handlers.setUnRead([this.props.photo.id]);
  }

  addToNotebook() {
    this.props.handlers.addToNotebook([this.props.photo.id]);
  }

  askForTranslate() {
    this.props.handlers.askForTranslate([this.props.photo.id]);
  }

  askForTranscript() {
    this.props.handlers.askForTranscript([this.props.photo.id]);
  }

  exportItem() {
    this.props.handlers.exportItem([this.props.photo.id]);
  }

  openDialog() {
    this.setState({isOpen: true});
  }

  closeDialog() {
    this.setState({isOpen: false})
  }

  render() {
    styles.rotateIcon = {
      cursor: 'pointer',
      fontSize: '100%',
      position: 'relative',
      right: '5%',
      color: this.props.theme.photoDetails.linkTextColor,
    }

    styles.actionMenu = {
      fontSize: '17px',
      color: this.props.theme.photoDetails.actionIconColor,
    }
    return (
      <Card>
        <Header>
          <HeaderLeftSide>
            <Title title={this.props.photo.name + '.' + this.props.photo.type.toLowerCase()}>
              <SearchMarker>{this.props.photo.name + '.' + this.props.photo.type.toLowerCase()}</SearchMarker>
            </Title>
          </HeaderLeftSide>
          <HeaderRightSide>
            <ActionToolbar
              lineHeight={'45px'}
              withMenu={true}
              menuOnItemSelect={{
                addTagCallback: (tags: TagData[]) => {this.addTag(tags)},
                addToNotebookCallback: () => {this.addToNotebook()},
                markAsReadCallback: () => {this.markAsUnRead()},
                markAsUnreadCallback: () => {this.markAsRead()},
                translateCallback: () => {this.askForTranslate()},
                transcriptCallback: () => {this.askForTranscript()},
                exportCallback: () => {this.exportItem()},
              }}
              menuSideToBeOpen={'right'}
              withFavorite={true}
              isFavorite={this.props.photo.isFavorite}
              favoriteOnClick={() => {
                this.props.handlers.setStar(this.props.photo.id, !this.props.photo.isFavorite)}}
              withTags={true}
              tags={this.props.photo.tags}
              tagOnRemove={(tagId: TagId) => {this.props.handlers.removeTag(this.props.photo.id, tagId)}}
            />
          </HeaderRightSide>
        </Header>
        <Body>
        <Container>
          <Row>
            <RowLeft>
              <Label>Title:</Label>
              <Text title={this.props.photo.name}>
                <SearchMarker>{this.props.photo.name + '.' + this.props.photo.type.toLowerCase()}</SearchMarker>
              </Text>
            </RowLeft>
            <RowRight>
              <Label>Time:</Label>
              <Text><SearchMarker>{moment(this.props.photo.date).format('DD/MM/YYYY  HH:mm')}</SearchMarker></Text>
            </RowRight>
          </Row>
          <Row>
            <RowLeft>
              <Label>Type:</Label>
              <Text><SearchMarker>{this.props.photo.type}</SearchMarker></Text>
            </RowLeft>
            <RowRight>
              <Label>Resolution:</Label>
              <Text><SearchMarker>{this.props.photo.width + ' x ' + this.props.photo.height}</SearchMarker></Text>
            </RowRight>
          </Row>
          <Row>
            <RowLeft>
              <Label>Path:</Label>
              <Text title={this.props.photo.path}><SearchMarker>{this.props.photo.path}</SearchMarker></Text>
            </RowLeft>
            <RowRight>
              <Label>Extracted:</Label>
              <Text>
                <SearchMarker>
                  {this.props.photo.extracted === 0 ? 'N/A' : (
                    moment(this.props.photo.extracted).format('DD/MM/YYYY  HH:mm')
                  )}}
                </SearchMarker></Text>
            </RowRight>
          </Row>
        </Container>
        {!!this.props.photo.url && this.props.photo.url !== 'N/A' ? (
          <PhotoContainer>
            <PhotoSpan
              degree={this.props.degree}
            >
              <DialogZoomImage
                imageSrc={this.props.photo.url}
                degree={this.props.degree}
                onRotate={this.props.onRotate}
                isOpen={this.state.isOpen}
                closeDialog={() => {this.closeDialog()}}
                getFullSizeImage={this.props.handlers.getFullSizeImage}
              />
            </PhotoSpan>
          </PhotoContainer>
        ) : (
          <VideoContainer>
            <VideoSpan
              degree={this.props.degree}
            >
              <Video controls={true}>
                <source src="movie.mp4" type="video/mp4"/>
              </Video>
            </VideoSpan>
          </VideoContainer>
        )}
        <Footer>
          <FooterLeft>
            <FooterTitle>
              Image in low resolution
            </FooterTitle>
            <FooterLink onClick={() => {this.props.handlers.getFullSizeImage()}}>
              Get full size image
            </FooterLink>
          </FooterLeft>
          <FooterRight>
            <FooterLink onClick={() => {this.props.onRotate()}}>
              <FontIcon className="base_icons icon_rotate_image" style={styles.rotateIcon}/>
              Rotate image
            </FooterLink>
          </FooterRight>
        </Footer>
        <FooterSpace/>
        </Body>
      </Card>
    )
  }
}

export default withTheme(GalleryContentPhotoDetails);
