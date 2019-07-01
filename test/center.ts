import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import { Point } from 'ol/geom';
import SimpleGeometry from 'ol/geom/SimpleGeometry';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Size } from 'ol/size';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

const source = new VectorSource({
    url: 'data/geojson/switzerland.geojson',
    format: new GeoJSON(),
});
const style = new Style({
    fill: new Fill({
        color: 'rgba(255, 255, 255, 0.6)',
    }),
    stroke: new Stroke({
        color: '#319FD3',
        width: 1,
    }),
    image: new CircleStyle({
        radius: 5,
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.6)',
        }),
        stroke: new Stroke({
            color: '#319FD3',
            width: 1,
        }),
    }),
});
const vectorLayer = new VectorLayer({
    source,
    style,
});
const view = new View({
    center: [0, 0],
    zoom: 1,
});
const map = new Map({
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
        vectorLayer,
    ],
    target: 'map',
    view,
});

const zoomtoswitzerlandbest = document.getElementById('zoomtoswitzerlandbest') as HTMLElement;
zoomtoswitzerlandbest.addEventListener(
    'click',
    () => {
        const feature = source.getFeatures()[0];
        const polygon = feature.getGeometry() as SimpleGeometry;
        view.fit(polygon, { padding: [170, 50, 30, 150], constrainResolution: false });
    },
    false
);

const zoomtoswitzerlandconstrained = document.getElementById('zoomtoswitzerlandconstrained') as HTMLElement;
zoomtoswitzerlandconstrained.addEventListener(
    'click',
    () => {
        const feature = source.getFeatures()[0];
        const polygon = feature.getGeometry() as SimpleGeometry;
        view.fit(polygon, { padding: [170, 50, 30, 150] });
    },
    false
);

const zoomtoswitzerlandnearest = document.getElementById('zoomtoswitzerlandnearest') as HTMLElement;
zoomtoswitzerlandnearest.addEventListener(
    'click',
    () => {
        const feature = source.getFeatures()[0];
        const polygon = feature.getGeometry() as SimpleGeometry;
        view.fit(polygon, { padding: [170, 50, 30, 150], nearest: true });
    },
    false
);

const zoomtolausanne = document.getElementById('zoomtolausanne') as HTMLElement;
zoomtolausanne.addEventListener(
    'click',
    () => {
        const feature = source.getFeatures()[1];
        const point = feature.getGeometry() as SimpleGeometry;
        view.fit(point, { padding: [170, 50, 30, 150], minResolution: 50 });
    },
    false
);

const centerlausanne = document.getElementById('centerlausanne') as HTMLElement;
centerlausanne.addEventListener(
    'click',
    () => {
        const feature = source.getFeatures()[1];
        const point = feature.getGeometry() as Point;
        const size = map.getSize();
        view.centerOn(point.getCoordinates(), size, [570, 500]);
    },
    false
);
