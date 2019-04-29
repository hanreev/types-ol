import { PluggableMap } from 'ol';
import { ZoomSlider } from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';


/**
 * Helper method for map-creation.
 */
function createMap(divId: string): PluggableMap {
  const source = new OSM();
  const layer = new TileLayer({
    source: source
  });
  const map = new Map({
    layers: [layer],
    target: divId,
    view: new View({
      center: [0, 0],
      zoom: 2
    })
  });
  const zoomslider = new ZoomSlider();
  map.addControl(zoomslider);
  return map;
}

const map1 = createMap('map1');
const map2 = createMap('map2');
const map3 = createMap('map3');
