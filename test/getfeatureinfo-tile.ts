import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';

const wmsSource = new TileWMS({
    url: 'https://ahocevar.com/geoserver/wms',
    params: { LAYERS: 'ne:ne', TILED: true },
    serverType: 'geoserver',
    crossOrigin: 'anonymous',
});

const wmsLayer = new TileLayer({
    source: wmsSource,
});

const view = new View({
    center: [0, 0],
    zoom: 1,
});

const map = new Map({
    layers: [wmsLayer],
    target: 'map',
    view,
});

map.on('singleclick', evt => {
    (document.getElementById('info') as HTMLElement).innerHTML = '';
    const viewResolution = view.getResolution()!;
    const url = wmsSource.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:3857', {
        INFO_FORMAT: 'text/html',
    });
    if (url) (document.getElementById('info') as HTMLElement).innerHTML = `<iframe seamless src="${url}"></iframe>`;
});

map.on('pointermove', evt => {
    if (evt.dragging) return;

    const pixel = map.getEventPixel(evt.originalEvent);
    const hit = map.forEachFeatureAtPixel(pixel, () => {
        return true;
    });
    map.getTargetElement().style.cursor = hit ? 'pointer' : '';
});
