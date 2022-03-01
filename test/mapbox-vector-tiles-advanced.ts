import Map from 'ol/Map';
import View from 'ol/View';
import MVT from 'ol/format/MVT';
import VectorTileLayer from 'ol/layer/VectorTile';
import { get as getProjection } from 'ol/proj';
import VectorTileSource from 'ol/source/VectorTile';
import { Fill, Icon, Stroke, Style, Text } from 'ol/style';
import TileGrid from 'ol/tilegrid/TileGrid';

declare let createMapboxStreetsV6Style: (...args: any[]) => Style;

const key = 'pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiRk1kMWZaSSJ9.E5BkluenyWQMsBLsuByrmg';

// Calculation of resolutions that match zoom levels 1, 3, 5, 7, 9, 11, 13, 15.
const resolutions = [];
for (let i = 0; i <= 8; ++i) resolutions.push(156543.03392804097 / Math.pow(2, i * 2));

// Calculation of tile urls for zoom levels 1, 3, 5, 7, 9, 11, 13, 15.
function tileUrlFunction(tileCoord: number[]) {
    return `https://{a-d}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/{z}/{x}/{y}.vector.pbf?access_token=${key}`
        .replace('{z}', String(tileCoord[0] * 2 - 1))
        .replace('{x}', String(tileCoord[1]))
        .replace('{y}', String(-tileCoord[2] - 1))
        .replace(
            '{a-d}',
            'abcd'.substr(
                // tslint:disable-next-line: no-bitwise
                ((tileCoord[1] << tileCoord[0]) + tileCoord[2]) % 4,
                1,
            ),
        );
}

const map = new Map({
    layers: [
        new VectorTileLayer({
            source: new VectorTileSource({
                attributions:
                    '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
                    '© <a href="https://www.openstreetmap.org/copyright">' +
                    'OpenStreetMap contributors</a>',
                format: new MVT(),
                tileGrid: new TileGrid({
                    extent: getProjection('EPSG:3857')!.getExtent(),
                    resolutions,
                    tileSize: 512,
                }),
                tileUrlFunction,
            }),
            style: createMapboxStreetsV6Style(Style, Fill, Stroke, Icon, Text),
        }),
    ],
    target: 'map',
    view: new View({
        center: [0, 0],
        minZoom: 1,
        zoom: 2,
    }),
});
