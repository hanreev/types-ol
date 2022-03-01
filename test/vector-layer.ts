import Feature, { FeatureLike } from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import { Pixel } from 'ol/pixel';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style, Text } from 'ol/style';

const style = new Style({
    fill: new Fill({
        color: 'rgba(255, 255, 255, 0.6)',
    }),
    stroke: new Stroke({
        color: '#319FD3',
        width: 1,
    }),
    text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
            color: '#000',
        }),
        stroke: new Stroke({
            color: '#fff',
            width: 3,
        }),
    }),
});

const vectorLayer = new VectorLayer({
    source: new VectorSource({
        url: 'data/geojson/countries.geojson',
        format: new GeoJSON(),
    }),
    style: feature => {
        style.getText().setText(feature.get('name'));
        return style;
    },
});

const map = new Map({
    layers: [vectorLayer],
    target: 'map',
    view: new View({
        center: [0, 0],
        zoom: 1,
    }),
});

const highlightStyle = new Style({
    stroke: new Stroke({
        color: '#f00',
        width: 1,
    }),
    fill: new Fill({
        color: 'rgba(255,0,0,0.1)',
    }),
    text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
            color: '#000',
        }),
        stroke: new Stroke({
            color: '#f00',
            width: 3,
        }),
    }),
});

const featureOverlay = new VectorLayer({
    source: new VectorSource(),
    map,
    style: feature => {
        highlightStyle.getText().setText(feature.get('name'));
        return highlightStyle;
    },
});

let highlight: FeatureLike | undefined;
const displayFeatureInfo = (pixel: Pixel) => {
    // tslint:disable-next-line: no-shadowed-variable
    const feature = map.forEachFeatureAtPixel(pixel, feature => {
        return feature;
    });

    const info = document.getElementById('info');
    if (info) info.innerHTML = feature ? `${feature.getId()}: ${feature.get('name')}` : '&nbsp;';

    if (feature !== highlight) {
        if (highlight) featureOverlay.getSource()?.removeFeature(highlight as Feature);

        if (feature) featureOverlay.getSource()?.addFeature(feature as Feature);

        highlight = feature;
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
