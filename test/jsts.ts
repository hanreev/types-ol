import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import { LineString, MultiLineString, MultiPoint, MultiPolygon, Point, Polygon } from 'ol/geom';
import LinearRing from 'ol/geom/LinearRing';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';

declare var jsts: any;

const source = new VectorSource();
fetch('data/geojson/roads-seoul.geojson').then(response => {
  return response.json();
}).then((json: any) => {
  const format = new GeoJSON();
  const features = format.readFeatures(json, { featureProjection: 'EPSG:3857' });

  const parser = new jsts.io.OL3Parser();
  parser.inject(Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon);

  for (const feature of features) {
    // convert the OpenLayers geometry to a JSTS geometry
    const jstsGeom = parser.read(feature.getGeometry());

    // create a buffer of 40 meters around each line
    const buffered = jstsGeom.buffer(40);

    // convert back from JSTS and replace the geometry on the feature
    feature.setGeometry(parser.write(buffered));
  }

  source.addFeatures(features);
});
const vectorLayer = new VectorLayer({
  source
});

const rasterLayer = new TileLayer({
  source: new OSM()
});

const map = new Map({
  layers: [rasterLayer, vectorLayer],
  target: document.getElementById('map') as HTMLElement,
  view: new View({
    center: fromLonLat([126.979293, 37.528787]),
    zoom: 15
  })
});
