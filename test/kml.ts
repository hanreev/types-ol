import { Feature } from 'ol';
import Map from 'ol/Map';
import View from 'ol/View';
import KML from 'ol/format/KML';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Pixel } from 'ol/pixel';
import BingMaps from 'ol/source/BingMaps';
import VectorSource from 'ol/source/Vector';

const raster = new TileLayer({
    source: new BingMaps({
        imagerySet: 'Aerial',
        key: 'As1HiMj1PvLPlqc_gtM7AqZfBL8ZL3VrjaS3zIb22Uvb9WKhuJObROC-qUpa81U5',
    }),
});

const vector = new VectorLayer({
    source: new VectorSource({
        url: 'data/kml/2012-02-10.kml',
        format: new KML(),
    }),
});

const map = new Map({
    layers: [raster, vector],
    target: document.getElementById('map') as HTMLElement,
    view: new View({
        center: [876970.8463461736, 5859807.853963373],
        projection: 'EPSG:3857',
        zoom: 10,
    }),
});

const displayFeatureInfo = (pixel: Pixel) => {
    const features: Feature[] = [];
    map.forEachFeatureAtPixel(pixel, feature => {
        features.push(feature as Feature);
    });
    if (features.length > 0) {
        const info = [];
        for (const f of features) info.push(f.get('name'));

        (document.getElementById('info') as HTMLElement).innerHTML = info.join(', ') || '(unknown)';
        (map.getTarget() as HTMLElement).style.cursor = 'pointer';
    } else {
        (document.getElementById('info') as HTMLElement).innerHTML = '&nbsp;';
        (map.getTarget() as HTMLElement).style.cursor = '';
    }
};

map.on('pointermove', evt => {
    if (evt.dragging) return;

    const pixel = map.getEventPixel(evt.originalEvent);
    displayFeatureInfo(pixel);
});

map.on('click', evt => {
    displayFeatureInfo(evt.pixel);
});
