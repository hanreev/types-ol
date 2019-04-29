import GeometryType from 'ol/geom/GeometryType';
import { Draw, Modify, Snap } from 'ol/interaction';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Map from 'ol/Map';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import View from 'ol/View';

const raster = new TileLayer({
  source: new OSM()
});

const source = new VectorSource();
const vector = new VectorLayer({
  source: source,
  style: new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new Stroke({
      color: '#ffcc33',
      width: 2
    }),
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: '#ffcc33'
      })
    })
  })
});

const map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [-11000000, 4600000],
    zoom: 4
  })
});

const modify = new Modify({ source: source });
map.addInteraction(modify);

let draw: Draw, snap: Snap; // global so we can remove them later
const typeSelect = document.getElementById('type') as HTMLSelectElement;

function addInteractions() {
  draw = new Draw({
    source: source,
    type: typeSelect.value as GeometryType
  });
  map.addInteraction(draw);
  snap = new Snap({ source: source });
  map.addInteraction(snap);

}

/**
 * Handle change event.
 */
typeSelect.onchange = function() {
  map.removeInteraction(draw);
  map.removeInteraction(snap);
  addInteractions();
};

addInteractions();
