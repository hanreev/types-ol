import Map from 'ol/Map';
import View from 'ol/View';
import { applyTransform } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import { get as getProjection, getTransform } from 'ol/proj';
import { register } from 'ol/proj/proj4';
import OSM from 'ol/source/OSM';
import TileImage from 'ol/source/TileImage';
import * as proj4 from 'proj4';

const map = new Map({
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
    ],
    target: 'map',
    view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 1,
    }),
});

const queryInput = document.getElementById('epsg-query') as HTMLInputElement;
const searchButton = document.getElementById('epsg-search') as HTMLButtonElement;
const resultSpan = document.getElementById('epsg-result') as HTMLSpanElement;
const renderEdgesCheckbox = document.getElementById('render-edges') as HTMLInputElement;

function setProjection(code: string, name: string, proj4def: string | proj4.ProjectionDefinition, bbox: number[]) {
    if (code === null || name === null || proj4def === null || bbox === null) {
        resultSpan.innerHTML = 'Nothing usable found, using EPSG:3857...';
        map.setView(
            new View({
                projection: 'EPSG:3857',
                center: [0, 0],
                zoom: 1,
            }),
        );
        return;
    }

    resultSpan.innerHTML = `(${code}) ${name}`;

    const newProjCode = 'EPSG:' + code;
    proj4.defs(newProjCode, proj4def);
    register(proj4);
    const newProj = getProjection(newProjCode)!;
    const fromLonLat = getTransform('EPSG:4326', newProj);

    // very approximate calculation of projection extent
    const extent = applyTransform([bbox[1], bbox[2], bbox[3], bbox[0]], fromLonLat);
    newProj.setExtent(extent);
    const newView = new View({
        projection: newProj,
    });
    map.setView(newView);
    newView.fit(extent);
}

function search(query: string) {
    resultSpan.innerHTML = 'Searching ...';
    fetch('https://epsg.io/?format=json&q=' + query)
        .then(response => {
            return response.json();
        })
        .then(json => {
            const results = json['results'];
            if (results && results.length > 0)
                for (let i = 0, ii = results.length; i < ii; i++) {
                    const result = results[i];
                    if (result) {
                        const code = result['code'];
                        const name = result['name'];
                        const proj4def = result['proj4'];
                        const bbox = result['bbox'];
                        if (code && code.length > 0 && proj4def && proj4def.length > 0 && bbox && bbox.lengt === 4) {
                            setProjection(code, name, proj4def, bbox);
                            return;
                        }
                    }
                }

            setProjection(null as any, null as any, null as any, null as any);
        });
}

searchButton.onclick = event => {
    search(queryInput.value);
    event.preventDefault();
};

renderEdgesCheckbox.onchange = () => {
    map.getLayers().forEach(layer => {
        if (layer instanceof TileLayer) {
            const source = layer.getSource();
            if (source instanceof TileImage) source.setRenderReprojectionEdges(renderEdgesCheckbox.checked);
        }
    });
};
