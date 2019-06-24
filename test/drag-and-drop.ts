import { Feature } from 'ol';
import Map from 'ol/Map';
import View from 'ol/View';
import { GPX, GeoJSON, IGC, KML, TopoJSON } from 'ol/format';
import { DragAndDrop, defaults as defaultInteractions } from 'ol/interaction';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Pixel } from 'ol/pixel';
import { BingMaps, Vector as VectorSource } from 'ol/source';

const dragAndDropInteraction = new DragAndDrop({
  formatConstructors: [
    new GPX(),
    new GeoJSON(),
    new IGC(),
    new KML(),
    new TopoJSON()
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

dragAndDropInteraction.on('addfeatures', (event) => {
  const vectorSource = new VectorSource({
    features: event.features as Feature[]
  });
  map.addLayer(new VectorLayer({
    source: vectorSource
  }));
  map.getView().fit(vectorSource.getExtent());
});

const displayFeatureInfo = (pixel: Pixel) => {
  const features: Feature[] = [];
  map.forEachFeatureAtPixel(pixel, (feature) => {
    features.push(feature as Feature);
  });
  if (features.length > 0) {
    const info = [];
    for (const f of features) {
      info.push(f.get('name'));
    }
    (document.getElementById('info') as HTMLElement).innerHTML = info.join(', ') || '&nbsp';
  } else {
    (document.getElementById('info') as HTMLElement).innerHTML = '&nbsp;';
  }
};

map.on('pointermove', (evt) => {
  if (evt.dragging) {
    return;
  }
  const pixel = map.getEventPixel(evt.originalEvent);
  displayFeatureInfo(pixel);
});

map.on('click', (evt) => {
  displayFeatureInfo(evt.pixel);
});
