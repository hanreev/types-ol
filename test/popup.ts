import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import { toStringHDMS } from 'ol/coordinate';
import TileLayer from 'ol/layer/Tile';
import { toLonLat } from 'ol/proj';
import TileJSON from 'ol/source/TileJSON';

const container = document.getElementById('popup');
const content = document.getElementById('popup-content') as HTMLElement;
const closer = document.getElementById('popup-closer') as HTMLElement;

const overlay = new Overlay({
    element: container as HTMLElement,
    autoPan: true,
    autoPanAnimation: {
        duration: 250,
    },
});

closer.onclick = () => {
    overlay.setPosition([]);
    closer.blur();
    return false;
};

const map = new Map({
    layers: [
        new TileLayer({
            source: new TileJSON({
                url: 'https://api.tiles.mapbox.com/v3/mapbox.natural-earth-hypso-bathy.json?secure',
                crossOrigin: 'anonymous',
            }),
        }),
    ],
    overlays: [overlay],
    target: 'map',
    view: new View({
        center: [0, 0],
        zoom: 2,
    }),
});

map.on('singleclick', evt => {
    const coordinate = evt.coordinate;
    const hdms = toStringHDMS(toLonLat(coordinate));

    content.innerHTML = `<p>You clicked here:</p><code>${hdms}</code>`;
    overlay.setPosition(coordinate);
});
