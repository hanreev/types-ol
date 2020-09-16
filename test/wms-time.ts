import Map from 'ol/Map';
import View from 'ol/View';
import { getCenter } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import { transformExtent } from 'ol/proj';
import Stamen from 'ol/source/Stamen';
import TileWMS from 'ol/source/TileWMS';

function threeHoursAgo() {
    return new Date(Math.round(Date.now() / 3600000) * 3600000 - 3600000 * 3);
}

const extent = transformExtent([-126, 24, -66, 50], 'EPSG:4326', 'EPSG:3857');
let startDate = threeHoursAgo();
const frameRate = 0.5; // frames per second
let animationId: number | null = null;

const layers = [
    new TileLayer({
        source: new Stamen({
            layer: 'terrain',
        }),
    }),
    new TileLayer({
        extent,
        source: new TileWMS({
            attributions: ['Iowa State University'],
            url: 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi',
            params: { LAYERS: 'nexrad-n0r-wmst' },
        }),
    }),
];
const map = new Map({
    layers,
    target: 'map',
    view: new View({
        center: getCenter(extent),
        zoom: 4,
    }),
});

function updateInfo() {
    const el = document.getElementById('info');
    if (el) el.innerHTML = startDate.toISOString();
}

function setTime() {
    startDate.setMinutes(startDate.getMinutes() + 15);
    if (startDate.valueOf() > Date.now()) startDate = threeHoursAgo();
    (layers[1].getSource() as TileWMS).updateParams({ TIME: startDate.toISOString() });
    updateInfo();
}
setTime();

const stop = () => {
    if (animationId !== null) {
        window.clearInterval(animationId);
        animationId = null;
    }
};

const play = () => {
    stop();
    animationId = window.setInterval(setTime, 1000 / frameRate);
};

const startButton = document.getElementById('play');
startButton && startButton.addEventListener('click', play, false);

const stopButton = document.getElementById('pause');
stopButton && stopButton.addEventListener('click', stop, false);

updateInfo();
