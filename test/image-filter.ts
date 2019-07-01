import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import BingMaps from 'ol/source/BingMaps';

const key = 'As1HiMj1PvLPlqc_gtM7AqZfBL8ZL3VrjaS3zIb22Uvb9WKhuJObROC-qUpa81U5';

const imagery = new TileLayer({
    source: new BingMaps({ key, imagerySet: 'Aerial' }),
});

const map = new Map({
    layers: [imagery],
    target: 'map',
    view: new View({
        center: fromLonLat([-120, 50]),
        zoom: 6,
    }),
});

const kernels: { [key: string]: number[] } = {
    none: [0, 0, 0, 0, 1, 0, 0, 0, 0],
    sharpen: [0, -1, 0, -1, 5, -1, 0, -1, 0],
    sharpenless: [0, -1, 0, -1, 10, -1, 0, -1, 0],
    blur: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    shadow: [1, 2, 1, 0, 1, 0, -1, -2, -1],
    emboss: [-2, 1, 0, -1, 1, 1, 0, 1, 2],
    edge: [0, 1, 0, 1, -4, 1, 0, 1, 0],
};

function normalize(kernel: number[]): number[] {
    const len = kernel.length;
    const normal = new Array(len);
    let sum = 0;
    for (const k of kernel) {
        sum += k;
    }
    if (sum <= 0) {
        (normal as any).normalized = false;
        sum = 1;
    } else {
        (normal as any).normalized = true;
    }
    for (let i = 0; i < len; ++i) {
        normal[i] = kernel[i] / sum;
    }
    return normal;
}

const select = document.getElementById('kernel') as HTMLSelectElement;
let selectedKernel = normalize(kernels[select.value]);

select.onchange = () => {
    selectedKernel = normalize(kernels[select.value]);
    map.render();
};

imagery.on('postcompose', event => {
    convolve(event.context, selectedKernel);
});

function convolve(context: CanvasRenderingContext2D, kernel: number[]) {
    const canvas = context.canvas;
    const width = canvas.width;
    const height = canvas.height;

    const size = Math.sqrt(kernel.length);
    const half = Math.floor(size / 2);

    const inputData = context.getImageData(0, 0, width, height).data;

    const output = context.createImageData(width, height);
    const outputData = output.data;

    for (let pixelY = 0; pixelY < height; ++pixelY) {
        const pixelsAbove = pixelY * width;
        for (let pixelX = 0; pixelX < width; ++pixelX) {
            let r = 0;
            let g = 0;
            let b = 0;
            let a = 0;
            for (let kernelY = 0; kernelY < size; ++kernelY) {
                for (let kernelX = 0; kernelX < size; ++kernelX) {
                    const weight = kernel[kernelY * size + kernelX];
                    const neighborY = Math.min(height - 1, Math.max(0, pixelY + kernelY - half));
                    const neighborX = Math.min(width - 1, Math.max(0, pixelX + kernelX - half));
                    const inputIndex = (neighborY * width + neighborX) * 4;
                    r += inputData[inputIndex] * weight;
                    g += inputData[inputIndex + 1] * weight;
                    b += inputData[inputIndex + 2] * weight;
                    a += inputData[inputIndex + 3] * weight;
                }
            }
            const outputIndex = (pixelsAbove + pixelX) * 4;
            outputData[outputIndex] = r;
            outputData[outputIndex + 1] = g;
            outputData[outputIndex + 2] = b;
            outputData[outputIndex + 3] = (kernel as any).normalized ? a : 255;
        }
    }
    context.putImageData(output, 0, 0);
}
