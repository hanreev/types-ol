import Feature, { FeatureLike } from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import { Coordinate } from 'ol/coordinate';
import IGC from 'ol/format/IGC';
import { LineString, Point } from 'ol/geom';
import SimpleGeometry from 'ol/geom/SimpleGeometry';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import OSM, { ATTRIBUTION } from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

const colors: { [key: string]: string } = {
    'Clement Latour': 'rgba(0, 0, 255, 0.7)',
    'Damien de Baesnt': 'rgba(0, 215, 255, 0.7)',
    'Sylvain Dhonneur': 'rgba(0, 165, 255, 0.7)',
    'Tom Payne': 'rgba(0, 255, 255, 0.7)',
    'Ulrich Prinz': 'rgba(0, 215, 255, 0.7)',
};

const styleCache: { [key: string]: Style } = {};
const styleFunction = (feature: FeatureLike) => {
    const color = colors[feature.get('PLT')];
    let style_ = styleCache[color];
    if (!style_) {
        style_ = new Style({
            stroke: new Stroke({
                color,
                width: 3,
            }),
        });
        styleCache[color] = style_;
    }
    return style_;
};

const vectorSource = new VectorSource();

const igcUrls = ['data/igc/Clement-Latour.igc', 'data/igc/Damien-de-Baenst.igc', 'data/igc/Sylvain-Dhonneur.igc', 'data/igc/Tom-Payne.igc', 'data/igc/Ulrich-Prinz.igc'];

function get(url: string, callback: (p0: string) => void) {
    const client = new XMLHttpRequest();
    client.open('GET', url);
    client.onload = () => {
        callback(client.responseText);
    };
    client.send();
}

const igcFormat = new IGC();
for (const igcUrl of igcUrls) {
    get(igcUrl, data => {
        const features = igcFormat.readFeatures(data, { featureProjection: 'EPSG:3857' });
        vectorSource.addFeatures(features);
    });
}

const time = {
    start: Infinity,
    stop: -Infinity,
    duration: 0,
};
vectorSource.on('addfeature', event => {
    const geometry = event.feature.getGeometry() as SimpleGeometry;
    time.start = Math.min(time.start, geometry.getFirstCoordinate()[2]);
    time.stop = Math.max(time.stop, geometry.getLastCoordinate()[2]);
    time.duration = time.stop - time.start;
});

const map = new Map({
    layers: [
        new TileLayer({
            source: new OSM({
                attributions: ['All maps © <a href="https://www.opencyclemap.org/">OpenCycleMap</a>', ATTRIBUTION],
                url: 'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png' + '?apikey=0e6fc415256d4fbb9b5166a718591d71',
            }),
        }),
        new VectorLayer({
            source: vectorSource,
            style: styleFunction,
        }),
    ],
    target: 'map',
    view: new View({
        center: [703365.7089403362, 5714629.865071137],
        zoom: 9,
    }),
});

let point: Point = null as any;
let line: LineString = null as any;
const displaySnap = (coordinate: Coordinate) => {
    const closestFeature = vectorSource.getClosestFeatureToCoordinate(coordinate);
    const info = document.getElementById('info') as HTMLElement;
    if (closestFeature === null) {
        point = null as any;
        line = null as any;
        info.innerHTML = '&nbsp;';
    } else {
        const geometry = closestFeature.getGeometry();
        const closestPoint = geometry.getClosestPoint(coordinate);
        if (point === null) {
            point = new Point(closestPoint);
        } else {
            point.setCoordinates(closestPoint);
        }
        const date = new Date(closestPoint[2] * 1000);
        info.innerHTML = closestFeature.get('PLT') + ' (' + date.toUTCString() + ')';
        const coordinates = [coordinate, [closestPoint[0], closestPoint[1]]];
        if (line === null) {
            line = new LineString(coordinates);
        } else {
            line.setCoordinates(coordinates);
        }
    }
    map.render();
};

map.on('pointermove', evt => {
    if (evt.dragging) {
        return;
    }
    const coordinate = map.getEventCoordinate(evt.originalEvent);
    displaySnap(coordinate);
});

map.on('click', evt => {
    displaySnap(evt.coordinate);
});

const stroke = new Stroke({
    color: 'rgba(255,0,0,0.9)',
    width: 1,
});
const style = new Style({
    stroke,
    image: new CircleStyle({
        radius: 5,
        fill: null as any,
        stroke,
    }),
});
map.on('postcompose', evt => {
    const vectorContext = evt.vectorContext;
    vectorContext.setStyle(style);
    if (point !== null) {
        vectorContext.drawGeometry(point);
    }
    if (line !== null) {
        vectorContext.drawGeometry(line);
    }
});

const featureOverlay = new VectorLayer({
    source: new VectorSource(),
    map,
    style: new Style({
        image: new CircleStyle({
            radius: 5,
            fill: new Fill({
                color: 'rgba(255,0,0,0.9)',
            }),
        }),
    }),
});

(document.getElementById('time') as HTMLElement).addEventListener('input', function() {
    const value = parseInt((this as HTMLInputElement).value, 10) / 100;
    const m = time.start + time.duration * value;
    vectorSource.forEachFeature((feature: any) => {
        const geometry = feature.getGeometry();
        const coordinate = geometry.getCoordinateAtM(m, true);
        let highlight = feature.get('highlight');
        if (highlight === undefined) {
            highlight = new Feature(new Point(coordinate));
            feature.set('highlight', highlight);
            featureOverlay.getSource().addFeature(highlight);
        } else {
            highlight.getGeometry().setCoordinates(coordinate);
        }
    });
    map.render();
});
