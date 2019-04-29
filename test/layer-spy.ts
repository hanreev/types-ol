import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import { Pixel } from 'ol/pixel';
import { fromLonLat } from 'ol/proj';
import BingMaps from 'ol/source/BingMaps';
import View from 'ol/View';

const key = 'As1HiMj1PvLPlqc_gtM7AqZfBL8ZL3VrjaS3zIb22Uvb9WKhuJObROC-qUpa81U5';

const roads = new TileLayer({
  source: new BingMaps({ key: key, imagerySet: 'Road' })
});

const imagery = new TileLayer({
  source: new BingMaps({ key: key, imagerySet: 'Aerial' })
});

const container = document.getElementById('map');

const map = new Map({
  layers: [roads, imagery],
  target: container,
  view: new View({
    center: fromLonLat([-109, 46.5]),
    zoom: 6
  })
});

let radius = 75;
document.addEventListener('keydown', function(evt: KeyboardEvent) {
  // tslint:disable-next-line: deprecation
  if (evt.which === 38) {
    radius = Math.min(radius + 5, 150);
    map.render();
    evt.preventDefault();
    // tslint:disable-next-line: deprecation
  } else if (evt.which === 40) {
    radius = Math.max(radius - 5, 25);
    map.render();
    evt.preventDefault();
  }
});

// get the pixel position with every move
let mousePosition: Pixel = null;

container.addEventListener('mousemove', function(event) {
  mousePosition = map.getEventPixel(event);
  map.render();
});

container.addEventListener('mouseout', function() {
  mousePosition = null;
  map.render();
});

// before rendering the layer, do some clipping
imagery.on('precompose', function(event) {
  const ctx = event.context;
  const pixelRatio = event.frameState.pixelRatio;
  ctx.save();
  ctx.beginPath();
  if (mousePosition) {
    // only show a circle around the mouse
    ctx.arc(mousePosition[0] * pixelRatio, mousePosition[1] * pixelRatio,
      radius * pixelRatio, 0, 2 * Math.PI);
    ctx.lineWidth = 5 * pixelRatio;
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.stroke();
  }
  ctx.clip();
});

// after rendering the layer, restore the canvas context
imagery.on('postcompose', function(event) {
  const ctx = event.context;
  ctx.restore();
});
