import Map from 'ol/Map';
import WebGLMap from 'ol/WebGLMap';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const layer = new TileLayer({
  source: new OSM()
});

const view = new View({
  center: [0, 0],
  zoom: 1
});

const map1 = new Map({
  target: 'canvasMap',
  layers: [layer],
  view: view
});

const map2 = new WebGLMap({
  target: 'webglMap',
  layers: [layer],
  view: view
});
