import { Coordinate } from 'ol/coordinate';
import KML from 'ol/format/KML';
import Polygon from 'ol/geom/Polygon';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Map from 'ol/Map';
import { toContext } from 'ol/render';
import Stamen from 'ol/source/Stamen';
import VectorSource from 'ol/source/Vector';
import { Fill, Icon, Stroke, Style } from 'ol/style';
import { StyleFunction } from 'ol/style/Style';
import View from 'ol/View';


const symbol = [[0, 0], [4, 2], [6, 0], [10, 5], [6, 3], [4, 5], [0, 0]];
let scale: number;
const scaleFunction = function(coordinate: Coordinate) {
  return [coordinate[0] * scale, coordinate[1] * scale];
};

const styleCache: { [key: number]: Style } = {};
const styleFunction: StyleFunction = function(feature) {
  // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
  // standards-violating <magnitude> tag in each Placemark.  We extract it from
  // the Placemark's name instead.
  const name = feature.get('name');
  const magnitude = parseFloat(name.substr(2));
  const size = parseInt(String(10 + 40 * (magnitude - 5)), 10);
  scale = size / 10;
  let style = styleCache[size];
  if (!style) {
    const canvas = document.createElement('canvas');
    const vectorContext = toContext(
      canvas.getContext('2d'),
      { size: [size, size], pixelRatio: 1 });
    vectorContext.setStyle(new Style({
      fill: new Fill({ color: 'rgba(255, 153, 0, 0.4)' }),
      stroke: new Stroke({ color: 'rgba(255, 204, 0, 0.2)', width: 2 })
    }));
    vectorContext.drawGeometry(new Polygon([symbol.map(scaleFunction)]));
    style = new Style({
      image: new Icon({
        img: canvas,
        imgSize: [size, size],
        rotation: 1.2
      })
    });
    styleCache[size] = style;
  }
  return style;
};

const vector = new VectorLayer({
  source: new VectorSource({
    url: 'data/kml/2012_Earthquakes_Mag5.kml',
    format: new KML({
      extractStyles: false
    })
  }),
  style: styleFunction
});

const raster = new TileLayer({
  source: new Stamen({
    layer: 'toner'
  })
});

const map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});
