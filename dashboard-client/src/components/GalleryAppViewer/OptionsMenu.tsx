import * as React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const options = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'];

export interface GalleryContentPhotoOptionsProps {
    imageOption: Function;
    photoId: number;
}

const GalleryContentPhotoOptions: React.SFC<GalleryContentPhotoOptionsProps> = (
          ({ imageOption, photoId }: GalleryContentPhotoOptionsProps ) => (
  <div>
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >

      {options.map((str, idx) => {
        return <MenuItem primaryText={str} key={idx} onClick={() => { imageOption(photoId, idx) }}/>
      })}

    </IconMenu>
  </div>
))

export default GalleryContentPhotoOptions;
