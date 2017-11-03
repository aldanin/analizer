import * as React from 'react'
import * as Dir from '../../types/Directory'
import * as Prod from '../../types/Product'
import * as Tag from '../../types/Tag'
import * as Theme from './Theme'
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon'
import * as Helpers from '../../helpers/Formatters'
import StarFontIcon from '../Common/StarFontIcon';

export interface DirectoryDetailsPaneProps extends React.Props<DirectoryDetailsPane> {
  directory: Dir.FileItem;
  handlers: {
    setFavourite: (directoryId: Dir.DirectoryId, isFavorite: boolean) => void;
    askForTranslate?: (directoryId: Dir.DirectoryId) => void
    getTranslate?: (directoryId: Dir.DirectoryId) => void
    addTags: (itemId: Prod.ProductID[], tags: Tag.TagData[]) => void;
  },
  showControls?: boolean;
  parentSize: {
    width: number,
  }
  theme: Theme.ThemeProps
}

interface StyledProps {
  showControls?: boolean;
  parentSize?: {
    width: number,
  }
}

const Root = styled.div`
  width: 100%;
  // background-color: red;
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

const Controls = styled.h2`
  height: 100%;
  float: right;
  margin-right: 20px;
`;
const ControlsSpan = styled.span`
  display: ${(props: StyledProps) => props.showControls ? 'inline-block' : 'none'};
  margin-left:10px;
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

const PreviewWrap = styled.p`
  width: calc(100% - 100px);
  margin: auto;
  color: ${(props) => props.theme.genericTextColors.textColor};
  margin-top: 50px;
  text-align: center;
`
class DirectoryDetailsPane extends React.Component<DirectoryDetailsPaneProps, {}> {
  static defaultProps: Partial<DirectoryDetailsPaneProps> = {
    showControls: false,
  }

  getSize = (size: number) => {
    return Helpers.fileSizeFormatter(size);
  }

  getDate = (date: number) => {
    return Helpers.msToDateString(date);
  }

  getPreview = (preview: string) => {
    return preview;
  }

  getIcon = () => {
    return (
      <FontIcon
        className="base_icons icon_folder_closed"
        style={{fontSize: '120%', color: this.props.theme.folderIconColor, paddingRight: 5}}
      />);
  }

  render() {
    const info: Dir.FileInfo = this.props.directory && this.props.directory.info ? this.props.directory.info : null;
    const directory: any = this.props.directory || {};

    const details = {
      name: this.props.directory ? this.props.directory.name : '',
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
          <Caption>
            {this.getIcon()}
            {details.name}
          </Caption>
          <FloatRight>
            <Controls>
              <ControlsSpan showControls={this.props.showControls}>
                <StarFontIcon
                  isFull={directory.isFavorite}
                  callback={() => {this.props.handlers.setFavourite(directory.id, directory.isFavorite)}}
                />
              </ControlsSpan>
            </Controls>
          </FloatRight>
        </Header>
        <Body>
        <DetailsPart
          parentSize={this.props.parentSize}
        >
          <DetailsContainer>
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
            <PreviewWrap>
              <FontIcon
                className="base_icons icon_folder_closed"
                style={{fontSize: 250, color: '#e8e8e8', paddingRight: 5}}
              />
            </PreviewWrap>
          </PreviewCard>
        </PreviewPart>
        </Body>
      </Root>
    )
  }
}

export default DirectoryDetailsPane
