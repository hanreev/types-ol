import { Feature, MapBrowserEvent } from 'ol';
import { EventsKey } from 'ol/events';
import { LineString, Polygon } from 'ol/geom';
import GeometryType from 'ol/geom/GeometryType';
import Draw from 'ol/interaction/Draw';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Map from 'ol/Map';
import { unByKey } from 'ol/Observable';
import Overlay from 'ol/Overlay';
import OverlayPositioning from 'ol/OverlayPositioning';
import { OSM, Vector as VectorSource } from 'ol/source';
import { getArea, getLength } from 'ol/sphere';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import View from 'ol/View';


const raster = new TileLayer({
  source: new OSM()
});

const source = new VectorSource();

const vector = new VectorLayer({
  source: source,
  style: new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new Stroke({
      color: '#ffcc33',
      width: 2
    }),
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: '#ffcc33'
      })
    })
  })
});


/**
 * Currently drawn feature.
 */
let sketch: Feature;


/**
 * The help tooltip element.
 */
let helpTooltipElement: HTMLElement;


/**
 * Overlay to show the help messages.
 */
let helpTooltip: Overlay;


/**
 * The measure tooltip element.
 */
let measureTooltipElement: HTMLElement;


/**
 * Overlay to show the measurement.
 */
let measureTooltip: Overlay;


/**
 * Message to show when the user is drawing a polygon.
 */
const continuePolygonMsg = 'Click to continue drawing the polygon';


/**
 * Message to show when the user is drawing a line.
 */
const continueLineMsg = 'Click to continue drawing the line';


/**
 * Handle pointer move.
 */
const pointerMoveHandler = function(evt: MapBrowserEvent) {
  if (evt.dragging) {
    return;
  }
  let helpMsg = 'Click to start drawing';

  if (sketch) {
    const geom = (sketch.getGeometry());
    if (geom instanceof Polygon) {
      helpMsg = continuePolygonMsg;
    } else if (geom instanceof LineString) {
      helpMsg = continueLineMsg;
    }
  }

  helpTooltipElement.innerHTML = helpMsg;
  helpTooltip.setPosition(evt.coordinate);

  helpTooltipElement.classList.remove('hidden');
};


const map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [-11000000, 4600000],
    zoom: 15
  })
});

map.on('pointermove', pointerMoveHandler);

map.getViewport().addEventListener('mouseout', function() {
  helpTooltipElement.classList.add('hidden');
});

const typeSelect = document.getElementById('type') as HTMLSelectElement;

let draw: Draw; // global so we can remove it later


/**
 * Format length output.
 */
const formatLength = function(line: LineString) {
  const length = getLength(line);
  let output;
  if (length > 100) {
    output = (Math.round(length / 1000 * 100) / 100) +
      ' ' + 'km';
  } else {
    output = (Math.round(length * 100) / 100) +
      ' ' + 'm';
  }
  return output;
};


/**
 * Format area output.
 */
const formatArea = function(polygon: Polygon) {
  const area = getArea(polygon);
  let output;
  if (area > 10000) {
    output = (Math.round(area / 1000000 * 100) / 100) +
      ' ' + 'km<sup>2</sup>';
  } else {
    output = (Math.round(area * 100) / 100) +
      ' ' + 'm<sup>2</sup>';
  }
  return output;
};

function addInteraction() {
  const type = (typeSelect.value == 'area' ? 'Polygon' : 'LineString');
  draw = new Draw({
    source: source,
    type: type as GeometryType,
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2
      }),
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.7)'
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        })
      })
    })
  });
  map.addInteraction(draw);

  createMeasureTooltip();
  createHelpTooltip();

  let listener: EventsKey;
  draw.on('drawstart',
    function(evt) {
      // set sketch
      sketch = evt.feature;

      let tooltipCoord = (evt as any).coordinate;

      listener = sketch.getGeometry().on('change', function(ev) {
        const geom = ev.target;
        let output;
        if (geom instanceof Polygon) {
          output = formatArea(geom);
          tooltipCoord = geom.getInteriorPoint().getCoordinates();
        } else if (geom instanceof LineString) {
          output = formatLength(geom);
          tooltipCoord = geom.getLastCoordinate();
        }
        measureTooltipElement.innerHTML = output;
        measureTooltip.setPosition(tooltipCoord);
      });
    });

  draw.on('drawend',
    function() {
      measureTooltipElement.className = 'tooltip tooltip-static';
      measureTooltip.setOffset([0, -7]);
      // unset sketch
      sketch = null;
      // unset tooltip so that a new one can be created
      measureTooltipElement = null;
      createMeasureTooltip();
      unByKey(listener);
    });
}


/**
 * Creates a new help tooltip
 */
function createHelpTooltip() {
  if (helpTooltipElement) {
    helpTooltipElement.parentNode.removeChild(helpTooltipElement);
  }
  helpTooltipElement = document.createElement('div');
  helpTooltipElement.className = 'tooltip hidden';
  helpTooltip = new Overlay({
    element: helpTooltipElement,
    offset: [15, 0],
    positioning: OverlayPositioning.CENTER_LEFT
  });
  map.addOverlay(helpTooltip);
}


/**
 * Creates a new measure tooltip
 */
function createMeasureTooltip() {
  if (measureTooltipElement) {
    measureTooltipElement.parentNode.removeChild(measureTooltipElement);
  }
  measureTooltipElement = document.createElement('div');
  measureTooltipElement.className = 'tooltip tooltip-measure';
  measureTooltip = new Overlay({
    element: measureTooltipElement,
    offset: [0, -15],
    positioning: OverlayPositioning.BOTTOM_CENTER
  });
  map.addOverlay(measureTooltip);
}


/**
 * Let user change the geometry type.
 */
typeSelect.onchange = function() {
  map.removeInteraction(draw);
  addInteraction();
};

addInteraction();
