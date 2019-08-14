import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import LineString from 'ol/geom/LineString';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Stroke, Style } from 'ol/style';

const raster = new TileLayer({
    source: new OSM(),
});

const style = new Style({
    stroke: new Stroke({
        color: 'black',
        width: 1,
    }),
});

const feature = new Feature(new LineString([[-4000000, 0], [4000000, 0]]));

const vector = new VectorLayer({
    source: new VectorSource({
        features: [feature],
    }),
    style,
});

const map = new Map({
    layers: [raster, vector],
    target: 'map',
    view: new View({
        center: [0, 0],
        zoom: 2,
    }),
});

let hitTolerance: number;

const statusElement = document.getElementById('status') as HTMLElement;

map.on('singleclick', e => {
    let hit = false;
    map.forEachFeatureAtPixel(
        e.pixel,
        () => {
            hit = true;
        },
        {
            hitTolerance,
            layerFilter: () => true,
        },
    );
    if (hit) {
        style.getStroke().setColor('green');
        statusElement.innerHTML = '&nbsp;A feature got hit!';
    } else {
        style.getStroke().setColor('black');
        statusElement.innerHTML = '&nbsp;No feature got hit.';
    }
    feature.changed();
});

const selectHitToleranceElement = document.getElementById('hitTolerance') as HTMLSelectElement;
const circleCanvas = document.getElementById('circle') as HTMLCanvasElement;

const changeHitTolerance = () => {
    hitTolerance = parseInt(selectHitToleranceElement.value, 10);

    const size = 2 * hitTolerance + 2;
    circleCanvas.width = size;
    circleCanvas.height = size;
    const ctx = circleCanvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, size, size);
    ctx.beginPath();
    ctx.arc(hitTolerance + 1, hitTolerance + 1, hitTolerance + 0.5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
};

selectHitToleranceElement.onchange = changeHitTolerance;
changeHitTolerance();
