/* tslint:disable */

/**
 * -------------------------------------------------------------------------------------
 * Component:   cc-gis-viewer
 * Description: Presents a map
 *
 * Generated:   Sun, 06 Aug 2017 08:52:20 GMT
 * -------------------------------------------------------------------------------------
 *
 * Inputs:
 * -------
 *    mapSettings [Models.MapSettings]: Describes the map component global settings.
 *    tileLayers [Models.TileLayerDefinition[]]: Describes the tiles objects array that contains the source of the tile server with some properties.
 *    defaultMarkerIcon [Models.DefaultMarkerIcon]: (Optional) - Describes the default marker icon that will show anywhere in the map
 *    shapeLayers [Models.ShapeLayerDefinition[]]: (Optional) - Fill this shape layers array property for available overlay layers on the map. Shape layers is an array of objects that contains all the data that will render on the map. Like Markers, Circles, and Polygons.
 *    scaleControl [Models.ScaleControlOptions]: (Optional) - Set this property to enable scale control on the map
 *    searchBox [Models.SearchBoxOptions]: (Optional) - Set this search box property for availablesearch functionality on the map. With the search you could search over objects on the map, or query for places by theier name or long/lat.
 *    miniMap [Models.MiniMapOptions]: (Optional) - Set minimap property for available minimap on the big map.
 *    drawBar [Models.DrawBarOptions]: (Optional) - Add draw bar property to add drawing objects functionality to the map.
 *    mousePosition [Models.MousePositionOptions]: (Optional) - Change mouse position behavior by adding its optional data.
 *    polylineMeasure [Models.PolylineMeasureOptions]: (Optional) - polyline measure feature
 *    zoomControl [Models.ZoomControl]: (Optional) - zoom control feature.
 *    zoomToExtend [Models.ZoomToExtendOptions]: (Optional) - zoom to extend - fit bounds feature.
 *    unitsChangerOptions [Models.UnitsChangerOptions]: (Optional) - Toggle between units (km or imperial)
 *
 * Callbacks:
 * ----------
 *    onShapeDrawn: (Optional) - Do something on every draw created / edited
 *        return value [void]: N/A
 *        param shapeWkt [Models.WktShape]: The drawn shape in wkt format
 *
 *    onGetSelected: (Optional) - Do something when every shape is selected
 *        return value [void]: N/A
 *        param shape [Models.ShapeObject]: shape object
 *
 *    onBoundsChanged: (Optional) - Do something on every change at precision(zoom) or the bounds of the map
 *        return value [void]: N/A
 *        param mapBounds [Models.MapBounds]: New bounds
 *
 *
 * Commands:
 * ----------
 *    exportMapImage: export map as an image
 *        return value [Promise<string>]: base64 image data
 *
 *    selectShapeById: (Optional) - Fire command of selecting shape by id
 *        return value [void]: 
 *        param shapeDataArray [Models.ShapeData[]]: Array of objects that contains the shape id ex: [{ id:&#39;...&#39;}, ...]
 *
 *    getMultiPolygon: (Optional) - Fire command of export all polygons from drawable layer in Multipolygon WKT format
 *        return value [string]: WKT valid format of MultiPolygon
 *
 *    getSelectedShapes: (Optional) - Fire command of get all user selected shapes
 *        return value [Models.ShapeDefinition[]]: Array of ShapeDefinition
 *
 *    exportCSV: (Optional) - Fire command of creating .CSV data format from all Shape-layers
 *        return value [string]: csv file user can view
 *
 *    getBounds: (Optional) - Fire command that retreive precision(zoom) and the bounds of the map
 *        return value [Models.MapBounds]: the precision(zoom) and the bounds of the map
 *
 *    exportDrawState: (Optional) - Fire command of exports draw state in WKT format
 *        return value [Models.WktShape[]]: The drawn shapes on the map
 *
 *    importDrawState: (Optional) - Fire command of imports draw state by wkt shapes array
 *        return value [void]: Import user saved drawns and draw them to the map
 *        param wktShapes [Models.WktShape[]]: array of shapes-objects [{ wkt:string }, ....]
 *
 *    clearDrawState: (Optional) - Fire command of clear draw layer
 *        return value [void]: Clear draw shapes layer
 *
 *    importKmlFormatByString: (Optional) - 
 *        return value [void]: Clear draw shapes layer
 *        param kmlFormatStr [string]: stringified KML file
 *        param layerName [string]: name of the kml layer
 *
 *
 */

import * as React from 'react';
import {commonComponentsConfiguration} from "../../common-components-configuration";

import * as Models from './models-ts/models';     window["__PREVENT_TS_NO_USE_ERROR__"] = Models;  


var staticPath = commonComponentsConfiguration.staticPath.replace('${componentName}', 'cc-gis-viewer');

export class CcGisViewer extends React.Component<Models.GisViewerProps, null> {
    private static nextSubframeId: number = 1;
    private static liveComponents: {} = {};
    private subframeId: number;
    private child: any;

    
    // export map as an image
    public exportMapImage(
        ): Promise<string> {
        
        if (!this.child) throw new Error("Child in not connected");
    
        return this.child.runCommand('exportMapImage', arguments);
    }
    
    // (Optional) - Fire command of selecting shape by id
    public selectShapeById(
                shapeDataArray: Models.ShapeData[], //Array of objects that contains the shape id ex: [{ id:&#39;...&#39;}, ...]
        ): void {
        
        if (!this.child) throw new Error("Child in not connected");
    
        this.child.runCommand('selectShapeById', arguments);
    }
    
    // (Optional) - Fire command of export all polygons from drawable layer in Multipolygon WKT format
    public getMultiPolygon(
        ): string {
        
        if (!this.child) throw new Error("Child in not connected");
    
        return this.child.runCommand('getMultiPolygon', arguments);
    }
    
    // (Optional) - Fire command of get all user selected shapes
    public getSelectedShapes(
        ): Models.ShapeDefinition[] {
        
        if (!this.child) throw new Error("Child in not connected");
    
        return this.child.runCommand('getSelectedShapes', arguments);
    }
    
    // (Optional) - Fire command of creating .CSV data format from all Shape-layers
    public exportCSV(
        ): string {
        
        if (!this.child) throw new Error("Child in not connected");
    
        return this.child.runCommand('exportCSV', arguments);
    }
    
    // (Optional) - Fire command that retreive precision(zoom) and the bounds of the map
    public getBounds(
        ): Models.MapBounds {
        
        if (!this.child) throw new Error("Child in not connected");
    
        return this.child.runCommand('getBounds', arguments);
    }
    
    // (Optional) - Fire command of exports draw state in WKT format
    public exportDrawState(
        ): Models.WktShape[] {
        
        if (!this.child) throw new Error("Child in not connected");
    
        return this.child.runCommand('exportDrawState', arguments);
    }
    
    // (Optional) - Fire command of imports draw state by wkt shapes array
    public importDrawState(
                wktShapes: Models.WktShape[], //array of shapes-objects [{ wkt:string }, ....]
        ): void {
        
        if (!this.child) throw new Error("Child in not connected");
    
        this.child.runCommand('importDrawState', arguments);
    }
    
    // (Optional) - Fire command of clear draw layer
    public clearDrawState(
        ): void {
        
        if (!this.child) throw new Error("Child in not connected");
    
        this.child.runCommand('clearDrawState', arguments);
    }
    
    // (Optional) - 
    public importKmlFormatByString(
                kmlFormatStr: string, //stringified KML file
                layerName: string, //name of the kml layer
        ): void {
        
        if (!this.child) throw new Error("Child in not connected");
    
        this.child.runCommand('importKmlFormatByString', arguments);
    }
        
   componentWillReceiveProps(nextProps: Models.GisViewerProps) {
        this.update(nextProps);
   }    

   public render() {
        
        
        return (                
              <div style={{"width": "100%" , "height": "100%"}}>                  
                  <iframe 
                        style={{"width": "100%" , "height": "100%"}}
                        src={ `${staticPath}/index.html?id=${this.subframeId}` }
                    />     

              </div>
        );
    }

    shouldComponentUpdate(nextProps: any, nextState: any){
        return false;
    }


    componentWillMount() {
        this.subframeId = CcGisViewer.nextSubframeId++;
        CcGisViewer.liveComponents[this.subframeId] = this;        
    }


    componentWillUnmount() {
        delete CcGisViewer.liveComponents[this.subframeId];
    }


    connect(child: any) {
        this.child = child;
        return this.getStateObject(this.props);
    }

    update(props: Models.GisViewerProps) {
        if (this.child) {
            this.child.setState(this.getStateObject(props));
        }
    }

    getStateObject(props: Models.GisViewerProps) {
        
        let me = this;

        
        return {
                            mapSettings: props.mapSettings,
                            tileLayers: props.tileLayers,
                            defaultMarkerIcon: props.defaultMarkerIcon,
                            shapeLayers: props.shapeLayers,
                            scaleControl: props.scaleControl,
                            searchBox: props.searchBox,
                            miniMap: props.miniMap,
                            drawBar: props.drawBar,
                            mousePosition: props.mousePosition,
                            polylineMeasure: props.polylineMeasure,
                            zoomControl: props.zoomControl,
                            zoomToExtend: props.zoomToExtend,
                            unitsChangerOptions: props.unitsChangerOptions,
            

                        onShapeDrawn: function() {
                props.onShapeDrawn && props.onShapeDrawn.apply(me, arguments);
            },
                        onGetSelected: function() {
                props.onGetSelected && props.onGetSelected.apply(me, arguments);
            },
                        onBoundsChanged: function() {
                props.onBoundsChanged && props.onBoundsChanged.apply(me, arguments);
            },
            
        };
    }

 
}

window["CommonComponents.CcGisViewer"] = CcGisViewer;


