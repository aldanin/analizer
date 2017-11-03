import * as React from 'react';
import * as moment from 'moment';

import { CcGisViewer } from './dependencies/gis/react-ts/cc-gis-viewer';
import {
  TileLayerDefinition, ShapeType, Coordinate
} from './dependencies/gis/react-ts/models-ts/models';

import { Location } from 'common-interfaces/types/Location';

const MAP_NAME = 'Locations';

export interface GisMapProps {
  markers?: Location[]
  tilesURI: string
  zoom?: number
  center?: Coordinate,
  selectedMarkers?: any[]
}

class GisMap extends React.Component<GisMapProps, {}> {
  private wrapper: CcGisViewer;

  componentDidUpdate() {
    if (!this.props.selectedMarkers.length) { return; }

    let selectedMarkers = [];
    this.props.selectedMarkers.forEach((markerId) => {
      selectedMarkers.push({id: markerId});
    });

    if (this.wrapper.selectShapeById) {
      this.wrapper.selectShapeById(selectedMarkers);
    }
  }

  getMarkersLayer() {
    let shapes = [];

    this.props.markers.forEach((marker) => {
      let shape: any = {
        shapeObject: {
          type: ShapeType.MARKER,
          shape: {coordinate: {lat: marker.latitude, lng: marker.longitude}}
        },
        data: {
          id: (marker).id,
          name: `${marker.latitude}, ${marker.longitude}`,
          description: moment.unix(marker.timestamp).format('DD/MM/Y HH:MM')
        }
      };

      shapes.push(shape);
    });

    return {layerName: 'Markers', isShapeLayerChecked: true, shapes};
  }

  render() {
    let center = {
      lat: this.props.markers.length ? this.props.markers[0].latitude : 0,
      lng: this.props.markers.length ? this.props.markers[0].longitude : 0
    };

    let defaultTile: TileLayerDefinition = {
      name: MAP_NAME,
      tilesURI: this.props.tilesURI,
      zoom: this.props.zoom || 10,
      center: center
    };

    let shapes = [this.getMarkersLayer()];

    return (
      <CcGisViewer
        tileLayers={[defaultTile]}
        scaleControl={{enable: false}}
        unitsChangerOptions={{enable: false}}
        shapeLayers={shapes}
        ref={(gisViewer: CcGisViewer) => {
          this.wrapper = gisViewer
        }}
      />
    );
  }
}

export default GisMap;