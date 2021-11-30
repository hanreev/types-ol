import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import RenderEvent from 'ol/render/Event';
import VectorSource from 'ol/source/Vector';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

// Create separate layers for red, green an blue circles.
//
// Every layer has one feature that is styled with a circle, together the
// features form the corners of an equilateral triangle and their styles overlap
const redLayer = new VectorLayer({
    source: new VectorSource({
        features: [new Feature(new Point([0, 0]))],
    }),
    style: new Style({
        image: new CircleStyle({
            fill: new Fill({
                color: 'rgba(255,0,0,0.8)',
            }),
            stroke: new Stroke({
                color: 'rgb(255,0,0)',
                width: 15,
            }),
            radius: 120,
        }),
    }),
});
const greenLayer = new VectorLayer({
    source: new VectorSource({
        // 433.013 is roughly 250 * Math.sqrt(3)
        features: [new Feature(new Point([250, 433.013]))],
    }),
    style: new Style({
        image: new CircleStyle({
            fill: new Fill({
                color: 'rgba(0,255,0,0.8)',
            }),
            stroke: new Stroke({
                color: 'rgb(0,255,0)',
                width: 15,
            }),
            radius: 120,
        }),
    }),
});
const blueLayer = new VectorLayer({
    source: new VectorSource({
        features: [new Feature(new Point([500, 0]))],
    }),
    style: new Style({
        image: new CircleStyle({
            fill: new Fill({
                color: 'rgba(0,0,255,0.8)',
            }),
            stroke: new Stroke({
                color: 'rgb(0,0,255)',
                width: 15,
            }),
            radius: 120,
        }),
    }),
});

// Create the map, the view is centered on the triangle. Zooming and panning is
// restricted to a sane area
const map = new Map({
    layers: [redLayer, greenLayer, blueLayer],
    target: 'map',
    view: new View({
        center: [250, 220],
        extent: [0, 0, 500, 500],
        resolution: 4,
        minResolution: 2,
        maxResolution: 32,
    }),
});

// Get the form elements and bind the listeners
const select = document.getElementById('blend-mode') as HTMLSelectElement;
const affectRed = document.getElementById('affect-red') as HTMLInputElement;
const affectGreen = document.getElementById('affect-green') as HTMLInputElement;
const affectBlue = document.getElementById('affect-blue') as HTMLInputElement;

const setBlendModeFromSelect = (evt: RenderEvent) => {
    if (evt.context instanceof CanvasRenderingContext2D) evt.context.globalCompositeOperation = select.value;
};

const resetBlendModeFromSelect = (evt: RenderEvent) => {
    if (evt.context instanceof CanvasRenderingContext2D) evt.context.globalCompositeOperation = 'source-over';
};

const bindLayerListeners = (layer: VectorLayer) => {
    layer.on('prerender', setBlendModeFromSelect);
    layer.on('postrender', resetBlendModeFromSelect);
};

const unbindLayerListeners = (layer: VectorLayer) => {
    layer.un('prerender', setBlendModeFromSelect);
    layer.un('postrender', resetBlendModeFromSelect);
};

const affectLayerClicked = (event: Event) => {
    const that = event.target as HTMLInputElement;
    let layer: VectorLayer;
    if (that.id === 'affect-red') layer = redLayer;
    else if (that.id === 'affect-green') layer = greenLayer;
    else layer = blueLayer;

    if (that.checked) bindLayerListeners(layer);
    else unbindLayerListeners(layer);

    map.render();
};

// Rerender map when blend mode changes
select.addEventListener('change', () => {
    map.render();
});

// Unbind / bind listeners depending on the checked state when the checkboxes
// are clicked
affectRed.addEventListener('click', affectLayerClicked);
affectGreen.addEventListener('click', affectLayerClicked);
affectBlue.addEventListener('click', affectLayerClicked);

// Initially bind listeners
bindLayerListeners(redLayer);
bindLayerListeners(greenLayer);
bindLayerListeners(blueLayer);
