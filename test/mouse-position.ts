import { defaults as defaultControls } from 'ol/control';
import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';

const mousePositionControl = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: 'EPSG:4326',
  // comment the following two lines to have the mouse position
  // be placed within the map.
  className: 'custom-mouse-position',
  target: document.getElementById('mouse-position'),
  undefinedHTML: '&nbsp;'
});

const map = new Map({
  controls: defaultControls().extend([mousePositionControl]),
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

const projectionSelect = document.getElementById('projection') as HTMLSelectElement;
projectionSelect.addEventListener('change', function(event) {
  mousePositionControl.setProjection((event.target as HTMLSelectElement).value);
});

const precisionInput = document.getElementById('precision') as HTMLInputElement;
precisionInput.addEventListener('change', function(event) {
  const format = createStringXY((event.target as HTMLInputElement).valueAsNumber);
  mousePositionControl.setCoordinateFormat(format);
});
