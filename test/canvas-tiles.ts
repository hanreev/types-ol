import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import { fromLonLat } from 'ol/proj';
import { OSM, TileDebug } from 'ol/source';
import View from 'ol/View';


const osmSource = new OSM();
const map = new Map({
  layers: [
    new TileLayer({
      source: osmSource
    }),
    new TileLayer({
      source: new TileDebug({
        projection: 'EPSG:3857',
        tileGrid: osmSource.getTileGrid()
      })
    })
  ],
  target: 'map',
  view: new View({
    center: fromLonLat([-0.1275, 51.507222]),
    zoom: 10
  })
});
