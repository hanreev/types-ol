import GeometryType from 'ol/geom/GeometryType';
import Draw from 'ol/interaction/Draw';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Map from 'ol/Map';
import { OSM, Vector as VectorSource } from 'ol/source';
import View from 'ol/View';

const raster = new TileLayer({
  source: new OSM()
});

const source = new VectorSource({ wrapX: false });

const vector = new VectorLayer({
  source: source
});

const map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [-11000000, 4600000],
    zoom: 4
  })
});

const typeSelect = document.getElementById('type') as HTMLSelectElement;

let draw: Draw; // global so we can remove it later
function addInteraction() {
  const value = typeSelect.value;
  if (value !== 'None') {
    draw = new Draw({
      source: source,
      type: typeSelect.value as GeometryType
    });
    map.addInteraction(draw);
  }
}


/**
 * Handle change event.
 */
typeSelect.onchange = function() {
  map.removeInteraction(draw);
  addInteraction();
};

addInteraction();
