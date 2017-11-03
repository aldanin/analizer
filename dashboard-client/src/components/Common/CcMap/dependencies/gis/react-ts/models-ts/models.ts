
/* GisViewerProps and it children goes here */

export type GisViewerProps = {
    mapSettings?: MapSettings;
    tileLayers: TileLayerDefinition[];
    defaultMarkerIcon?: DefaultMarkerIcon;
    shapeLayers?: ShapeLayerDefinition[];
    searchBox?: SearchBoxOptions;
    unitsChangerOptions?: UnitsChangerOptions;
    miniMap?: MiniMapOptions;
    drawBar?: DrawBarOptions;
    mousePosition?: MousePositionOptions;
    polylineMeasure?: PolylineMeasureOptions;
    zoomControl?: ZoomControl;
    scaleControl?: ScaleControlOptions;
    zoomToExtend?: ZoomToExtendOptions;
    // Callbacks
    onShapeDrawn?: Function;
    onBoundsChanged?: (mapBounds: MapBounds) => void;
    onGetSelected?: Function;
};

export type MapSettings = {
    metric?: boolean;
    imperial?: boolean;
};
export type ZoomToExtendOptions = {
    enable?: boolean;
    position?: string;
};

export type ScaleControlOptions = {
    enable?: boolean;
    // metric?: boolean;
    // imperial?: boolean;
    maxWidth?: number;
    position?: string;
};

export type ZoomControl = {
    enable?: boolean;
};
export type MapOptions = {
    enable?: boolean;
    zoomControl?: boolean,
    dragging?: boolean,
    center: Coordinate,
};

export type TileLayerDefinition = {
    name: string,
    tilesURI: string, // 'http://10.164.39.38/pandonia/{z}/{x}/{y}.png',
    errorTileUrl?: string,
    center?: Coordinate,
    zoom?: number,
    maxZoom?: number,
    minZoom?: number,
    // zoomControl?: boolean,
    attributionControl?: boolean
};


export type DefaultMarkerIcon = {
    // enable?: boolean;
    iconRetinaUrl?: string,
    iconUrl: string,
    shadowUrl?: string
};

export type MousePositionOptions = {
    enable?: boolean;
    lngFormatter?: Function,
    latFormatter?: Function
};

export type SearchBoxOptions = {
    enable?: boolean;
    searchOnLayer: boolean,
    queryServerUrl?: string
};

// export type FileLayerOptions = {
//     enable?: boolean,
//     fileSizeLimit?: number,
//     formats?: string[] 
// };


export type WktShape = {
    wkt: string
};


export type Coordinate = {
    lat: number;
    lng: number;
};


export type IconOptions = {
    iconUrl: string;
    iconWidth: number,
    iconHeight: number
};

export type MiniMapOptions = {
    enable?: boolean;
    toggleDisplay?: boolean;
};

export type PolylineMeasureOptions = {
    enable?: boolean;
    showMeasurementsClearControl?: boolean,
    clearMeasurementsOnStop?: boolean, 
    showUnitControl?: boolean,
    // unit?: string,
    position?: string,
    imperial?: boolean
};

export type UnitsChangerOptions = {
    enable?: boolean;
};

export type DrawBarOptions = {
    enable?: boolean;
    draw?: DrawBarOptionsDraw,
    edit?: DrawBarOptionsEdit
};

export type DrawBarOptionsDraw = {
    polyline?: boolean,  // Turns off this drawing tool
    polygon?: boolean,   // Turns off this drawing tool
    circle?: boolean,    // Turns off this drawing tool
    rectangle?: boolean, // Turns off this drawing tool
    marker?: boolean,     // Turns off this drawing tool  
    textualMarker?: boolean
};
export type DrawBarOptionsEdit = {
    remove?: boolean
};

export type MapBounds = {
    precision: number,
    bounds: Bounds
};
export type Bounds = {
    topLeft: Coordinate,
    bottomRight: Coordinate
};

export type ShapeLayerDefinition = {
    layerName: string,   
    isShapeLayerChecked?: boolean,
    isHeatLayerChecked?: boolean,
    isClusterLayerChecked?: boolean,
    shapes: ShapeDefinition[],
};


// =========== SHAPES =========
export enum ShapeType {
    CIRCLE,
    POLYGON,
    MARKER,
    POLYLINE,
    LABEL,
    MULTIPOLYGON
}


export type ShapeDefinition = { 
    data: ShapeData;
    shapeWkt?: string;
    shapeObject?: ShapeObject;
    options?: ShapeObjectOptions;
};

export type ShapeData = {
    name?: string,
    description?: string,
    count?: number,
    dateTime?: number,
    tag?: any,
    isSelected?: boolean,
    id?: string
};

export type ShapeObject = {
     type: ShapeType,
     shape: CircleShape | PolygonShape | MarkerShape | PolylineShape | LabelShape | MultiPolygonShape; // PointShape
};
export type ShapeObjectOptions = CircleShapeOptions | PolygonShapeOptions | MarkerShapeOptions | PolylineShapeOptions | LabelShapeOptions | MultiPolygonShapeOptions; // PointShapeOptions |


// =========== CIRCLE / (POINT) =========

export type CircleShape = {
    coordinate: Coordinate,
    radius: number
};
export type CircleShapeOptions = {
    // radius: number,
    color?: string,
    fillColor?: string,
    fillOpacity?: number,
};


// =========== POLYGON =========

export type PolygonShape = {
    coordinates: Coordinate[],
    // map: Function
};

export type PolygonShapeOptions = {
    color?: string,
    fillColor?: string,
    fillOpacity?: number,
};

// =========== MULTI-POLYGON =========
//
// export type LatLngArr = number[];
// export type GeoJsonPolygon = LatLngArr[]
// export type MultiPolygonShape = {
//     polygons: GeoJsonPolygon[],
// };

export type MultiPolygonShape = {
    polygons: PolygonShape[],
};


export type MultiPolygonShapeOptions = {
    color?: string,
    fillColor?: string,
    fillOpacity?: number,
};

// =========== MARKER =========
export type MarkerShape = {
    coordinate: Coordinate,
};
export type MarkerShapeOptions = {
    customIcon?: IconOptions,   
    icon?: any; 
    draggable?: boolean,
};



// =========== POLILINE =========
export type PolylineShape = {
    coordinates: Coordinate[],
};
export type PolylineShapeOptions = {
    color?: string,
};

// =========== POINT =========
// export type PointShape = {
//     coordinate: Coordinate,
// };
// export type PointShapeOptions = {
// };

// =========== LABEL =========
export type LabelShape = {
    coordinate: Coordinate,
    text: string
};
export type LabelShapeOptions = {
    icon?: any
};