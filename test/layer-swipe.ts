import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import BingMaps from 'ol/source/BingMaps';
import OSM from 'ol/source/OSM';
import View from 'ol/View';

const osm = new TileLayer({
  source: new OSM()
});
const bing = new TileLayer({
  source: new BingMaps({
    key: 'As1HiMj1PvLPlqc_gtM7AqZfBL8ZL3VrjaS3zIb22Uvb9WKhuJObROC-qUpa81U5',
    imagerySet: 'Aerial'
  })
});

const map = new Map({
  layers: [osm, bing],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

const swipe = document.getElementById('swipe') as HTMLInputElement;

bing.on('precompose', function(event) {
  const ctx = event.context;
  const width = ctx.canvas.width * (swipe.valueAsNumber / 100);

  ctx.save();
  ctx.beginPath();
  ctx.rect(width, 0, ctx.canvas.width - width, ctx.canvas.height);
  ctx.clip();
});

bing.on('postcompose', function(event) {
  const ctx = event.context;
  ctx.restore();
});

swipe.addEventListener('input', function() {
  map.render();
}, false);
