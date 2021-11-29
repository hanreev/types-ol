import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';

declare let saveAs: any;

const map = new Map({
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
        new VectorLayer({
            source: new VectorSource({
                url: 'data/geojson/countries.geojson',
                format: new GeoJSON(),
            }),
        }),
    ],
    target: 'map',
    view: new View({
        center: [0, 0],
        zoom: 2,
    }),
});

(document.getElementById('export-png') as HTMLElement).addEventListener('click', () => {
    map.once('rendercomplete', (event: any) => {
        const canvas = event.context.canvas;
        if ((navigator as any).msSaveBlob) (navigator as any).msSaveBlob(canvas.msToBlob(), 'map.png');
        else
            canvas.toBlob((blob: any) => {
                saveAs(blob, 'map.png');
            });
    });
    map.renderSync();
});
