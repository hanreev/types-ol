import Map from 'ol/Map';
import View from 'ol/View';
import { getTopLeft, getWidth } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import { get as getProjection } from 'ol/proj';
import OSM from 'ol/source/OSM';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';

// create the WMTS tile grid in the google projection
const projection = getProjection('EPSG:3857')!;
const tileSizePixels = 256;
const tileSizeMtrs = getWidth(projection.getExtent()) / tileSizePixels;
const matrixIds: string[] = [];
const resolutions = [];
for (let i = 0; i <= 14; i++) {
    matrixIds[i] = i.toString();
    resolutions[i] = tileSizeMtrs / Math.pow(2, i);
}
const tileGrid = new WMTSTileGrid({
    origin: getTopLeft(projection.getExtent()),
    resolutions,
    matrixIds,
});

const scalgoToken = 'CC5BF28A7D96B320C7DFBFD1236B5BEB';

const wmtsSource = new WMTS({
    url: 'http://ts2.scalgo.com/olpatch/wmts?token=' + scalgoToken,
    layer: 'SRTM_4_1:SRTM_4_1_flooded_sealevels',
    format: 'image/png',
    matrixSet: 'EPSG:3857',
    attributions: [
        '<a href="http://scalgo.com">SCALGO</a>',
        '<a href="http://www.cgiar-csi.org/data/' + 'srtm-90m-digital-elevation-database-v4-1">CGIAR-CSI SRTM</a>',
    ],
    tileGrid,
    style: 'default',
    dimensions: {
        threshold: 100,
    },
});

const map = new Map({
    target: 'map',
    view: new View({
        projection,
        center: [-9871995, 3566245],
        zoom: 6,
    }),
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
        new TileLayer({
            opacity: 0.5,
            source: wmtsSource,
        }),
    ],
});

const updateSourceDimension = (source: WMTS, sliderVal: string | number) => {
    source.updateDimensions({ threshold: sliderVal });
    const theinfoEl = document.getElementById('theinfo');
    if (theinfoEl) theinfoEl.innerHTML = sliderVal + ' meters';
};

updateSourceDimension(wmtsSource, 10);

const sliderEl = document.getElementById('slider');
sliderEl &&
    sliderEl.addEventListener('input', function () {
        updateSourceDimension(wmtsSource, (this as HTMLInputElement).value);
    });
