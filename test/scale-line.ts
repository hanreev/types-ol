import { defaults as defaultControls, ScaleLine } from 'ol/control';
import { Units } from 'ol/control/ScaleLine';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';


const scaleLineControl = new ScaleLine();

const map = new Map({
  controls: defaultControls().extend([
    scaleLineControl
  ]),
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});


const unitsSelect = document.getElementById('units') as HTMLSelectElement;
function onChange() {
  scaleLineControl.setUnits(unitsSelect.value as Units);
}
unitsSelect.addEventListener('change', onChange);
onChange();
