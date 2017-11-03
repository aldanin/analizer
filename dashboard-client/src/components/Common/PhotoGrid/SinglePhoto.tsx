import * as React from 'react'
import styled from 'styled-components';
import * as Moment from 'moment';
import { withTheme } from 'styled-components';
import { PhotoGridThemeProps, DEFAULT_THEME } from './Theme';
import { ThemeProvider } from 'styled-components';
import Checkbox from '../Checkbox/index';
import { PhotoGridID } from './index';
import SearchMarker from '../SearchMarker/index';
import { TagData } from '../../../types/Tag';
import NotAvailable from './NotAvailable';

export interface SizeProp {
  height: string;
  width: string;
}

const Div = styled.div`
  position: relative;
  width: ${(prop: SizeProp) => prop.width};
  height: ${(prop: SizeProp) => prop.height};
  text-align: center;
  margin: 15px;

  &:hover {
    background-color: ${prop => prop.theme.hoverBgColor};
  }
`;

interface ContainerProps {
  marginBottom: string;
}

const Container = styled.span`
  display: inline-block;
  height: 70%;
  margin: 5px;
  margin-bottom: ${(prop: ContainerProps) => prop.marginBottom};
`;

const Image = styled.span`
  position: relative;
  top: 10px;
  margin-bottom: 5%;
  text-align: center;
`;

const DateContainer = styled.span`
  margin-top: 14px;
  display: block;
  text-align: center;
  align-content: center;
  height: 25%;
  width: 100%;
  color: ${prop => prop.theme.textColor};
  font-size: 80%;
  text-align: center;
`;

const CheckboxSpan = styled.span`
  position: absolute;
  top: 17px;
  left: 20px;
  z-index: 1000;
`;

interface TwoImagesContainerProps {
  border: string;
}
const TwoImagesContainer = styled.div`
  position: relative;
  right: 1px;
  width: 235px;
  height: 235px;
  border-left: ${(prop: TwoImagesContainerProps) => prop.border};
  box-sizing: border-box;
`;

const LeftImage = styled.span`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 48%;
  height: 100%;
  background-image: url("${prop => prop.src}");
  background-size: cover;
  background-position: center;
`;

const RightImage = styled.span`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  width: 48%;
  height: 100%;
  background-image: url("${prop => prop.src}");
  background-size: cover;
  background-position: center;
`;

const TopImage = styled.span`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 48%;
  background-image: url("${prop => prop.src}");
  background-size: cover;
  background-position: center;
`;

const BottomImage = styled.span`
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 48%;
  background-image: url("${prop => prop.src}");
  background-size: cover;
  background-position: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  background color: ${prop => prop.theme.imageContainer};
  height: 100%;
  width: 100%;
`;

const styles = {
  singleImage: {
  },

  doubleImageHorizontal: {
    width: '90px',
    height: '163px',
  },

  doubleImageVertical: {
    width: '174px',
    height: '78px',
  },
}

export interface SinglePhotoProps extends React.Props<SinglePhoto> {
  id: PhotoGridID;
  name: string;
  url: string;
  url2: string;
  date: number;
  starSpan: JSX.Element;
  isFavorite: boolean;
  isVertical: boolean;
  tags: TagData[];
  actions: JSX.Element;
  height: string;
  width: string;
  highlight: boolean;
  headerTool: (id: PhotoGridID, title: string, isFavorite: boolean, isChecked: boolean) => JSX.Element;
  selectedItem: (id: PhotoGridID) => void;
  isCheckboxVisible: boolean;
  actionMenu?: (id: PhotoGridID) => void;
  onItemSelected: (photoId: PhotoGridID) => void;
  onItemUnSelected: (photoId: PhotoGridID) => void;
  isItemSelected?: (photoId: PhotoGridID) => boolean;
  theme?: PhotoGridThemeProps
}

export interface SinglePhotoState {
  isMouseOn: boolean;
  isChecked: boolean;
}

class SinglePhoto extends React.Component<SinglePhotoProps, SinglePhotoState> {
  static defaultProps: Partial<SinglePhotoProps> = {
    theme: DEFAULT_THEME,
    actionMenu: () => null,
    isItemSelected: () => false,
  }

  constructor (props: SinglePhotoProps) {
    super(props);

    this.state = {
      isMouseOn: false,
      isChecked: false,
    }
  }

  componentWillReceiveProps(nextProps: SinglePhotoProps) {
    this.setState({
      isChecked: nextProps.isItemSelected(nextProps.id),
    })
  }

  onCheck() {
    if (this.state.isChecked) {
      this.props.onItemUnSelected(this.props.id)
    } else {
      this.props.onItemSelected(this.props.id)
    }

    this.setState({isChecked: !this.state.isChecked})
  }

  renderTime(ticks: number) {
    if (ticks === 0) { return 'N/A'}
    return Moment(ticks).format('DD/MM/YYYY  HH:mm')
  }

  render() {

    styles.singleImage = {
      width: '90%',
      height: '100%',
      borderLeft: this.props.highlight ? '3px solid ' + this.props.theme.markerColor : '3px solid transparent',
    }

    return (
      <ThemeProvider theme={this.props.theme}>
        {!!this.props.url && this.props.url !== 'N/A' ? (
          <Div
            style={this.state.isChecked ? {backgroundColor: this.props.theme.checkBgColor} : null}
            height={this.props.height}
            width={this.props.width}
            onMouseOver={() => {this.setState({isMouseOn: true})}}
            onMouseLeave={() => {this.setState({isMouseOn: false})}}
          >
            <Container marginBottom={this.props.url2 !== '' ? '16%' : 'none'}>
              <Image>
                {this.props.url2 === '' ? (
                  <img
                    src={this.props.url}
                    style={styles.singleImage}
                    onClick={() => {this.props.selectedItem(this.props.id)}}
                  />
                ) : (
                  <TwoImagesContainer
                    border={this.props.highlight ?
                      '3px solid' + this.props.theme.markerColor : '3px solid transparent'}
                  >
                    {this.props.isVertical ? (
                      <ImageWrapper>
                        <LeftImage
                          src={this.props.url}
                          onClick={() => {this.props.selectedItem(this.props.id)}}
                        />
                        <RightImage
                          src={this.props.url2}
                          onClick={() => {this.props.selectedItem(this.props.id)}}
                        />
                      </ImageWrapper>
                    ) : (
                      <ImageWrapper>
                        <TopImage
                          src={this.props.url}
                          onClick={() => {this.props.selectedItem(this.props.id)}}
                        />
                        <BottomImage
                          src={this.props.url2}
                          onClick={() => {this.props.selectedItem(this.props.id)}}
                        />
                      </ImageWrapper>
                    )}
                  </TwoImagesContainer> )}
              </Image>
            </Container>
            <DateContainer>
              <SearchMarker>{this.renderTime(this.props.date)}</SearchMarker>
            </DateContainer>
            {this.props.actionMenu(this.props.id)}
            {this.props.isFavorite && !this.state.isMouseOn ? this.props.starSpan : null}
            {this.state.isMouseOn ?
              this.props.headerTool(
                this.props.id,
                this.props.name,
                this.props.isFavorite, false) : null}
            {this.state.isChecked || this.props.isCheckboxVisible ? (
                <CheckboxSpan><Checkbox
                  size="12px"
                  theme={this.props.theme.checkBox}
                  setChecked={this.props.isItemSelected(this.props.id)}
                  onCheck={() => {this.onCheck()}}
                />
                </CheckboxSpan>) :
              this.state.isMouseOn  ? (
                <CheckboxSpan><Checkbox
                  size="12px"
                  theme={this.props.theme.checkBox}
                  setChecked={this.props.isItemSelected(this.props.id)}
                  onCheck={() => {this.onCheck()}}
                />
                </CheckboxSpan>) : null }
          </Div>
        ) : <div onClick={() => {this.props.selectedItem(this.props.id)}}><NotAvailable/></div>}

      </ThemeProvider>
    )
  }
}

export default withTheme(SinglePhoto)
