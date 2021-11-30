import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import BingMaps from 'ol/source/BingMaps';

const key = 'As1HiMj1PvLPlqc_gtM7AqZfBL8ZL3VrjaS3zIb22Uvb9WKhuJObROC-qUpa81U5';

const imagery = new TileLayer({
    source: new BingMaps({ key, imagerySet: 'Aerial' }),
});

const container = document.getElementById('map') as HTMLElement;

const map = new Map({
    layers: [imagery],
    target: container,
    view: new View({
        center: fromLonLat([-109, 46.5]),
        zoom: 6,
    }),
});

let radius = 75;
document.addEventListener('keydown', evt => {
    // tslint:disable-next-line: deprecation
    if (evt.which === 38) {
        radius = Math.min(radius + 5, 150);
        map.render();
        evt.preventDefault();
        // tslint:disable-next-line: deprecation
    } else if (evt.which === 40) {
        radius = Math.max(radius - 5, 25);
        map.render();
        evt.preventDefault();
    }
});

// get the pixel position with every move
let mousePosition: number[] = null as any;

container.addEventListener('mousemove', event => {
    mousePosition = map.getEventPixel(event);
    map.render();
});

container.addEventListener('mouseout', () => {
    mousePosition = null as any;
    map.render();
});

// after rendering the layer, show an oversampled version around the pointer
imagery.on('postrender', event => {
    if (mousePosition) {
        const context = event.context;
        if (!(context instanceof CanvasRenderingContext2D)) return;
        const pixelRatio = event.frameState.pixelRatio;
        const half = radius * pixelRatio;
        const centerX = mousePosition[0] * pixelRatio;
        const centerY = mousePosition[1] * pixelRatio;
        const originX = centerX - half;
        const originY = centerY - half;
        const size = 2 * half + 1;
        const sourceData = context.getImageData(originX, originY, size, size).data;
        const dest = context.createImageData(size, size);
        const destData = dest.data;
        for (let j = 0; j < size; ++j)
            for (let i = 0; i < size; ++i) {
                const dI = i - half;
                const dJ = j - half;
                const dist = Math.sqrt(dI * dI + dJ * dJ);
                let sourceI = i;
                let sourceJ = j;
                if (dist < half) {
                    sourceI = Math.round(half + dI / 2);
                    sourceJ = Math.round(half + dJ / 2);
                }
                const destOffset = (j * size + i) * 4;
                const sourceOffset = (sourceJ * size + sourceI) * 4;
                destData[destOffset] = sourceData[sourceOffset];
                destData[destOffset + 1] = sourceData[sourceOffset + 1];
                destData[destOffset + 2] = sourceData[sourceOffset + 2];
                destData[destOffset + 3] = sourceData[sourceOffset + 3];
            }

        context.beginPath();
        context.arc(centerX, centerY, half, 0, 2 * Math.PI);
        context.lineWidth = 3 * pixelRatio;
        context.strokeStyle = 'rgba(255,255,255,0.5)';
        context.putImageData(dest, originX, originY);
        context.stroke();
        context.restore();
    }
});
