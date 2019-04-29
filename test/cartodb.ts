import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import { CartoDB, OSM } from 'ol/source';
import View from 'ol/View';

const mapConfig = {
  'layers': [{
    'type': 'cartodb',
    'options': {
      'cartocss_version': '2.1.1',
      'cartocss': '#layer { polygon-fill: #F00; }',
      'sql': 'select * from european_countries_e where area > 0'
    }
  }]
};

const cartoDBSource = new CartoDB({
  account: 'documentation',
  config: mapConfig
});

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    new TileLayer({
      source: cartoDBSource
    })
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

function setArea(n: string) {
  mapConfig.layers[0].options.sql =
    'select * from european_countries_e where area > ' + n;
  cartoDBSource.setConfig(mapConfig);
}


(document.getElementById('country-area') as HTMLSelectElement).addEventListener('change', function() {
  setArea(this.value);
});
