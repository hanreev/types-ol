import { Feature } from 'ol';
import { FeatureLike } from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import { createEmpty, extend, getHeight, getWidth } from 'ol/extent';
import KML from 'ol/format/KML';
import { Select, defaults as defaultInteractions } from 'ol/interaction';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Cluster, Stamen, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, RegularShape, Stroke, Style, Text } from 'ol/style';
import { StyleFunction } from 'ol/style/Style';

const earthquakeFill = new Fill({
    color: 'rgba(255, 153, 0, 0.8)',
});
const earthquakeStroke = new Stroke({
    color: 'rgba(255, 204, 0, 0.2)',
    width: 1,
});
const textFill = new Fill({
    color: '#fff',
});
const textStroke = new Stroke({
    color: 'rgba(0, 0, 0, 0.6)',
    width: 3,
});
const invisibleFill = new Fill({
    color: 'rgba(255, 255, 255, 0.01)',
});

function createEarthquakeStyle(feature: Feature) {
    // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
    // standards-violating <magnitude> tag in each Placemark.  We extract it
    // from the Placemark's name instead.
    const name = feature.get('name');
    const magnitude = parseFloat(name.substr(2));
    const radius = 5 + 20 * (magnitude - 5);

    return new Style({
        geometry: feature.getGeometry(),
        image: new RegularShape({
            radius1: radius,
            radius2: 3,
            points: 5,
            angle: Math.PI,
            fill: earthquakeFill,
            stroke: earthquakeStroke,
        }),
    });
}

let maxFeatureCount: number;
let vector: VectorLayer = null as any;
const calculateClusterInfo = (resolution: number) => {
    maxFeatureCount = 0;
    const features = vector.getSource()!.getFeatures();
    let feature: Feature;
    let radius: number;
    for (let i = features.length - 1; i >= 0; --i) {
        feature = features[i];
        const originalFeatures = feature.get('features');
        const extent = createEmpty();
        for (const originalFeature of originalFeatures) extend(extent, originalFeature.getGeometry().getExtent());

        maxFeatureCount = Math.max(maxFeatureCount, originalFeatures.length);
        radius = (0.25 * (getWidth(extent) + getHeight(extent))) / resolution;
        feature.set('radius', radius);
    }
};

let currentResolution: number;
const styleFunction: StyleFunction = (feature, resolution) => {
    if (resolution !== currentResolution) {
        calculateClusterInfo(resolution);
        currentResolution = resolution;
    }
    let style;
    const size = feature.get('features').length;
    if (size > 1) {
        style = new Style({
            image: new CircleStyle({
                radius: feature.get('radius'),
                fill: new Fill({
                    color: [255, 153, 0, Math.min(0.8, 0.4 + size / maxFeatureCount)],
                }),
            }),
            text: new Text({
                text: size.toString(),
                fill: textFill,
                stroke: textStroke,
            }),
        });
    } else {
        const originalFeature = feature.get('features')[0];
        style = createEarthquakeStyle(originalFeature);
    }
    return style;
};

function selectStyleFunction(feature: FeatureLike) {
    const styles = [
        new Style({
            image: new CircleStyle({
                radius: feature.get('radius'),
                fill: invisibleFill,
            }),
        }),
    ];
    const originalFeatures = feature.get('features');
    let originalFeature;
    for (let i = originalFeatures.length - 1; i >= 0; --i) {
        originalFeature = originalFeatures[i];
        styles.push(createEarthquakeStyle(originalFeature));
    }
    return styles;
}

vector = new VectorLayer({
    source: new Cluster({
        distance: 40,
        source: new VectorSource({
            url: 'data/kml/2012_Earthquakes_Mag5.kml',
            format: new KML({
                extractStyles: false,
            }),
        }),
    }),
    style: styleFunction,
});

const raster = new TileLayer({
    source: new Stamen({
        layer: 'toner',
    }),
});

const map = new Map({
    layers: [raster, vector],
    interactions: defaultInteractions().extend([
        new Select({
            condition: evt => {
                return evt.type === 'pointermove' || evt.type === 'singleclick';
            },
            style: selectStyleFunction,
        }),
    ]),
    target: 'map',
    view: new View({
        center: [0, 0],
        zoom: 2,
    }),
});
