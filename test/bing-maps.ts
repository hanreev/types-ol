import BaseLayer from 'ol/layer/Base';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import BingMaps from 'ol/source/BingMaps';
import View from 'ol/View';


const styles = [
  'Road',
  'RoadOnDemand',
  'Aerial',
  'AerialWithLabels',
  'collinsBart',
  'ordnanceSurvey'
];
const layers: BaseLayer[] = [];
let i, j;
for (i = 0, j = styles.length; i < j; ++i) {
  layers.push(new TileLayer({
    visible: false,
    preload: Infinity,
    source: new BingMaps({
      key: 'As1HiMj1PvLPlqc_gtM7AqZfBL8ZL3VrjaS3zIb22Uvb9WKhuJObROC-qUpa81U5',
      imagerySet: styles[i]
      // use maxZoom 19 to see stretched tiles instead of the BingMaps
      // "no photos at this zoom level" tiles
      // maxZoom: 19
    })
  }));
}
const map = new Map({
  layers: layers,
  // Improve user experience by loading tiles while dragging/zooming. Will make
  // zooming choppy on mobile or slow devices.
  loadTilesWhileInteracting: true,
  target: 'map',
  view: new View({
    center: [-6655.5402445057125, 6709968.258934638],
    zoom: 13
  })
});

const select = document.getElementById('layer-select') as HTMLSelectElement;
function onChange() {
  const style = select.value;
  for (i = 0, j = layers.length; i < j; ++i) {
    layers[i].setVisible(styles[i] === style);
  }
}
select.addEventListener('change', onChange);
onChange();
