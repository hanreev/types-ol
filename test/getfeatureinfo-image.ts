import Map from 'ol/Map';
import View from 'ol/View';
import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';

const wmsSource = new ImageWMS({
    url: 'https://ahocevar.com/geoserver/wms',
    params: { LAYERS: 'ne:ne' },
    serverType: 'geoserver',
    crossOrigin: 'anonymous',
});

const wmsLayer = new ImageLayer({
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
    const viewResolution = view.getResolution();
    const url = wmsSource.getGetFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:3857', {
        INFO_FORMAT: 'text/html',
    });
    if (url) {
        (document.getElementById('info') as HTMLElement).innerHTML = '<iframe seamless src="' + url + '"></iframe>';
    }
});

map.on('pointermove', evt => {
    if (evt.dragging) {
        return;
    }
    const pixel = map.getEventPixel(evt.originalEvent);
    const hit = map.forEachLayerAtPixel(pixel, () => {
        return true;
    });
    map.getTargetElement().style.cursor = hit ? 'pointer' : '';
});
