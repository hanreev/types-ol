import { Feature } from 'ol';
import { GeoJSON, GPX, IGC, KML, TopoJSON } from 'ol/format';
import { defaults as defaultInteractions, DragAndDrop } from 'ol/interaction';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Map from 'ol/Map';
import { Pixel } from 'ol/pixel';
import { BingMaps, Vector as VectorSource } from 'ol/source';
import View from 'ol/View';

const dragAndDropInteraction = new DragAndDrop({
  formatConstructors: [
    new GPX,
    new GeoJSON,
    new IGC,
    new KML,
    new TopoJSON
  ]
});

const map = new Map({
  interactions: defaultInteractions().extend([dragAndDropInteraction]),
  layers: [
    new TileLayer({
      source: new BingMaps({
        imagerySet: 'Aerial',
        key: 'As1HiMj1PvLPlqc_gtM7AqZfBL8ZL3VrjaS3zIb22Uvb9WKhuJObROC-qUpa81U5'
      })
    })
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

dragAndDropInteraction.on('addfeatures', function(event) {
  const vectorSource = new VectorSource({
    features: event.features as Feature[]
  });
  map.addLayer(new VectorLayer({
    source: vectorSource
  }));
  map.getView().fit(vectorSource.getExtent());
});

const displayFeatureInfo = function(pixel: Pixel) {
  const features: Feature[] = [];
  map.forEachFeatureAtPixel(pixel, function(feature) {
    features.push(feature as Feature);
  });
  if (features.length > 0) {
    const info = [];
    let i, ii;
    for (i = 0, ii = features.length; i < ii; ++i) {
      info.push(features[i].get('name'));
    }
    document.getElementById('info').innerHTML = info.join(', ') || '&nbsp';
  } else {
    document.getElementById('info').innerHTML = '&nbsp;';
  }
};

map.on('pointermove', function(evt) {
  if (evt.dragging) {
    return;
  }
  const pixel = map.getEventPixel(evt.originalEvent);
  displayFeatureInfo(pixel);
});

map.on('click', function(evt) {
  displayFeatureInfo(evt.pixel);
});
