import Feature from 'ol/Feature';
import View from 'ol/View';
import Map from 'ol/WebGLMap';
import Point from 'ol/geom/Point';
import SimpleGeometry from 'ol/geom/SimpleGeometry';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { AtlasManager, Circle as CircleStyle, Fill, RegularShape, Stroke, Style } from 'ol/style';

const atlasManager = new AtlasManager({
    // we increase the initial size so that all symbols fit into
    // a single atlas image
    initialSize: 512,
});

const symbolInfo = [
    {
        opacity: 1.0,
        scale: 1.0,
        fillColor: 'rgba(255, 153, 0, 0.4)',
        strokeColor: 'rgba(255, 204, 0, 0.2)',
    },
    {
        opacity: 0.75,
        scale: 1.25,
        fillColor: 'rgba(70, 80, 224, 0.4)',
        strokeColor: 'rgba(12, 21, 138, 0.2)',
    },
    {
        opacity: 0.5,
        scale: 1.5,
        fillColor: 'rgba(66, 150, 79, 0.4)',
        strokeColor: 'rgba(20, 99, 32, 0.2)',
    },
    {
        opacity: 1.0,
        scale: 1.0,
        fillColor: 'rgba(176, 61, 35, 0.4)',
        strokeColor: 'rgba(145, 43, 20, 0.2)',
    },
];

const radiuses = [3, 6, 9, 15, 19, 25];
const symbolCount = symbolInfo.length * radiuses.length * 2;
const symbols = [];
for (const info of symbolInfo) {
    for (const radius of radiuses) {
        // circle symbol
        symbols.push(
            new CircleStyle({
                radius,
                fill: new Fill({
                    color: info.fillColor,
                }),
                stroke: new Stroke({
                    color: info.strokeColor,
                    width: 1,
                }),
                // by passing the atlas manager to the symbol,
                // the symbol will be added to an atlas
                atlasManager,
            })
        );

        // star symbol
        symbols.push(
            new RegularShape({
                points: 8,
                radius,
                radius2: radius * 0.7,
                angle: 1.4,
                fill: new Fill({
                    color: info.fillColor,
                }),
                stroke: new Stroke({
                    color: info.strokeColor,
                    width: 1,
                }),
                atlasManager,
            })
        );
    }
}

const featureCount = 50000;
const features = new Array(featureCount);
let feature: Feature;
let geometry: SimpleGeometry;
const e = 25000000;
for (let i = 0; i < featureCount; ++i) {
    geometry = new Point([2 * e * Math.random() - e, 2 * e * Math.random() - e]);
    feature = new Feature(geometry);
    feature.setStyle(
        new Style({
            image: symbols[i % symbolCount],
        })
    );
    features[i] = feature;
}

const vectorSource = new VectorSource({
    features,
});
const vector = new VectorLayer({
    source: vectorSource,
});

const map = new Map({
    layers: [vector],
    target: document.getElementById('map') as HTMLElement,
    view: new View({
        center: [0, 0],
        zoom: 4,
    }),
});
