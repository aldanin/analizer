# **GIS-Viewer Component API**

## **Component Description**:

1. Map creation
	- Default tile is loading (first tile that apears in the list)
2. Features on map creation.
	- Add all features if exist theier property exist, or exist with {enable: true} optional property
3. Events handlers ititiation.
	- add callbacks for event that you want to register.
----------

## Installation

- **NPM**

	----------------------
	Using local npm repository
	----------------------
	We have a local npm repository for common components.
	You may browse it's content [HYPERLINK "http://abm_commoncomp:4873/"http://abm_commoncomp:4873](http://abm_commoncomp:4873/)

	**To use @cc packages in your project**

	`npm config set @cc:registry http://abm_commoncomp:4873/`

	`npm install @cc/gis-viewer  --save`
----------

## Api ## component <cc-gis-viewer ...>

> Presents a map

## Inputs:
- **mapSettings:** Describes the map component global settings. [Models.MapSettings]
- **tileLayers:** Describes the tiles objects array that contains the source of the tile server with some properties. [Models.TileLayerDefinition[]]
- **defaultMarkerIcon:** (Optional) - Describes the default marker icon that will show anywhere in the map [Models.DefaultMarkerIcon]
- **shapeLayers:** (Optional) - Fill this shape layers array property for available overlay layers on the map. Shape layers is an array of objects that contains all the data that will render on the map. Like Markers, Circles, and Polygons. [Models.ShapeLayerDefinition[]]
- **scaleControl:** (Optional) - Set this property to enable scale control on the map [Models.ScaleControlOptions]
- **searchBox:** (Optional) - Set this search box property for availablesearch functionality on the map. With the search you could search over objects on the map, or query for places by theier name or long/lat. [Models.SearchBoxOptions]
- **miniMap:** (Optional) - Set minimap property for available minimap on the big map. [Models.MiniMapOptions]
- **drawBar:** (Optional) - Add draw bar property to add drawing objects functionality to the map. [Models.DrawBarOptions]
- **mousePosition:** (Optional) - Change mouse position behavior by adding its optional data. [Models.MousePositionOptions]
- **polylineMeasure:** (Optional) - polyline measure feature [Models.PolylineMeasureOptions]
- **zoomControl:** (Optional) - zoom control feature. [Models.ZoomControl]
- **zoomToExtend:** (Optional) - zoom to extend - fit bounds feature. [Models.ZoomToExtendOptions]
 
## Callbacks:
 
 - **onShapeDrawn**: (Optional) - Do something on every draw created / edited
- **returns** : N/A [void]
    - param shapeWkt : The drawn shape in wkt format [Models.WktShape]
- **onGetSelected**: (Optional) - Do something when every shape is selected
- **returns** : N/A [void]
    - param shape : shape object [Models.ShapeObject]
- **onBoundsChanged**: (Optional) - Do something on every change at precision(zoom) or the bounds of the map
- **returns** : N/A [void]
    - param mapBounds : New bounds [Models.MapBounds]
 
 
##  Commands:
 - **searchByString:** get search results by string
    - returns : results [any]
    - param *searchString* : text to search [string]
- **exportMapImage:** export map as an image
    - returns : base64 image data [Promise<string>]
- **selectShapeById:** (Optional) - Fire command of selecting shape by id
    - returns :  [void]
    - param *id* :  Array of ids for the shape you want to select [Models.ShapeData[]]
- **getMultiPolygon:** (Optional) - Fire command of export all polygons from drawable layer in Multipolygon WKT format
    - returns : WKT valid format of MultiPolygon [string]
- **getSelectedShapes:** (Optional) - Fire command of get all user selected shapes
    - returns : Array of ShapeDefinition [Models.ShapeDefinition[]]
- **exportCSV:** (Optional) - Fire command of creating .CSV data format from all Shape-layers
    - returns : csv file user can view [string]
- **getBounds:** (Optional) - Fire command that retreive precision(zoom) and the bounds of the map
    - returns : the precision(zoom) and the bounds of the map [Models.MapBounds]
- **exportDrawState:** (Optional) - Fire command of exports draw state in WKT format
    - returns : The drawn shapes on the map [Models.WktShape[]]
- **importDrawState:** (Optional) - Fire command of imports draw state by wkt shapes array
    - returns : Import user saved drawns and draw them to the map [void]
    - param *wktShapes* : array of shapes-objects [{ wkt:string }, ....] [Models.WktShape[]]
- **clearDrawState:** (Optional) - Fire command of clear draw layer
    - returns : Clear draw shapes layer [void]
- **importKmlFormatByString:** (Optional) - 
    - returns : Clear draw shapes layer [void]
    - param *kmlFormatStr* : stringified KML file [string]
    - param *layerName* : name of the kml layer [string]
 
----------
## Examples

	export class DevComponent extends React.Component<{}, GisViewerProps> {
	
	    private wrapper: CcGisViewer; 
	    private state: GisViewerProps;
	
	    constructor() {
	        super();
	        this.state = this.getTestState();
	    }
	
	    render() {       
	        return (
	            <CcGisViewer {...this.state} ref={(wrapper) => {this.wrapper = wrapper;}} />
	        );       
	    }
	
	    getTestState(): GisViewerProps {
		    const tileLayers: TileLayerDefinition[] = [
			    {
	                name: 'Color Map',
	                tilesURI: 'http://10.161.43.66/osm_tiles/{z}/{x}/{y}.png',
	                zoom: 2,
	                center: {
	                    lat: 32.076304,
	                    lng: 35.013960
	                },
	                minZoom: 1,
	                maxZoom: 17,
		            attributionControl: false
		        }
			];
	
	        const shapeLayers: ShapeLayerDefinition[] = [
	            {
		            layerName: 'Test layer 1',
		            shapes: [
			            {
		                    shapeObject: {
		                        shape: {
		                            coordinate: {
		                                lat: 50.50,
		                                lng: 39.11
	                                },
	                                radius: 400000
	                            },
	                            type: ShapeType.CIRCLE
	                        },
	                        data: {
		                        name: 'i am a circle'
	                        }
	                    }, {
		                    shapeObject: {
		                        shape: {
		                            coordinates: [
		                                {lng: 30.228, lat: 55.67},
		                                {lng: 30.328, lat: 55.57},
		                                {lng: 32.428, lat: 66.37},
		                                {lng: 35.528, lat: 55.07}
		                            ]
		                        },
		                        type: ShapeType.POLYGON
	                        },
	                        data: {
	                            name: 'my Polygon',
	                            count: 17
	                        }
	                    }, {
		                    shapeWkt: 'LINESTRING(16.17 62.91,65.03 56.55,44.29 24.52,1.75 20.96,-24.96 43.32)',
		                    data: {
		                        name: 'this is my polyline (known as linestring)'
		                    }
	                    }, {
		                    shapeWkt: 'MULTIPOLYGON(((40 40,20 45,45 30,40 40)),((20 35,10 30,10 10,30 5,45 20,20 35),(30 20,20 15,20 25,30 20)))',
		                    data: {
		                        name: 'this is my multipolygon',
		                        count: 44
		                    }
	                    }, {
		                    shapeWkt: 'POINT(-28.82 46.07)',
		                    data: {
		                        name: 'this is my marker',
		                        description: 'some text here.',
		                        count: 12,
		                        dateTime: 1499325674557,
		                        tag: 'SMS',
		                        id: '123'
		                    },
		                    options: {
		                        color: 'red'
		                    }
	                    }, {
		                    shapeWkt: 'LABEL(35.8281 32.073, my text)',
		                    data: {
		                        name: 'this is my label description',
		                    }
	                    }
	                ]
	            }
	        ];
	        
	        const scaleControl: ScaleControlOptions = {
	            enable: true,
	            metric: true, 
	            imperial: false,
	            position: 'bottomright'
	        };
	        const searchBox: SearchBoxOptions = {
	            enable: true,
	            searchOnLayer: true,
	            queryServerUrl: 'http://10.161.43.66/nominatim?format=json&q={s}'
	        };
	        const miniMap: MiniMapOptions = {
	            enable: false,
	            toggleDisplay: true
	        };    
	        const zoomControl: ZoomControl = {
	            enable: true
	        };
	        const drawBar: DrawBarOptions = {
	            enable: true,
	            draw: {
	                polyline: true,
					polygon: false,		// Turns off this drawing tool
	                circle: false,		// Turns off this drawing tool
	                rectangle: false,	// Turns off this drawing tool
	                marker: false		// Turns off this drawing tool
	            },
	            edit: {
	                remove: true        // Turns on remove button
	            }
	        };
	        const mousePosition: MousePositionOptions = {
		        enable: true
	        };
	        const polylineMeasure: PolylineMeasureOptions = {
		        enable: true,
		        showMeasurementsClearControl: false,
		        position: 'topleft',
		        imperial: false
	        };
	        const zoomToExtend: ZoomToExtendOptions = {
		        enable: true,
		        position: 'bottomright'
	        };
	
	        return {
	            tileLayers,
	            defaultMarkerIcon: undefined,
	            shapeLayers,
	            scaleControl,
	            searchBox,
	            miniMap,
	            drawBar,
	            zoomControl,
	            mousePosition,
	            polylineMeasure,
	            zoomToExtend,
	            onShapeDrawn: this.handleShapeDrawn,
	            onGetBounds: this.handleGetBounds,
	            onGetSelected: this.handleSelectedShapes
	        };
	    }
	    handleSelectedShapes(shape: any) {
	        console.log('Selected shape: ', shape);
	    }
	    handleShapeDrawn(shape: WktShape): void {
	        console.log("Shape is drawn: ", shape.wkt);
	    }
	    handleGetBounds(bounds: any) {
	        console.log('user receive bounds by callback: ', bounds);
	    }
	}
	
	

