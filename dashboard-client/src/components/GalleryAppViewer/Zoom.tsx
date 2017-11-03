import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import styled from 'styled-components';
import FontIcon from 'material-ui/FontIcon'
import { ThemeProps } from './Theme';
import { withTheme } from 'styled-components';
import { RotationSpanProps } from './Details';
import SearchMarker from '../Common/SearchMarker/index';

export interface ZoomProps {
  imageSrc: string;
  degree: number;
  onRotate: Function;
  isOpen: boolean;
  closeDialog: () => void;
  getFullSizeImage: () => void;
  theme?: ThemeProps;
}

export interface ZoomState {

}

const Div = styled.div`
  display: table;
  width: 100%;
  height: 370px;
`;

const TableCell = styled.span`
  position: relative;
  display: table-cell;
  vertical-align: middle;
  padding: 0;
  text-align: center;
`;

const ImageContainer = styled.span`
  display: inline-block;
  position: relative;
`;

const DialogSpan0Degree = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: ${prop => prop.theme.photoDetails.zoomIconBgColor};
  border-radius: 30px;
  width: 25px;
  height: 25px;
  z-index: 100;
  cursor: pointer;
`;

const DialogSpan90Degree = styled.span`
  position: absolute;
  top: 5px;
  left: 5px;
  background-color: ${prop => prop.theme.photoDetails.zoomIconBgColor};
  border-radius: 30px;
  width: 25px;
  height: 25px;
  z-index: 100;
  cursor: pointer;
  transform: rotate(-${(prop: RotationSpanProps) => prop.degree}deg);
`;

const DialogSpan180Degree = styled.span`
  position: absolute;
  bottom: 15px;
  left: 10px;
  background-color: ${prop => prop.theme.photoDetails.zoomIconBgColor};
  border-radius: 30px;
  width: 25px;
  height: 25px;
  z-index: 100;
  cursor: pointer;
  transform: rotate(-${(prop: RotationSpanProps) => prop.degree}deg);
`;

const DialogSpan270Degree = styled.span`
  position: absolute;
  bottom: 15px;
  right: 10px;
  background-color: ${prop => prop.theme.photoDetails.zoomIconBgColor};
  border-radius: 30px;
  width: 25px;
  height: 25px;
  z-index: 100;
  cursor: pointer;
  transform: rotate(-${(prop: RotationSpanProps) => prop.degree}deg);
`;

const DialogZoomCloseSpan0Degree = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: ${prop => prop.theme.photoDetails.zoomIconBgColor};
  border-radius: 30px;
  width: 25px;
  height: 25px;
  z-index: 100;
  cursor: pointer;
`;

const DialogZoomCloseSpan90Degree = styled.span`
  position: absolute;
  top: 5px;
  left: 5px;
  background-color: ${prop => prop.theme.photoDetails.zoomIconBgColor};
  border-radius: 30px;
  width: 25px;
  height: 25px;
  z-index: 100;
  cursor: pointer;
  transform: rotate(-${(prop: RotationSpanProps) => prop.degree}deg);
`;

const DialogZoomCloseSpan180Degree = styled.span`
  position: absolute;
  bottom: 15px;
  left: 10px;
  background-color: ${prop => prop.theme.photoDetails.zoomIconBgColor};
  border-radius: 30px;
  width: 25px;
  height: 25px;
  z-index: 100;
  cursor: pointer;
  transform: rotate(-${(prop: RotationSpanProps) => prop.degree}deg);
`;

const DialogZoomCloseSpan270Degree = styled.span`
  position: absolute;
  bottom: 15px;
  right: 10px;
  background-color: ${prop => prop.theme.photoDetails.zoomIconBgColor};
  border-radius: 30px;
  width: 25px;
  height: 25px;
  z-index: 100;
  cursor: pointer;
  transform: rotate(-${(prop: RotationSpanProps) => prop.degree}deg);
`;

const FooterTitle = styled.div`
  display: inline-block;
  color: ${prop => prop.theme.photoDetails.labelTitleColor};
  font-size: 80%;
  margin-right: 1%;
  margin-top: 15px;
`;

const FooterLink = styled.span`
  display: inline-block;
  color: ${prop => prop.theme.photoDetails.linkTextColor};
  cursor: pointer;
  font-size: 80%;
  margin-top: 15px;
`;

const DialogBody = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 550px;
  max-width: 550px;
`;

const DialogImageContainer = styled.span`
  position: relative;
  display: table;
  width: 500px;
  height: 500px;
`;

const MiddleImage = styled.span`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`;

const DialogFooterContainer = styled.span`
  display: flex;
  margin-left: 5.5%;
`;

const DialogImageSpan = styled.span`
  position: relative;
  display: inline-block;
  transform: rotate(${(prop: RotationSpanProps) => prop.degree}deg);
`;

const styles = {
  photo: {
  },

  zoom: {
  },

  dialog: {
    marginLeft: '20%',
    width: '55%',
    overflow: 'hidden',
  },

  body: {

  },

  icon: {

  },

  icon_zoom: {

  }

}

class DialogZoomImage extends React.Component<ZoomProps, ZoomState> {
  state = {
    open: this.props.isOpen,
  };

  componentWillReceiveProps(newProps: ZoomProps) {
    this.setState({open: newProps.isOpen})
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
    this.props.closeDialog();
  };

  getSpanForZoomOpenIcon() {
    switch (this.props.degree) {
      case 90:
        return (
          <DialogSpan90Degree degree={90} onClick={this.handleOpen}>
            <FontIcon className="base_icons icon_expand" style={styles.icon}/>
          </DialogSpan90Degree>)

      case 180:
        return (
          <DialogSpan180Degree degree={180} onClick={this.handleOpen}>
            <FontIcon className="base_icons icon_expand" style={styles.icon}/>
          </DialogSpan180Degree>)

      case 270:
        return (
          <DialogSpan270Degree degree={270} onClick={this.handleOpen}>
            <FontIcon className="base_icons icon_expand" style={styles.icon}/>
          </DialogSpan270Degree>)

      default:
        return (
          <DialogSpan0Degree onClick={this.handleOpen}>
            <FontIcon className="base_icons icon_expand" style={styles.icon}/>
          </DialogSpan0Degree>)
    }
  }

  getSpanForZoomCloseIcon() {
    switch (this.props.degree) {
      case 90:
        return (
          <DialogZoomCloseSpan90Degree degree={90} onClick={this.handleClose}>
            <FontIcon className="base_icons icon_collapse" style={styles.icon_zoom}/>
          </DialogZoomCloseSpan90Degree>)

      case 180:
        return (
          <DialogZoomCloseSpan180Degree degree={180} onClick={this.handleClose}>
            <FontIcon className="base_icons icon_collapse" style={styles.icon_zoom}/>
          </DialogZoomCloseSpan180Degree>)

      case 270:
        return (
          <DialogZoomCloseSpan270Degree degree={270} onClick={this.handleClose}>
            <FontIcon className="base_icons icon_collapse" style={styles.icon_zoom}/>
          </DialogZoomCloseSpan270Degree>)

      default:
        return (
          <DialogZoomCloseSpan0Degree onClick={this.handleClose}>
            <FontIcon className="base_icons icon_collapse" style={styles.icon_zoom}/>
          </DialogZoomCloseSpan0Degree>)
    }
  }

  render() {

    {styles.icon = {
      position: 'relative',
      fontSize: '55%',
      color: this.props.theme.photoDetails.iconColor,
    }
     styles.body = {
       height: 'auto',
       backgroundColor: `${this.props.theme.dialogBgColor}`,
       textAlign: '-webkit-center',
     }
    }
    styles.icon_zoom = {
      position: 'relative',
      fontSize: '65%',
      color: this.props.theme.photoDetails.iconColor,
      top: '8%',
    }
    styles.zoom = {
      maxWidth: '500px',
      maxHeight: '500px',
    };

    switch ((this.props.degree / 30) % 2) {
      case 1:
        styles.photo = {
          display: 'inline-block',
          maxWidth: '350px',
          maxHeight: '350px',
          position: 'relative',
          margin: 'auto',
          border: `3px solid ${this.props.theme.photoDetails.imageBorderColor}`,
        };
        break;

      default:
        styles.photo = {
          display: 'inline-block',
          maxWidth: '350px',
          maxHeight: '350px',
          position: 'relative',
          margin: 'auto',
          border: `3px solid ${this.props.theme.photoDetails.imageBorderColor}`,
        };
        break;
    }

    return (
      <Div>
        <TableCell>
          <ImageContainer>
            {this.getSpanForZoomOpenIcon()}
              <img
                src={this.props.imageSrc}
                style={styles.photo}
                id="gallery-details-img"
              />
          </ImageContainer>
        </TableCell>
        <Dialog
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={true}
          autoScrollBodyContent={false}
          modal={false}
          style={styles.dialog}
          open={this.state.open}
          bodyStyle={styles.body}
        >
          <DialogBody>
            <DialogImageContainer>
              <MiddleImage>
                <DialogImageSpan degree={this.props.degree}>
                  <img src={this.props.imageSrc} style={styles.zoom}/>
                  {this.getSpanForZoomCloseIcon()}
                </DialogImageSpan>
              </MiddleImage>
            </DialogImageContainer>
            <DialogFooterContainer>
              <FooterTitle>
                <SearchMarker>Image in low resolution</SearchMarker>
              </FooterTitle>
              <FooterLink onClick={() => {this.props.getFullSizeImage()}}>
                <SearchMarker>Get full size image</SearchMarker>
              </FooterLink>
            </DialogFooterContainer>
          </DialogBody>
        </Dialog>
      </Div>
    );
  }
}

export default withTheme(DialogZoomImage);
