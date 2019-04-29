import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import XYZ from 'ol/source/XYZ';
import View from 'ol/View';

const url = 'https://{a-c}.tiles.mapbox.com/v3/mapbox.world-bright/{z}/{x}/{y}.png';

const withTransition = new TileLayer({
  source: new XYZ({ url: url })
});

const withoutTransition = new TileLayer({
  source: new XYZ({ url: url, transition: 0 }),
  visible: false
});

const map = new Map({
  layers: [withTransition, withoutTransition],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
    maxZoom: 11
  })
});

document.getElementById('transition').addEventListener('change', function(event) {
  const transition = (event.target as HTMLInputElement).checked;
  withTransition.setVisible(transition);
  withoutTransition.setVisible(!transition);
});
