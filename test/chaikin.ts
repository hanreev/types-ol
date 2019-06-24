import Map from 'ol/Map';
import View from 'ol/View';
import GeometryType from 'ol/geom/GeometryType';
import SimpleGeometry from 'ol/geom/SimpleGeometry';
import Draw from 'ol/interaction/Draw';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';

// import smooth from 'chaikin-smooth';
declare var smooth: any;

function makeSmooth(path: any[], _numIterations: number) {
  _numIterations = Math.min(Math.max(_numIterations, 1), 10);
  while (_numIterations > 0) {
    path = smooth(path);
    _numIterations--;
  }
  return path;
}

const vectorSource = new VectorSource({});

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
      opacity: 0.5
    }),
    new VectorLayer({
      source: vectorSource
    })
  ],
  target: 'map',
  view: new View({
    center: [1078373.5950, 6871994.5910],
    zoom: 5
  })
});

const shallSmoothen = document.getElementById('shall-smoothen') as HTMLInputElement;
const numIterations = document.getElementById('iterations') as HTMLInputElement;

const draw = new Draw({
  source: vectorSource,
  type: GeometryType.LINE_STRING
});

map.addInteraction(draw);

draw.on('drawend', event => {
  if (!shallSmoothen.checked) {
    return;
  }
  const feat = event.feature;
  const geometry = feat.getGeometry() as SimpleGeometry;
  const coords = geometry.getCoordinates();
  const smoothened = makeSmooth(coords, parseInt(numIterations.value, 10) || 5);
  geometry.setCoordinates(smoothened);
});
