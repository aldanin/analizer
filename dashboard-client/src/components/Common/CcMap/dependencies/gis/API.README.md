## component <cc-gis-viewer ...>

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
 