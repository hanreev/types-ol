import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import LineString from 'ol/geom/LineString';
import SimpleGeometry from 'ol/geom/SimpleGeometry';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { getVectorContext } from 'ol/render';
import RenderEvent from 'ol/render/Event';
import Stamen from 'ol/source/Stamen';
import VectorSource from 'ol/source/Vector';
import { Stroke, Style } from 'ol/style';

declare let arc: any;

const map = new Map({
    layers: [
        new TileLayer({
            source: new Stamen({
                layer: 'toner',
            }),
        }),
    ],
    target: 'map',
    view: new View({
        center: [0, 0],
        zoom: 2,
    }),
});

const style = new Style({
    stroke: new Stroke({
        color: '#EAE911',
        width: 2,
    }),
});

const flightsSource = new VectorSource({
    wrapX: false,
    attributions: 'Flight data by ' + '<a href="http://openflights.org/data.html">OpenFlights</a>,',
    loader: () => {
        const url = 'data/openflights/flights.json';
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then((json: any) => {
                const flightsData = json.flights;
                for (let i = 0; i < flightsData.length; i++) {
                    const flight = flightsData[i];
                    const from = flight[0];
                    const to = flight[1];

                    // create an arc circle between the two locations
                    const arcGenerator = new arc.GreatCircle({ x: from[1], y: from[0] }, { x: to[1], y: to[0] });

                    const arcLine = arcGenerator.Arc(100, { offset: 10 });
                    if (arcLine.geometries.lengt === 1) {
                        const line = new LineString(arcLine.geometries[0].coords);
                        line.transform('EPSG:4326', 'EPSG:3857');

                        const feature = new Feature({
                            geometry: line,
                            finished: false,
                        });
                        // add the feature with a delay so that the animation
                        // for all features does not start at the same time
                        addLater(feature, i * 50);
                    }
                }
                map.on('postcompose', animateFlights);
            });
    },
});

const flightsLayer = new VectorLayer({
    source: flightsSource,
    style: feature => {
        // if the animation is still active for a feature, do not
        // render the feature with the layer style
        if (feature.get('finished')) return style;
        else return null as any;
    },
});

map.addLayer(flightsLayer);

const pointsPerMs = 0.1;
function animateFlights(event: RenderEvent) {
    const vectorContext = getVectorContext(event);
    const frameState = event.frameState;
    vectorContext.setStyle(style);

    const features = flightsSource.getFeatures();
    for (const feature of features)
        if (!feature.get('finished')) {
            // only draw the lines for which the animation has not finished yet
            const coords = (feature.getGeometry() as SimpleGeometry).getCoordinates()!;
            const elapsedTime = frameState.time - feature.get('start');
            const elapsedPoints = elapsedTime * pointsPerMs;

            if (elapsedPoints >= coords.length) feature.set('finished', true);

            const maxIndex = Math.min(elapsedPoints, coords.length);
            const currentLine = new LineString(coords.slice(0, maxIndex));

            // directly draw the line with the vector context
            vectorContext.drawGeometry(currentLine);
        }

    // tell OpenLayers to continue the animation
    map.render();
}

function addLater(feature: Feature, timeout: number) {
    window.setTimeout(() => {
        feature.set('start', new Date().getTime());
        flightsSource.addFeature(feature);
    }, timeout);
}
