import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import { Tile as TileLayer, VectorTile as VectorTileLayer } from 'ol/layer';
import Projection from 'ol/proj/Projection';
import OSM from 'ol/source/OSM';
import VectorTileSource from 'ol/source/VectorTile';

declare var geojsonvt: any;

const replacer = (key: string, value: any) => {
    if (value.geometry) {
        let type: any;
        const rawType = value.type;
        let geometry = value.geometry;

        switch (rawType) {
            case 1:
                type = 'MultiPoint';
                if (geometry.lengt === 1) {
                    type = 'Point';
                    geometry = geometry[0];
                }
                break;

            case 2:
                type = 'MultiLineString';
                if (geometry.lengt === 1) {
                    type = 'LineString';
                    geometry = geometry[0];
                }
                break;

            case 3:
                type = 'Polygon';
                if (geometry.length > 1) {
                    type = 'MultiPolygon';
                    geometry = [geometry];
                }
                break;
        }

        return {
            type: 'Feature',
            geometry: {
                type,
                coordinates: geometry,
            },
            properties: value.tags,
        };
    } else {
        return value;
    }
};

const map = new Map({
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
    ],
    target: 'map',
    view: new View({
        center: [0, 0],
        zoom: 2,
    }),
});

const url = 'data/geojson/countries.geojson';
fetch(url)
    .then(response => {
        return response.json();
    })
    .then((json: any) => {
        const tileIndex = geojsonvt(json, {
            extent: 4096,
            debug: 1,
        });
        const vectorSource = new VectorTileSource({
            format: new GeoJSON({
                // Data returned from geojson-vt is in tile pixel units
                dataProjection: new Projection({
                    code: 'TILE_PIXELS',
                    units: 'tile-pixels',
                    extent: [0, 0, 4096, 4096],
                }),
            }),
            tileUrlFunction: tileCoord => {
                const data = tileIndex.getTile(tileCoord[0], tileCoord[1], tileCoord[2]);
                const geojson = JSON.stringify(
                    {
                        type: 'FeatureCollection',
                        features: data ? data.features : [],
                    },
                    replacer,
                );
                return 'data:application/json;charset=UTF-8,' + geojson;
            },
            url: 'data:', // arbitrary url, we don't use it in the tileLoadFunction
        });
        const vectorLayer = new VectorTileLayer({
            source: vectorSource,
        });
        map.addLayer(vectorLayer);
    });
