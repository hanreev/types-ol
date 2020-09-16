import Map from 'ol/Map';
import View from 'ol/View';
import { Image as ImageLayer, Tile as TileLayer } from 'ol/layer';
import { OSM, Raster, XYZ } from 'ol/source';
import { Operation, RasterOperationType } from 'ol/source/Raster';

const shade: Operation = (inputs: number[][] | ImageData[], data: any) => {
    const elevationImage = inputs[0] as ImageData;
    const width = elevationImage.width;
    const height = elevationImage.height;
    const elevationData = elevationImage.data;
    const shadeData = new Uint8ClampedArray(elevationData.length);
    const dp = data.resolution * 2;
    const maxX = width - 1;
    const maxY = height - 1;
    const pixel = [0, 0, 0, 0];
    const twoPi = 2 * Math.PI;
    const halfPi = Math.PI / 2;
    const sunEl = (Math.PI * data.sunEl) / 180;
    const sunAz = (Math.PI * data.sunAz) / 180;
    const cosSunEl = Math.cos(sunEl);
    const sinSunEl = Math.sin(sunEl);
    let pixelX: number;
    let pixelY: number;
    let x0: number;
    let x1: number;
    let y0: number;
    let y1: number;
    let offset: number;
    let z0: number;
    let z1: number;
    let dzdx: number;
    let dzdy: number;
    let slope: number;
    let aspect: number;
    let cosIncidence: number;
    let scaled: number;

    for (pixelY = 0; pixelY <= maxY; ++pixelY) {
        y0 = pixelY === 0 ? 0 : pixelY - 1;
        y1 = pixelY === maxY ? maxY : pixelY + 1;
        for (pixelX = 0; pixelX <= maxX; ++pixelX) {
            x0 = pixelX === 0 ? 0 : pixelX - 1;
            x1 = pixelX === maxX ? maxX : pixelX + 1;

            // determine elevation for (x0, pixelY)
            offset = (pixelY * width + x0) * 4;
            pixel[0] = elevationData[offset];
            pixel[1] = elevationData[offset + 1];
            pixel[2] = elevationData[offset + 2];
            pixel[3] = elevationData[offset + 3];
            z0 = data.vert * (pixel[0] + pixel[1] * 2 + pixel[2] * 3);

            // determine elevation for (x1, pixelY)
            offset = (pixelY * width + x1) * 4;
            pixel[0] = elevationData[offset];
            pixel[1] = elevationData[offset + 1];
            pixel[2] = elevationData[offset + 2];
            pixel[3] = elevationData[offset + 3];
            z1 = data.vert * (pixel[0] + pixel[1] * 2 + pixel[2] * 3);

            dzdx = (z1 - z0) / dp;

            // determine elevation for (pixelX, y0)
            offset = (y0 * width + pixelX) * 4;
            pixel[0] = elevationData[offset];
            pixel[1] = elevationData[offset + 1];
            pixel[2] = elevationData[offset + 2];
            pixel[3] = elevationData[offset + 3];
            z0 = data.vert * (pixel[0] + pixel[1] * 2 + pixel[2] * 3);

            // determine elevation for (pixelX, y1)
            offset = (y1 * width + pixelX) * 4;
            pixel[0] = elevationData[offset];
            pixel[1] = elevationData[offset + 1];
            pixel[2] = elevationData[offset + 2];
            pixel[3] = elevationData[offset + 3];
            z1 = data.vert * (pixel[0] + pixel[1] * 2 + pixel[2] * 3);

            dzdy = (z1 - z0) / dp;

            slope = Math.atan(Math.sqrt(dzdx * dzdx + dzdy * dzdy));

            aspect = Math.atan2(dzdy, -dzdx);
            if (aspect < 0) aspect = halfPi - aspect;
            else if (aspect > halfPi) aspect = twoPi - aspect + halfPi;
            else aspect = halfPi - aspect;

            cosIncidence = sinSunEl * Math.cos(slope) + cosSunEl * Math.sin(slope) * Math.cos(sunAz - aspect);

            offset = (pixelY * width + pixelX) * 4;
            scaled = 255 * cosIncidence;
            shadeData[offset] = scaled;
            shadeData[offset + 1] = scaled;
            shadeData[offset + 2] = scaled;
            shadeData[offset + 3] = elevationData[offset + 3];
        }
    }

    return { data: shadeData, width, height };
};

const elevation = new XYZ({
    url: 'https://{a-d}.tiles.mapbox.com/v3/aj.sf-dem/{z}/{x}/{y}.png',
    crossOrigin: 'anonymous',
    transition: 0,
});

const raster = new Raster({
    sources: [elevation],
    operationType: RasterOperationType.IMAGE,
    operation: shade,
});

const map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
        new ImageLayer({
            opacity: 0.3,
            source: raster,
        }),
    ],
    view: new View({
        extent: [-13675026, 4439648, -13580856, 4580292],
        center: [-13615645, 4497969],
        minZoom: 10,
        maxZoom: 16,
        zoom: 13,
    }),
});

const controlIds = ['vert', 'sunEl', 'sunAz'];
const controls: { [key: string]: HTMLInputElement } = {};
controlIds.forEach(id => {
    const control = document.getElementById(id) as HTMLInputElement;
    const output = document.getElementById(id + 'Out') as HTMLElement;
    control.addEventListener('input', () => {
        output.innerText = control.value;
        raster.changed();
    });
    output.innerText = control.value;
    controls[id] = control;
});

raster.on('beforeoperations', event => {
    // the event.data object will be passed to operations
    const data = event.data;
    data.resolution = event.resolution;
    for (const id of Object.keys(controls)) data[id] = Number(controls[id].value);
});
