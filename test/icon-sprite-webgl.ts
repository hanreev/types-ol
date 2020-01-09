import Feature, { FeatureLike } from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import { Size } from 'ol/size';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';

export interface IconInfo {
    offset: Size;
    opacity: number;
    rotateWithView: boolean;
    rotation: number;
    scale: number;
    size: Size;
}

const iconInfo: IconInfo[] = [
    {
        offset: [0, 0],
        opacity: 1.0,
        rotateWithView: true,
        rotation: 0.0,
        scale: 1.0,
        size: [55, 55],
    },
    {
        offset: [110, 86],
        opacity: 0.75,
        rotateWithView: false,
        rotation: Math.PI / 2.0,
        scale: 1.25,
        size: [55, 55],
    },
    {
        offset: [55, 0],
        opacity: 0.5,
        rotateWithView: true,
        rotation: Math.PI / 3.0,
        scale: 1.5,
        size: [55, 86],
    },
    {
        offset: [212, 0],
        opacity: 1.0,
        rotateWithView: true,
        rotation: 0.0,
        scale: 1.0,
        size: [44, 44],
    },
];

let i: any;

const iconCount = iconInfo.length;
const icons = new Array(iconCount);
for (i = 0; i < iconCount; ++i) {
    const info = iconInfo[i];
    icons[i] = new Icon({
        offset: info.offset,
        opacity: info.opacity,
        rotateWithView: info.rotateWithView,
        rotation: info.rotation,
        scale: info.scale,
        size: info.size,
        crossOrigin: 'anonymous',
        src: 'data/Butterfly.png',
    });
}

const featureCount = 50000;
const features = new Array(featureCount);
let feature: any;
let geometry: any;
const e = 25000000;
for (i = 0; i < featureCount; ++i) {
    geometry = new Point([2 * e * Math.random() - e, 2 * e * Math.random() - e]);
    feature = new Feature(geometry);
    feature.setStyle(
        new Style({
            image: icons[i % (iconCount - 1)],
        }),
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
        zoom: 5,
    }),
});

const overlayFeatures = [];
for (i = 0; i < featureCount; i += 30) {
    const clone = features[i].clone();
    clone.setStyle(null);
    overlayFeatures.push(clone);
}

const layer = new VectorLayer({
    map,
    source: new VectorSource({
        features: overlayFeatures,
    }),
    style: new Style({
        image: icons[iconCount - 1],
    }),
});

map.on('click', evt => {
    const info = document.getElementById('info') as HTMLElement;
    info.innerHTML = 'Hold on a second, while I catch those butterflies for you ...';

    window.setTimeout(() => {
        const features_: Feature[] = [];
        map.forEachFeatureAtPixel(evt.pixel, (f: FeatureLike) => {
            features_.push(f as Feature);
            return false;
        });

        if (features_.length === 1) {
            info.innerHTML = 'Got one butterfly';
        } else if (features_.length > 1) {
            info.innerHTML = 'Got ' + features_.length + ' butterflies';
        } else {
            info.innerHTML = "Couldn't catch a single butterfly";
        }
    }, 1);
});

map.on('pointermove', evt => {
    if (evt.dragging) {
        return;
    }
    const pixel = map.getEventPixel(evt.originalEvent);
    const hit = map.hasFeatureAtPixel(pixel);
    (map.getTarget() as HTMLElement).style.cursor = hit ? 'pointer' : '';
});
