import Map from 'ol/Map';
import View from 'ol/View';
import { Type as GeometryType } from 'ol/geom/Geometry';
import Polygon from 'ol/geom/Polygon';
import Draw, { GeometryFunction, createBox, createRegularPolygon } from 'ol/interaction/Draw';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';

const raster = new TileLayer({
    source: new OSM(),
});

const source = new VectorSource({ wrapX: false });

const vector = new VectorLayer({
    source,
});

const map = new Map({
    layers: [raster, vector],
    target: 'map',
    view: new View({
        center: [-11000000, 4600000],
        zoom: 4,
    }),
});

const typeSelect = document.getElementById('type') as HTMLSelectElement;

let draw: Draw; // global so we can remove it later
function addInteraction() {
    let value = typeSelect.value;
    let geometryFunction: GeometryFunction = null as any;
    if (value !== 'None') {
        switch (value) {
            case 'Square':
                value = 'Circle';
                geometryFunction = createRegularPolygon(4);
                break;

            case 'Box':
                value = 'Circle';
                geometryFunction = createBox();
                break;

            case 'Star':
                value = 'Circle';
                geometryFunction = (coordinates, geometry) => {
                    const center = coordinates[0] as number[];
                    const last = coordinates[1] as number[];
                    const dx = center[0] - last[0];
                    const dy = center[1] - last[1];
                    const radius = Math.sqrt(dx * dx + dy * dy);
                    const rotation = Math.atan2(dy, dx);
                    const newCoordinates = [];
                    const numPoints = 12;
                    for (let i = 0; i < numPoints; ++i) {
                        const angle = rotation + (i * 2 * Math.PI) / numPoints;
                        const fraction = i % 2 === 0 ? 1 : 0.5;
                        const offsetX = radius * fraction * Math.cos(angle);
                        const offsetY = radius * fraction * Math.sin(angle);
                        newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
                    }
                    newCoordinates.push(newCoordinates[0].slice());
                    if (!geometry) geometry = new Polygon([newCoordinates]);
                    else geometry.setCoordinates([newCoordinates]);

                    return geometry;
                };
                break;
        }

        draw = new Draw({
            source,
            type: value as GeometryType,
            geometryFunction,
        });
        map.addInteraction(draw);
    }
}

typeSelect.onchange = () => {
    map.removeInteraction(draw);
    addInteraction();
};

addInteraction();
