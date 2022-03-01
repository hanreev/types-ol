import Map from 'ol/Map';
import View from 'ol/View';
import { getWidth } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat, get as getProjection } from 'ol/proj';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';

const map = new Map({
    target: 'map',
    view: new View({
        zoom: 5,
        center: fromLonLat([5, 45]),
    }),
});

const resolutions = [];
const matrixIds = [];
const proj3857 = getProjection('EPSG:3857')!;
const maxResolution = getWidth(proj3857.getExtent()) / 256;

for (let i = 0; i < 18; i++) {
    matrixIds[i] = i.toString();
    resolutions[i] = maxResolution / Math.pow(2, i);
}

const tileGrid = new WMTSTileGrid({
    origin: [-20037508, 20037508],
    resolutions,
    matrixIds,
});

// For more information about the IGN API key see
// https://geoservices.ign.fr/blog/2017/06/28/geoportail_sans_compte.html

const ign_source = new WMTS({
    url: 'https://wxs.ign.fr/pratique/geoportail/wmts',
    layer: 'GEOGRAPHICALGRIDSYSTEMS.MAPS',
    matrixSet: 'PM',
    format: 'image/jpeg',
    projection: 'EPSG:3857',
    tileGrid,
    style: 'normal',
    attributions:
        '<a href="http://www.geoportail.fr/" target="_blank">' +
        '<img src="https://api.ign.fr/geoportail/api/js/latest/' +
        'theme/geoportal/img/logo_gp.gif"></a>',
});

const ign = new TileLayer({
    source: ign_source,
});

map.addLayer(ign);
