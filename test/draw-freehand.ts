import Map from 'ol/Map';
import View from 'ol/View';
import { Type as GeometryType } from 'ol/geom/Geometry';
import Draw from 'ol/interaction/Draw';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';

const raster = new TileLayer({
    source: new OSM(),
});

const source = new VectorSource({ wrapX: false });

const vector = new VectorLayer({
    source,
});

const map = new Map({
    layers: [raster, vector],
    target: 'map',
    view: new View({
        center: [-11000000, 4600000],
        zoom: 4,
    }),
});

const typeSelect = document.getElementById('type') as HTMLSelectElement;

let draw: Draw; // global so we can remove it later
function addInteraction() {
    const value = typeSelect.value;
    if (value !== 'None') {
        draw = new Draw({
            source,
            type: typeSelect.value as GeometryType,
            freehand: true,
        });
        map.addInteraction(draw);
    }
}

typeSelect.onchange = () => {
    map.removeInteraction(draw);
    addInteraction();
};

addInteraction();
