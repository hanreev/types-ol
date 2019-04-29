import Map from 'ol/Map';
import View from 'ol/View';
import { defaults as defaultControls, OverviewMap } from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const map = new Map({
  controls: defaultControls().extend([
    new OverviewMap()
  ]),
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  target: 'map',
  view: new View({
    center: [500000, 6000000],
    zoom: 7
  })
});
