import * as React from 'react'
import styled, { withTheme } from 'styled-components';
import Dialog from 'material-ui/Dialog';
import FontIcon from 'material-ui/FontIcon'
import { ThemeProps } from './Theme';
import * as Theme from './Theme'

export interface ImageRotationProps {
  angle: number;
  top: string;
  left: string;
  position: string;
}

const ImageNotAbsolute = styled.img`
  transform: rotate(${(prop: ImageRotationProps ) => prop.angle}deg);
  border: 1px solid ${prop => prop.theme.photoDetails.imageBorderColor};
  top: ${(prop: ImageRotationProps ) => prop.top};
  left: ${(prop: ImageRotationProps ) => prop.left};
`;

const ImageAbsolute = styled.img`
  transform: rotate(${(prop: ImageRotationProps ) => prop.angle}deg);
  border: 1px solid ${prop => prop.theme.photoDetails.imageBorderColor};
  position: ${(prop: ImageRotationProps) => prop.position};
  top: ${(prop: ImageRotationProps ) => prop.top};
  left: ${(prop: ImageRotationProps ) => prop.left};
`;

const ZoomIconIsVerticalNoRotate = styled.span`
    position: absolute;
    top: 8px;
    right: 15px;
    background-color: ${prop => prop.theme.photoDetails.zoomIconBgColor};
    border-radius: 30px;
    width: 25px;
    height: 25px;
    z-index: 100;
    cursor: pointer;
`;

const ZoomIconIsVerticalRotate = styled.span`
    position: absolute;
    top: 8px;
    right: 5px;
    background-color: ${prop => prop.theme.photoDetails.zoomIconBgColor};
    border-radius: 30px;
    width: 25px;
    height: 25px;
    z-index: 100;
    cursor: pointer;
`;

const ZoomIconIsHorizontalNoRotate = styled.span`
    position: absolute;
    top: 8px;
    right: 5px;
    background-color: ${prop => prop.theme.photoDetails.zoomIconBgColor};
    border-radius: 30px;
    width: 25px;
    height: 25px;
    z-index: 100;
    cursor: pointer;
`;

const ZoomIconIsHorizontalRotate = styled.span`
    position: absolute;
    top: 3px;
    right: 25px;
    background-color: ${prop => prop.theme.photoDetails.zoomIconBgColor};
    border-radius: 30px;
    width: 25px;
    height: 25px;
    z-index: 100;
    cursor: pointer;
`;

const FooterTitle = styled.span`
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

const DialogZoomVerticalRotateClose = styled.span`
  position: absolute;
  top: 140px;
  right: -130px;
  background-color: ${prop => prop.theme.photoDetails.zoomIconBgColor};
  border-radius: 30px;
  width: 25px;
  height: 25px;
  z-index: 100;
  cursor: pointer;
`;

const DialogZoomVerticalClose = styled.span`
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: ${prop => prop.theme.photoDetails.zoomIconBgColor};
  border-radius: 30px;
  width: 25px;
  height: 25px;
  z-index: 100;
  cursor: pointer;
`;

const DialogZoomHorizontalRotateClose = styled.span`
  position: absolute;
  top: 20px;
  right: 90px;
  background-color: ${prop => prop.theme.photoDetails.zoomIconBgColor};
  border-radius: 30px;
  width: 25px;
  height: 25px;
  z-index: 100;
  cursor: pointer;
`;

const DialogZoomHorizontalClose = styled.span`
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: ${prop => prop.theme.photoDetails.zoomIconBgColor};
  border-radius: 30px;
  width: 25px;
  height: 25px;
  z-index: 100;
  cursor: pointer;
`;

const Content = styled.div`
  position: relative;
  display: table-cell;
  vertical-align: middle;
  padding: 0;
  text-align: center;
  height: 540px;
  line-height: 540px;
`;

interface ImageContainerProp {
  top: string;
}
const ImageContainer = styled.span`
  display: inline-block;
  position: relative;
  top: ${(prop: ImageContainerProp) => prop.top};
`;

const DialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const FooterContainer = styled.div`
  display: flex;
  align-items: left;
`

const DialogTriggerContent = styled.div`

`;

const styles = {
  photo: {
  },

  zoom: {
  },

  dialog: {
    marginLeft: '20%',
    width: '59%',
    overflow: 'hidden',
  },

  content: {
    width: '85%',
  },

  body: {
  },

  icon: {
  },

  icon_zoom: {
  }

}

export interface DialogZoomProps extends React.Props<DialogZoom> {
  imageSrc: string;
  rotationAngle: number;
  width: number;
  height: number;
  isVertical: boolean;
  getFullSizeImage: () => void;
  theme?: ThemeProps;
}
export interface DialogZoomState {
  open: boolean;
}

class DialogZoom extends React.Component<DialogZoomProps, DialogZoomState> {

  static defaultProps: Partial<DialogZoomProps> = {
    theme: Theme.DEFAULT_THEME
  }
  isNotAbsolute: boolean;

  constructor (props: DialogZoomProps) {
    super(props)
    this.isNotAbsolute = false;
    this.state = {
      open: false,
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  isVerticalMode() {
    return ((this.props.isVertical && ((this.props.rotationAngle / 30) % 2 === 0)) ||
    (!this.props.isVertical && ((this.props.rotationAngle / 30) % 2 === 1)));
  }

  render() {
    let top, left = '0px';
    let position = 'relative';
    if (this.props.isVertical && (this.props.rotationAngle === 90 || this.props.rotationAngle === 270)) {
      top = '-92px';
      left = '90px';
      position = 'absolute';
    }
    if (!this.props.isVertical && (this.props.rotationAngle === 90 || this.props.rotationAngle === 270)) {
      top = '68px';
      left = '-80px';
    }
    if (!this.props.isVertical && (this.props.rotationAngle === 0 || this.props.rotationAngle === 180)) {
      this.isNotAbsolute = true;
      top = '68px';
      left = '-80px';
    }

    let heightOfDialog = 'auto';
    if (this.props.isVertical) {
      if (this.props.rotationAngle === 0 || this.props.rotationAngle === 180) {
        styles.icon = {
          position: 'relative',
          fontSize: '55%',
          color: this.props.theme.photoDetails.iconColor,
        }
        styles.zoom = {
          position: 'relative',
          width: '330px',
          height: '500px',
          transform: 'rotate(' + this.props.rotationAngle + 'deg)',
        }
      } else {
        styles.icon = {
          position: 'relative',
          fontSize: '55%',
          color: this.props.theme.photoDetails.iconColor,
          top: '-1%',
          left: '-1%',
        }
        styles.zoom = {
          position: 'relative',
          width: '330px',
          height: '600px',
          transform: 'rotate(' + this.props.rotationAngle + 'deg)',
        }
      }
    } else {
      if (this.props.rotationAngle === 0 || this.props.rotationAngle === 180) {
        styles.icon = {
          position: 'relative',
          fontSize: '55%',
          color: this.props.theme.photoDetails.iconColor,
          top: '-1%',
          left: '-1%',
        }
        styles.zoom = {
          position: 'relative',
          width: '600px',
          height: '330px',
          transform: 'rotate(' + this.props.rotationAngle + 'deg)',
        }
      } else {
        styles.icon = {
          position: 'relative',
          fontSize: '55%',
          color: this.props.theme.photoDetails.iconColor,
        }
        styles.zoom = {
          position: 'relative',
          top: '100px',
          width: '500px',
          height: '330px',
          transform: 'rotate(' + this.props.rotationAngle + 'deg)',
        }
        heightOfDialog = '550px';
      }
    }

    styles.body = {
      backgroundColor: `${'white'}`,
      padding: '2px',
      overflowX: 'hidden',
      overflowY: 'overlay',
    }
    styles.icon_zoom = {
      position: 'absolute',
      fontSize: '65%',
      color: this.props.theme.photoDetails.iconColor,
      top: '27%',
      left: '33%',
    }

    return (
      <DialogTriggerContent>
        {this.getZoomIconForStandardImages()}
        {this.getAbsoluteImages(top, left, position)}
        <Dialog

          onRequestClose={this.handleClose}
          autoDetectWindowHeight={false}
          autoScrollBodyContent={false}
          modal={false}
          style={styles.dialog}
          open={this.state.open}
          bodyStyle={styles.body}
          contentStyle={styles.content}
        >
          <DialogContainer>
            <Content>
              <ImageContainer
                top={!this.props.isVertical &&
              (this.props.rotationAngle === 0 || this.props.rotationAngle === 180) ? '110px' : '0'}
              >
                {this.getDialogZoomIcon()}
                <img src={this.props.imageSrc} style={styles.zoom}/>
              </ImageContainer>
            </Content>
            <FooterContainer>
              <FooterTitle>
                Image in low resolution
              </FooterTitle>
              <FooterLink onClick={() => {this.props.getFullSizeImage()}}>
                Get full size image
              </FooterLink>
            </FooterContainer>
          </DialogContainer>
        </Dialog>
      </DialogTriggerContent>
    )
  }

  getZoomIconForStandardImages() {
    if (this.props.isVertical) {
      if (this.props.rotationAngle === 0 || this.props.rotationAngle === 180) {
        return this.getZoomIconVerticalStandartImages();
      } else {
        return this.getZoomIconVerticalRotationImages();
      }
    } else {
      if (this.props.rotationAngle === 0 || this.props.rotationAngle === 180) {
        return this.getZoomIconHorizontalStandartImages();
      } else {
        return this.getZoomIconHorizontalRotationImages();
      }
    }
  }

  getZoomIconVerticalStandartImages() {
    return (
      <ZoomIconIsVerticalNoRotate onClick={this.handleOpen}>
        <FontIcon className="base_icons icon_expand" style={styles.icon}/>
      </ZoomIconIsVerticalNoRotate>
    )
  }

  getZoomIconVerticalRotationImages() {
    return (
      <ZoomIconIsVerticalRotate onClick={this.handleOpen}>
        <FontIcon className="base_icons icon_expand" style={styles.icon}/>
      </ZoomIconIsVerticalRotate>
    )
  }

  getZoomIconHorizontalStandartImages() {
    return (
      <ZoomIconIsHorizontalNoRotate onClick={this.handleOpen}>
        <FontIcon className="base_icons icon_expand" style={styles.icon}/>
      </ZoomIconIsHorizontalNoRotate>
    )
  }

  getZoomIconHorizontalRotationImages() {
    return (
      <ZoomIconIsHorizontalRotate onClick={this.handleOpen}>
        <FontIcon className="base_icons icon_expand" style={styles.icon}/>
      </ZoomIconIsHorizontalRotate>
    )
  }

  getAbsoluteImages(top: string, left: string, position: string) {
    if (this.isNotAbsolute) {
      return this.getNotAbsoluteImage(top, left, position);
    }
    return this.getAbsoluteImage(top, left, position);
  }

  getNotAbsoluteImage(top: string, left: string, position: string) {
    return (
      <ImageNotAbsolute
        src={this.props.imageSrc}
        angle={this.props.rotationAngle}
        width={this.props.width}
        height={this.props.height}
        position={position}
        top={top}
        left={left}
      /> )
  }

  getAbsoluteImage(top: string, left: string, position: string) {
    return (
      <ImageAbsolute
        src={this.props.imageSrc}
        angle={this.props.rotationAngle}
        width={this.props.width}
        height={this.props.height}
        position={position}
        top={top}
        left={left}
      />
    )
  }

  getDialogZoomIcon() {
    if (this.props.isVertical) {
      if (this.props.rotationAngle === 0 || this.props.rotationAngle === 180) {
        return this.getDialogZoomIconVerticalStandartImages();
      } else {
        return this.getDialogZoomIconVerticalRotationImages();
      }
    } else {
      if (this.props.rotationAngle === 0 || this.props.rotationAngle === 180) {
        return this.getDialogZoomIconHorizontalStandartImages();
      } else {
        return this.getDialogZoomIconHorizontalRotationImages();
      }
    }
  }

  getDialogZoomIconVerticalStandartImages() {
    return (
      <DialogZoomVerticalClose onClick={this.handleClose}>
        <FontIcon className="base_icons icon_collapse" style={styles.icon_zoom}/>
      </DialogZoomVerticalClose>
    )
  }

  getDialogZoomIconVerticalRotationImages() {
    return (
      <DialogZoomVerticalRotateClose onClick={this.handleClose}>
        <FontIcon className="base_icons icon_collapse" style={styles.icon_zoom}/>
      </DialogZoomVerticalRotateClose>
    )
  }

  getDialogZoomIconHorizontalStandartImages() {
    return (
      <DialogZoomHorizontalClose onClick={this.handleClose}>
        <FontIcon className="base_icons icon_collapse" style={styles.icon_zoom}/>
      </DialogZoomHorizontalClose>
    )
  }

  getDialogZoomIconHorizontalRotationImages() {
    return (
      <DialogZoomHorizontalRotateClose onClick={this.handleClose}>
        <FontIcon className="base_icons icon_collapse" style={styles.icon_zoom}/>
      </DialogZoomHorizontalRotateClose>
    )
  }
}

export default withTheme(DialogZoom)
