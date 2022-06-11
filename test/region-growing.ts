import Map from 'ol/Map';
import View from 'ol/View';
import { Image as ImageLayer, Tile as TileLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import BingMaps from 'ol/source/BingMaps';
import RasterSource, { RasterOperationType } from 'ol/source/Raster';

function growRegion(inputs: number[][] | ImageData[], data: any): ImageData {
    const image = inputs[0] as ImageData;
    let seed = data.pixel;
    const delta = parseInt(data.delta, 10);
    if (!seed) return image;

    seed = seed.map(Math.round);
    const width = image.width;
    const height = image.height;
    const inputData = image.data;
    const outputData = new Uint8ClampedArray(inputData);
    const seedIdx = (seed[1] * width + seed[0]) * 4;
    const seedR = inputData[seedIdx];
    const seedG = inputData[seedIdx + 1];
    const seedB = inputData[seedIdx + 2];
    let edge = [seed];
    while (edge.length) {
        const newedge = [];
        for (let i = 0, ii = edge.length; i < ii; i++) {
            // As noted in the Raster source constructor, this function is provided
            // using the `lib` option. Other functions will NOT be visible unless
            // provided using the `lib` option.
            const next = next4Edges(edge[i]);
            for (let j = 0, jj = next.length; j < jj; j++) {
                const s = next[j][0];
                const t = next[j][1];
                if (s >= 0 && s < width && t >= 0 && t < height) {
                    const ci = (t * width + s) * 4;
                    const cr = inputData[ci];
                    const cg = inputData[ci + 1];
                    const cb = inputData[ci + 2];
                    const ca = inputData[ci + 3];
                    // if alpha is zero, carry on
                    if (ci === 0) continue;

                    if (Math.abs(seedR - cr) < delta && Math.abs(seedG - cg) < delta && Math.abs(seedB - cb) < delta) {
                        outputData[ci] = 255;
                        outputData[ci + 1] = 0;
                        outputData[ci + 2] = 0;
                        outputData[ci + 3] = 255;
                        newedge.push([s, t]);
                    }
                    // mark as visited
                    inputData[ci + 3] = 0;
                }
            }
        }
        edge = newedge;
    }
    return { colorSpace: 'srgb', data: outputData, width, height };
}

function next4Edges(edge: any[]) {
    const x = edge[0];
    const y = edge[1];
    return [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
    ];
}

const key = 'As1HiMj1PvLPlqc_gtM7AqZfBL8ZL3VrjaS3zIb22Uvb9WKhuJObROC-qUpa81U5';

const imagery = new TileLayer({
    source: new BingMaps({ key, imagerySet: 'Aerial' }),
});

const raster = new RasterSource({
    sources: [imagery.getSource()!],
    operationType: RasterOperationType.IMAGE,
    operation: growRegion,
    // Functions in the `lib` object will be available to the operation run in
    // the web worker.
    lib: {
        next4Edges,
    },
});

const rasterImage = new ImageLayer({
    opacity: 0.7,
    source: raster,
});

const map = new Map({
    layers: [imagery, rasterImage],
    target: 'map',
    view: new View({
        center: fromLonLat([-119.07, 47.65]),
        zoom: 11,
    }),
});

let coordinate: number[];

map.on('click', event => {
    coordinate = event.coordinate;
    raster.changed();
});

const thresholdControl = document.getElementById('threshold') as HTMLInputElement;

raster.on('beforeoperations', event => {
    // the event.data object will be passed to operations
    const data = event.data;
    data.delta = thresholdControl.value;
    if (coordinate) data.pixel = map.getPixelFromCoordinate(coordinate);
});

function updateControlValue() {
    (document.getElementById('threshold-value') as HTMLElement).innerText = thresholdControl.value;
}
updateControlValue();

thresholdControl.addEventListener('input', () => {
    updateControlValue();
    raster.changed();
});
