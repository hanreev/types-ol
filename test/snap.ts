import GeometryType from 'ol/geom/GeometryType';
import { Draw, Modify, Select, Snap } from 'ol/interaction';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Map from 'ol/Map';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import View from 'ol/View';

const raster = new TileLayer({
  source: new OSM()
});

const vector = new VectorLayer({
  source: new VectorSource(),
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

const map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [-11000000, 4600000],
    zoom: 4
  })
});

const ExampleModify = {
  init: function() {
    this.select = new Select();
    map.addInteraction(this.select);

    this.modify = new Modify({
      features: this.select.getFeatures()
    });
    map.addInteraction(this.modify);

    this.setEvents();
  },
  setEvents: function() {
    const selectedFeatures = (this.select as Select).getFeatures();

    (this.select as Select).on('change:active', function() {
      selectedFeatures.forEach(function(each) {
        selectedFeatures.remove(each);
      });
    });
  },
  setActive: function(active: boolean) {
    (this.select as Select).setActive(active);
    (this.modify as Modify).setActive(active);
  }
};
ExampleModify.init();

const optionsForm = document.getElementById('options-form') as HTMLFormElement;

const ExampleDraw = {
  init: function() {
    map.addInteraction(this.Point);
    this.Point.setActive(false);
    map.addInteraction(this.LineString);
    this.LineString.setActive(false);
    map.addInteraction(this.Polygon);
    this.Polygon.setActive(false);
    map.addInteraction(this.Circle);
    this.Circle.setActive(false);
  },
  Point: new Draw({
    source: vector.getSource(),
    type: GeometryType.POINT
  }),
  LineString: new Draw({
    source: vector.getSource(),
    type: GeometryType.LINE_STRING
  }),
  Polygon: new Draw({
    source: vector.getSource(),
    type: GeometryType.POLYGON
  }),
  Circle: new Draw({
    source: vector.getSource(),
    type: GeometryType.CIRCLE
  }),
  getActive: function() {
    return this.activeType ? this[this.activeType].getActive() : false;
  },
  setActive: function(active: boolean) {
    const type = (optionsForm.elements['draw-type' as any] as HTMLInputElement).value;
    if (active) {
      if (this.activeType)
        this[this.activeType].setActive(false);
      this[type].setActive(true);
      this.activeType = type;
    } else {
      if (this.activeType)
        this[this.activeType].setActive(false);
      this.activeType = null;
    }
  }
};
ExampleDraw.init();


/**
 * Let user change the geometry type.
 * @param {Event} e Change event.
 */
optionsForm.onchange = function(e) {
  const type = (e.target as HTMLInputElement).getAttribute('name');
  const value = (e.target as HTMLInputElement).value;
  if (type == 'draw-type') {
    if (ExampleDraw.getActive())
      ExampleDraw.setActive(true);
  } else if (type == 'interaction') {
    if (value == 'modify') {
      ExampleDraw.setActive(false);
      ExampleModify.setActive(true);
    } else if (value == 'draw') {
      ExampleDraw.setActive(true);
      ExampleModify.setActive(false);
    }
  }
};

ExampleDraw.setActive(true);
ExampleModify.setActive(false);

// The snap interaction must be added after the Modify and Draw interactions
// in order for its map browser event handlers to be fired first. Its handlers
// are responsible of doing the snapping.
const snap = new Snap({
  source: vector.getSource()
});
map.addInteraction(snap);
