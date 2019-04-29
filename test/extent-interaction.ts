import GeoJSON from 'ol/format/GeoJSON';
import ExtentInteraction from 'ol/interaction/Extent';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Map from 'ol/Map';
import { OSM, Vector as VectorSource } from 'ol/source';
import View from 'ol/View';

const vectorSource = new VectorSource({
  url: 'data/geojson/countries.geojson',
  format: new GeoJSON()
});

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    new VectorLayer({
      source: vectorSource
    })
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

const extent = new ExtentInteraction();
map.addInteraction(extent);
extent.setActive(false);

// Enable interaction by holding shift
window.addEventListener('keydown', function(event) {
  // tslint:disable-next-line: deprecation
  if (event.keyCode == 16) {
    extent.setActive(true);
  }
});
window.addEventListener('keyup', function(event) {
  // tslint:disable-next-line: deprecation
  if (event.keyCode == 16) {
    extent.setActive(false);
  }
});
