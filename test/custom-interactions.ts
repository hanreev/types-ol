import { MapBrowserEvent } from 'ol';
import Feature from 'ol/Feature';
import { LineString, Point, Polygon } from 'ol/geom';
import { defaults as defaultInteractions, Pointer as PointerInteraction } from 'ol/interaction';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Map from 'ol/Map';
import { Pixel } from 'ol/pixel';
import { TileJSON, Vector as VectorSource } from 'ol/source';
import { Fill, Icon, Stroke, Style } from 'ol/style';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import View from 'ol/View';


class Drag extends PointerInteraction {
  private coordinate_: Pixel;
  private cursor_: string;
  private feature_: Feature;
  private previousCursor_: string;

  constructor() {
    super({
      handleDownEvent: handleDownEvent,
      handleDragEvent: handleDragEvent,
      handleMoveEvent: handleMoveEvent,
      handleUpEvent: handleUpEvent
    });

    this.coordinate_ = null;

    this.cursor_ = 'pointer';

    this.feature_ = null;

    this.previousCursor_ = undefined;
  }
}


function handleDownEvent(evt: MapBrowserEvent) {
  // tslint:disable-next-line: no-shadowed-variable
  const map: Map = evt.map;

  const feature = map.forEachFeatureAtPixel(evt.pixel,
    // tslint:disable-next-line: no-shadowed-variable
    function(feature) {
      return feature;
    });

  if (feature) {
    this.coordinate_ = evt.coordinate;
    this.feature_ = feature;
  }

  return !!feature;
}


function handleDragEvent(evt: MapBrowserEvent) {
  const deltaX = evt.coordinate[0] - this.coordinate_[0];
  const deltaY = evt.coordinate[1] - this.coordinate_[1];

  const geometry = this.feature_.getGeometry();
  geometry.translate(deltaX, deltaY);

  this.coordinate_[0] = evt.coordinate[0];
  this.coordinate_[1] = evt.coordinate[1];
}


function handleMoveEvent(evt: MapBrowserEvent) {
  if (this.cursor_) {
    // tslint:disable-next-line: no-shadowed-variable
    const map: Map = evt.map;
    const feature = map.forEachFeatureAtPixel(evt.pixel,
      // tslint:disable-next-line: no-shadowed-variable
      function(feature) {
        return feature;
      });
    const element = evt.map.getTargetElement();
    if (feature) {
      if (element.style.cursor != this.cursor_) {
        this.previousCursor_ = element.style.cursor;
        element.style.cursor = this.cursor_;
      }
    } else if (this.previousCursor_ !== undefined) {
      element.style.cursor = this.previousCursor_;
      this.previousCursor_ = undefined;
    }
  }
}


function handleUpEvent() {
  this.coordinate_ = null;
  this.feature_ = null;
  return false;
}


const pointFeature = new Feature(new Point([0, 0]));

const lineFeature = new Feature(
  new LineString([[-1e7, 1e6], [-1e6, 3e6]]));

const polygonFeature = new Feature(
  new Polygon([[[-3e6, -1e6], [-3e6, 1e6],
  [-1e6, 1e6], [-1e6, -1e6], [-3e6, -1e6]]]));


const map = new Map({
  interactions: defaultInteractions().extend([new Drag()]),
  layers: [
    new TileLayer({
      source: new TileJSON({
        url: 'https://api.tiles.mapbox.com/v3/mapbox.geography-class.json?secure'
      })
    }),
    new VectorLayer({
      source: new VectorSource({
        features: [pointFeature, lineFeature, polygonFeature]
      }),
      style: new Style({
        image: new Icon(/** @type {module:ol/style/Icon~Options} */({
          anchor: [0.5, 46],
          anchorXUnits: IconAnchorUnits.FRACTION,
          anchorYUnits: IconAnchorUnits.PIXELS,
          opacity: 0.95,
          src: 'data/icon.png'
        })),
        stroke: new Stroke({
          width: 3,
          color: [255, 0, 0, 1]
        }),
        fill: new Fill({
          color: [0, 0, 255, 0.6]
        })
      })
    })
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});
