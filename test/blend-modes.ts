import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import RenderEvent from 'ol/render/Event';
import VectorSource from 'ol/source/Vector';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import View from 'ol/View';


// Create separate layers for red, green an blue circles.
//
// Every layer has one feature that is styled with a circle, together the
// features form the corners of an equilateral triangle and their styles overlap
const redLayer = new VectorLayer({
  source: new VectorSource({
    features: [new Feature(new Point([0, 0]))]
  }),
  style: new Style({
    image: new CircleStyle({
      fill: new Fill({
        color: 'rgba(255,0,0,0.8)'
      }),
      stroke: new Stroke({
        color: 'rgb(255,0,0)',
        width: 15
      }),
      radius: 120
    })
  })
});
const greenLayer = new VectorLayer({
  source: new VectorSource({
    // 433.013 is roughly 250 * Math.sqrt(3)
    features: [new Feature(new Point([250, 433.013]))]
  }),
  style: new Style({
    image: new CircleStyle({
      fill: new Fill({
        color: 'rgba(0,255,0,0.8)'
      }),
      stroke: new Stroke({
        color: 'rgb(0,255,0)',
        width: 15
      }),
      radius: 120
    })
  })
});
const blueLayer = new VectorLayer({
  source: new VectorSource({
    features: [new Feature(new Point([500, 0]))]
  }),
  style: new Style({
    image: new CircleStyle({
      fill: new Fill({
        color: 'rgba(0,0,255,0.8)'
      }),
      stroke: new Stroke({
        color: 'rgb(0,0,255)',
        width: 15
      }),
      radius: 120
    })
  })
});

// Create the map, the view is centered on the triangle. Zooming and panning is
// restricted to a sane area
const map = new Map({
  layers: [
    redLayer,
    greenLayer,
    blueLayer
  ],
  target: 'map',
  view: new View({
    center: [250, 220],
    extent: [0, 0, 500, 500],
    resolution: 4,
    minResolution: 2,
    maxResolution: 32
  })
});

// Get the form elements and bind the listeners
const select = document.getElementById('blend-mode') as HTMLSelectElement;
const affectRed = document.getElementById('affect-red');
const affectGreen = document.getElementById('affect-green');
const affectBlue = document.getElementById('affect-blue');


/**
 * This method sets the globalCompositeOperation to the value of the select
 * field and it is bound to the precompose event of the layers.
 */
const setBlendModeFromSelect = function(evt: RenderEvent) {
  evt.context.globalCompositeOperation = select.value;
};


/**
 * This method resets the globalCompositeOperation to the default value of
 * 'source-over' and it is bound to the postcompose event of the layers.
 */
const resetBlendModeFromSelect = function(evt: RenderEvent) {
  evt.context.globalCompositeOperation = 'source-over';
};


/**
 * Bind the pre- and postcompose handlers to the passed layer.
 */
const bindLayerListeners = function(layer: VectorLayer) {
  layer.on('precompose', setBlendModeFromSelect);
  layer.on('postcompose', resetBlendModeFromSelect);
};


/**
 * Unind the pre- and postcompose handlers to the passed layers.
 */
const unbindLayerListeners = function(layer: VectorLayer) {
  layer.un('precompose', setBlendModeFromSelect);
  layer.un('postcompose', resetBlendModeFromSelect);
};


/**
 * Handler for the click event of the 'affect-XXX' checkboxes.
 */
const affectLayerClicked = function() {
  let layer;
  if (this.id == 'affect-red') {
    layer = redLayer;
  } else if (this.id == 'affect-green') {
    layer = greenLayer;
  } else {
    layer = blueLayer;
  }
  if (this.checked) {
    bindLayerListeners(layer);
  } else {
    unbindLayerListeners(layer);
  }
  map.render();
};


// Rerender map when blend mode changes
select.addEventListener('change', function() {
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
