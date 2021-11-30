import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import BingMaps from 'ol/source/BingMaps';
import OSM from 'ol/source/OSM';

const osm = new TileLayer({
    source: new OSM(),
});
const bing = new TileLayer({
    source: new BingMaps({
        key: 'As1HiMj1PvLPlqc_gtM7AqZfBL8ZL3VrjaS3zIb22Uvb9WKhuJObROC-qUpa81U5',
        imagerySet: 'Aerial',
    }),
});

const map = new Map({
    layers: [osm, bing],
    target: 'map',
    view: new View({
        center: [0, 0],
        zoom: 2,
    }),
});

const swipe = document.getElementById('swipe') as HTMLInputElement;

bing.on('prerender', event => {
    const ctx = event.context;
    if (!(ctx instanceof CanvasRenderingContext2D)) return;
    const width = ctx.canvas.width * (swipe.valueAsNumber / 100);

    ctx.save();
    ctx.beginPath();
    ctx.rect(width, 0, ctx.canvas.width - width, ctx.canvas.height);
    ctx.clip();
});

bing.on('postrender', event => {
    if (event.context instanceof CanvasRenderingContext2D) event.context.restore();
});

swipe.addEventListener(
    'input',
    () => {
        map.render();
    },
    false,
);
