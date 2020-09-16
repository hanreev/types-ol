import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import { Coordinate } from 'ol/coordinate';
import LineString from 'ol/geom/LineString';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Stroke, Style } from 'ol/style';

const count = 10000;
const features = new Array(count);

let startPoint = [0, 0];
let endPoint: Coordinate;

let delta: number;
let deltaX: number;
let deltaY: number;
let signX = 1;
let signY = -1;

// Create a square spiral.
for (let i = 0; i < count; ++i) {
    delta = (i + 1) * 2500;
    if (i % 2 === 0) signY *= -1;
    else signX *= -1;

    deltaX = delta * signX;
    deltaY = delta * signY;
    endPoint = [startPoint[0] + deltaX, startPoint[1] + deltaY];
    features[i] = new Feature({
        geometry: new LineString([startPoint, endPoint]),
    });
    startPoint = endPoint;
}

const vector = new VectorLayer({
    source: new VectorSource({
        features,
        wrapX: false,
    }),
    style: new Style({
        stroke: new Stroke({
            color: '#666666',
            width: 1,
        }),
    }),
});

const view = new View({
    center: [0, 0],
    zoom: 0,
});

const map = new Map({
    layers: [vector],
    target: 'map',
    view,
});
