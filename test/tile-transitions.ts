import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

const url = 'https://{a-c}.tiles.mapbox.com/v3/mapbox.world-bright/{z}/{x}/{y}.png';

const withTransition = new TileLayer({
    source: new XYZ({ url }),
});

const withoutTransition = new TileLayer({
    source: new XYZ({ url, transition: 0 }),
    visible: false,
});

const map = new Map({
    layers: [withTransition, withoutTransition],
    target: 'map',
    view: new View({
        center: [0, 0],
        zoom: 2,
        maxZoom: 11,
    }),
});

(document.getElementById('transition') as HTMLElement).addEventListener('change', event => {
    const transition = (event.target as HTMLInputElement).checked;
    withTransition.setVisible(transition);
    withoutTransition.setVisible(!transition);
});
