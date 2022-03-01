import Feature, { FeatureLike } from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
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
    text: new Text(),
});

const map = new Map({
    layers: [
        new VectorLayer({
            source: new VectorSource({
                url: 'data/geojson/countries.geojson',
                format: new GeoJSON(),
            }),
            style: feature => {
                style.getText().setText(feature.get('name'));
                return style;
            },
        }),
    ],
    target: 'map',
    view: new View({
        center: [0, 0],
        zoom: 1,
    }),
});

const featureOverlay = new VectorLayer({
    source: new VectorSource(),
    map,
    style: new Style({
        stroke: new Stroke({
            color: '#f00',
            width: 1,
        }),
        fill: new Fill({
            color: 'rgba(255,0,0,0.1)',
        }),
    }),
});

let highlight: Feature;
const displayFeatureInfo = (pixel: number[]) => {
    // tslint:disable-next-line: no-shadowed-variable
    const feature = map.forEachFeatureAtPixel(pixel, (feature: FeatureLike) => {
        return feature;
    });

    const info = document.getElementById('info') as HTMLElement;
    info.innerHTML = feature ? `${feature.getId()}: ${feature.get('name')}` : '&nbsp;';

    if (feature !== highlight) {
        if (highlight) featureOverlay.getSource()?.removeFeature(highlight);

        if (feature) featureOverlay.getSource()?.addFeature(feature as Feature);

        highlight = feature as Feature;
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
