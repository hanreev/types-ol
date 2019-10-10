import Map from 'ol/Map';
import View from 'ol/View';
import { PinchZoom, defaults as defaultInteractions } from 'ol/interaction';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const map = new Map({
    interactions: defaultInteractions({ pinchZoom: false }).extend([new PinchZoom()]),
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
    ],
    target: 'map',
    view: new View({
        center: [0, 0],
        zoom: 2,
        constrainResolution: true,
    }),
});
