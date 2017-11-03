import * as React from 'react'
import * as Dir from '../../types/Directory'
import * as Theme from './Theme'
import styled from 'styled-components'
import SvgIcon from 'material-ui/SvgIcon';
import * as Helpers from '../../helpers/Formatters'
import * as Prod from '../../types/Product'
import * as Tag from '../../types/Tag'
import ActionToolbar from '../Common/ActionToolbar/index'
import FileExtensionIcon from '../Common/FileExtensionIcon'

export interface FileDetailsPaneProps extends React.Props<FileDetailsPane> {
  file: Dir.FileItem;

  handlers: {
    setFavourite: (fileId: Dir.FileId, isFavorite: boolean) => void;
    addTags: (itemId: Prod.ProductID, tags: Tag.TagData[]) => void;
    addToNotebook: (itemId: Prod.ProductID) => void;
    openNotebook: (itemId: Prod.ProductID) => void;
    askForTranslate: (itemId: Prod.ProductID) => void;
    getTranscription: (itemId: Prod.ProductID) => void;
    markAsRead: (itemIds: Prod.ProductID, isRead: boolean) => void;
    download: (url: string) => void;
  },
  parentSize: {
    width: number,
  }
  theme: Theme.ThemeProps
}
export interface FileDetailsPaneState {
}

interface StyledProps {
  showControls?: boolean;
  parentSize?: {
    width: number,
  }
}

const Root = styled.div`
  width: 100%;
  height: 100%;
`;
const Header = styled.header`
  width: 100%;
  background-color: ${prop => prop.theme.detailsPane.headerBgColor};
  height: auto;
  overflow: hidden;
`;
const Caption = styled.h2`
  color: ${prop => prop.theme.genericTextColors.textColor};
  font-size: 1.9rem;
  float: left;
  margin-left: 30px;
`;
const Body = styled.div`
  width: 100%;
  background-color: ${prop => prop.theme.detailsPane.bodyBgColor};
  height: calc(100% - 50px);
`;
const FloatRight = styled.div`
  width: 200px;
  height: 100%;
  float: right;
`;
const DownloadDiv = styled.h2`
  color: ${prop => prop.theme.genericTextColors.textColorLink};
  float: left;
  cursor: pointer;
`;
const DownloadLabel = styled.span`
  font-size: 1.2rem;
`;
const Controls = styled.h2`
  height: 100%;
  float: right;
  margin-right: 20px;
`;

const DetailsPart = styled.div`
  display: ${((props: StyledProps) => props.parentSize.width > 1350 ? 'flex' : 'block' )};
  overflow: hidden;
  margin-left: 20px;
  margin-top: 30px;
  float: left;
  margin-bottom: 20px;
`;

const DetailsContainer = styled.div`
  float: left;
  margin-right: 20px;
`;
const DetailsLineDiv = styled.div`
  margin-bottom: 10px;
  height: 1.9rem;
`;
const SpanCaption = styled.span`
  color: ${(props) => props.theme.genericTextColors.textColorPale};
  padding-right: 5px;
  float: left;
  width: 70px;
`;

const SpanCaptionLeftSize = styled(SpanCaption)`
  width: 40px;
`;

const SpanText = styled.span` {
  display: inline-block;
  color: ${(props) => props.theme.genericTextColors.textColor};
  max-width: 220px;
  text-overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const PreviewPart = styled.div`
  width: 100%;
  height: calc(100% - 130px);
  position: relative;
  float: left;
`;

const PreviewCard = styled.div`
  background-color: ${(props) => props.theme.detailsPane.previewBgColor};
  left: 20px;
  right: 20px;
  top: 0;
  bottom: 30px;
  position: absolute;
  border-radius: 2px;
  box-shadow: 1px -1px 3px silver;
  border-bottom: solid 1px #d8d7d7;
  border-left: solid 1px #dedddd;
  overflow: auto;
`;

const PreviewPagesCaption = styled.h4`
  text-align: center;
  color: ${(props) => props.theme.genericTextColors.textColorPale};
`;

const PreviewPagesCaptionPart = styled.span`
  padding-right: 0.5em;
;`

const PreviewWrap = styled.p`
  width: calc(100% - 100px);
  margin: auto;
  color: ${(props) => props.theme.genericTextColors.textColor};
  margin-top: 50px;
`;

const getStylesForMUIComponents = (props) => {

  return {
    downloadIconStyle: {
      color: props.theme.genericTextColors.textColorLink,
      width: '1.6rem',
      height: 'auto',
      position: 'relative',
      top: '0.4rem'
    },
    fullStar: {
      top: '7px',
      color: props.theme.starColor,
      fontSize: '100%',
      cursor: 'pointer',
    },
  }
};

class FileDetailsPane extends React.Component<FileDetailsPaneProps, FileDetailsPaneState> {
  constructor(props: FileDetailsPaneProps) {
    super(props)

    this.state = {}
  }

  getSize = (size: number) => {
    return `${size}KB`;
  }

  getDate = (date: number) => {
    return Helpers.msToDateString(date);
  }

  getPreview = (preview: string) => {
    return preview;
  }

  render() {
    const muiStyles = getStylesForMUIComponents(this.props);

    const info: Dir.FileInfo = this.props.file && this.props.file.info ? this.props.file.info : null;
    const file = this.props.file || Dir.defaultFileItem;
    const path = file.info.path;
    const handlers = this.props.handlers;

    const details = {
      name: this.props.file ? this.props.file.name : '',

      type: info ? (
        <FileExtensionIcon
          extension={info.extension}
          withCaption={true}
          theme={{appSymbols: this.props.theme.appSymbols}}
        />
      ) : '',
      path: info ? info.path : '',
      size: info ? this.getSize(info.size) : '',
      created: info ? this.getDate(info.dates.created) : '',
      modified: info ? this.getDate(info.dates.modified) : '',
      accessed: info ? this.getDate(info.dates.accessed) : '',
      preview: info ? this.getPreview(info.preview) : ''
    }

    return (
      <Root>
        <Header theme={this.props.theme}>
          <Caption>{details.name}</Caption>
          <FloatRight>
            <DownloadDiv>
              <SvgIcon className="material-icons" style={muiStyles.downloadIconStyle}>
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </SvgIcon>
              <DownloadLabel
                onClick={() => this.props.handlers.download(file.downloadUrl)}
              >
                Download
              </DownloadLabel>
            </DownloadDiv>
            <Controls>
              <ActionToolbar
                fontSize={16}
                lineHeight={'30px'}
                withMenu={true}
                menuOnItemSelect={{
                  addTagCallback: (tags: Tag.TagData[]) => {handlers.addTags(path, tags)},
                  addToNotebookCallback: () => {handlers.addToNotebook(path)},
                  markAsReadCallback: () => {handlers.markAsRead(path, true)},
                  markAsUnreadCallback: () => {handlers.markAsRead(path, false)},
                  translateCallback: () => {handlers.askForTranslate(path)},
                  transcriptCallback: () => {handlers.getTranscription(path)},
                  exportCallback: () => {/*TODO: implement selected items*/},
                }}
                withFavorite={true}
                isFavorite={file.isFavorite}
                favoriteOnClick={() => {this.props.handlers.setFavourite(path, !this.props.file.isFavorite)}}
                withTranslate={true}
                hasTranslate={file.hasTranslation}
                translateOnClick={() => this.props.handlers.askForTranslate(path)}
              />
            </Controls>
          </FloatRight>

        </Header>
        <Body>
        <DetailsPart
          parentSize={this.props.parentSize}
        >
          <DetailsContainer>
            <DetailsLineDiv>
              <SpanCaptionLeftSize>Type:</SpanCaptionLeftSize>
              <SpanText>{details.type} </SpanText>
            </DetailsLineDiv>
            <DetailsLineDiv>
              <SpanCaptionLeftSize>Path:</SpanCaptionLeftSize>
              <SpanText>{details.path}</SpanText>
            </DetailsLineDiv>
            <DetailsLineDiv>
              <SpanCaptionLeftSize>Size:</SpanCaptionLeftSize>
              <SpanText>{details.size}</SpanText>
            </DetailsLineDiv>
          </DetailsContainer>
          <DetailsContainer>
            <DetailsLineDiv>
              <SpanCaption>Created:</SpanCaption>
              <SpanText>{details.created} </SpanText>
            </DetailsLineDiv>
            <DetailsLineDiv>
              <SpanCaption>Modified:</SpanCaption>
              <SpanText>{details.modified}</SpanText>
            </DetailsLineDiv>
            <DetailsLineDiv>
              <SpanCaption>Accessed:</SpanCaption>
              <SpanText>{details.accessed}</SpanText>
            </DetailsLineDiv>
          </DetailsContainer>
        </DetailsPart>
        <PreviewPart>
          <PreviewCard>
            <PreviewPagesCaption>
              <PreviewPagesCaptionPart>Screen</PreviewPagesCaptionPart>
              <PreviewPagesCaptionPart>1</PreviewPagesCaptionPart>
              <PreviewPagesCaptionPart>of</PreviewPagesCaptionPart>
              <PreviewPagesCaptionPart>7</PreviewPagesCaptionPart>
            </PreviewPagesCaption>
            <PreviewWrap>
              {details.preview}
            </PreviewWrap>
          </PreviewCard>
        </PreviewPart>
        </Body>
      </Root>
    )
  }
}

export default FileDetailsPane
