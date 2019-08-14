import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { toRadians } from 'ol/math';
import OSM from 'ol/source/OSM';

const view = new View({
    center: [0, 0],
    zoom: 2,
});
const map = new Map({
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
    ],
    target: 'map',
    view,
});

function el(id: string) {
    return document.getElementById(id) as HTMLElement;
}

// const gn = new GyroNorm();
const gn: any = {};

gn.init().then(() => {
    gn.start((event: any) => {
        const center = view.getCenter();
        const resolution = view.getResolution();
        const alpha = toRadians(event.do.beta);
        const beta = toRadians(event.do.beta);
        const gamma = toRadians(event.do.gamma);

        el('alpha').innerText = alpha + ' [rad]';
        el('beta').innerText = beta + ' [rad]';
        el('gamma').innerText = gamma + ' [rad]';

        center[0] -= resolution * gamma * 25;
        center[1] += resolution * beta * 25;

        view.setCenter(view.constrainCenter(center));
    });
});
