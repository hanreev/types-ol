import Map from 'ol/Map';
import View from 'ol/View';
import EsriJSON from 'ol/format/EsriJSON';
import GeometryType from 'ol/geom/GeometryType';
import { Draw, Modify, Select, defaults as defaultInteractions } from 'ol/interaction';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { tile as tileStrategy } from 'ol/loadingstrategy';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import { createXYZ } from 'ol/tilegrid';

declare let $: any;

const serviceUrl =
    'https://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/' + 'services/PDX_Pedestrian_Districts/FeatureServer/';
const layer = '0';

const esrijsonFormat = new EsriJSON();

const vectorSource = new VectorSource({
    loader: (extent, resolution, projection) => {
        const geom = encodeURIComponent(
            `{"xmin":${extent[0]},"ymin":${extent[1]},"xmax":${extent[2]},"ymax":${extent[3]},"spatialReference":{"wkid":102100}}`,
        );
        const url = `${serviceUrl}${layer}/query/?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=${geom}&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&outSR=102100`;
        $.ajax({
            url,
            dataType: 'jsonp',
            success: (response: any) => {
                if (response.error) {
                    alert(`${response.error.message}\n${response.error.details.join('\n')}`);
                } else {
                    // dataProjection will be read from document
                    const features = esrijsonFormat.readFeatures(response, {
                        featureProjection: projection,
                    });
                    if (features.length > 0) vectorSource.addFeatures(features);
                }
            },
        });
    },
    strategy: tileStrategy(
        createXYZ({
            tileSize: 512,
        }),
    ),
});

const vector = new VectorLayer({
    source: vectorSource,
});

const raster = new TileLayer({
    source: new XYZ({
        attributions:
            'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' + 'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    }),
});

const draw = new Draw({
    source: vectorSource,
    type: GeometryType.POLYGON,
});

const select = new Select();
select.setActive(false);
const selected = select.getFeatures();

const modify = new Modify({
    features: selected,
});
modify.setActive(false);

const map = new Map({
    interactions: defaultInteractions().extend([draw, select, modify]),
    layers: [raster, vector],
    target: document.getElementById('map') as HTMLElement,
    view: new View({
        center: fromLonLat([-122.619, 45.512]),
        zoom: 12,
    }),
});

const typeSelect = document.getElementById('type') as HTMLSelectElement;

typeSelect.onchange = () => {
    draw.setActive(typeSelect.value === 'DRAW');
    select.setActive(typeSelect.value === 'MODIFY');
    modify.setActive(typeSelect.value === 'MODIFY');
};

const dirty: any = {};

selected.on('add', evt => {
    const feature = evt.element;
    feature.on('change', e => {
        dirty[e.target.getId()] = true;
    });
});

selected.on('remove', evt => {
    const feature = evt.element;
    const fid = feature.getId()!;
    if (dirty[fid] === true) {
        const jsonFeature = esrijsonFormat.writeFeature(feature, {
            featureProjection: map.getView().getProjection(),
        });
        const payload = `[${jsonFeature}]`;
        const url = `${serviceUrl}${layer}/updateFeatures`;
        $.post(url, { f: 'json', features: payload }).done((data: any) => {
            const result = JSON.parse(data);
            if (result.updateResults && result.updateResults.length > 0)
                if (result.updateResults[0].success !== true) {
                    const error = result.updateResults[0].error;
                    alert(`${error.description} (${error.code})`);
                } else {
                    // tslint:disable-next-line: no-dynamic-delete
                    delete dirty[fid];
                }
        });
    }
});

draw.on('drawend', evt => {
    const feature = evt.feature;
    const jsonFeature = esrijsonFormat.writeFeature(feature, {
        featureProjection: map.getView().getProjection(),
    });
    const payload = `[${jsonFeature}]`;
    const url = `${serviceUrl}${layer}/addFeatures`;
    $.post(url, { f: 'json', features: payload }).done((data: any) => {
        const result = JSON.parse(data);
        if (result.addResults && result.addResults.length > 0)
            if (result.addResults[0].succes === true) {
                feature.setId(result.addResults[0]['objectId']);
                vectorSource.clear();
            } else {
                const error = result.addResults[0].error;
                alert(`${error.description} (${error.code})`);
            }
    });
});
