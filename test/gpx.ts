import { Feature } from 'ol';
import { FeatureLike } from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import GPX from 'ol/format/GPX';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import BingMaps from 'ol/source/BingMaps';
import VectorSource from 'ol/source/Vector';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

const raster = new TileLayer({
  source: new BingMaps({
    imagerySet: 'Aerial',
    key: 'As1HiMj1PvLPlqc_gtM7AqZfBL8ZL3VrjaS3zIb22Uvb9WKhuJObROC-qUpa81U5'
  })
});

const style: { [key: string]: Style } = {
  Point: new Style({
    image: new CircleStyle({
      fill: new Fill({
        color: 'rgba(255,255,0,0.4)'
      }),
      radius: 5,
      stroke: new Stroke({
        color: '#ff0',
        width: 1
      })
    })
  }),
  LineString: new Style({
    stroke: new Stroke({
      color: '#f00',
      width: 3
    })
  }),
  MultiLineString: new Style({
    stroke: new Stroke({
      color: '#0f0',
      width: 3
    })
  })
};

const vector = new VectorLayer({
  source: new VectorSource({
    url: 'data/gpx/fells_loop.gpx',
    format: new GPX()
  }),
  style: feature => {
    return style[feature.getGeometry().getType()];
  }
});

const map = new Map({
  layers: [raster, vector],
  target: document.getElementById('map') as HTMLElement,
  view: new View({
    center: [-7916041.528716288, 5228379.045749711],
    zoom: 12
  })
});

const displayFeatureInfo = (pixel: number[]) => {
  const features: Feature[] = [];
  map.forEachFeatureAtPixel(pixel, (feature: FeatureLike) => {
    features.push(feature as Feature);
  });
  if (features.length > 0) {
    const info = [];
    for (const f of features) {
      info.push(f.get('desc'));
    }
    (document.getElementById('info') as HTMLElement).innerHTML = info.join(', ') || '(unknown)';
    (map.getTarget() as HTMLElement).style.cursor = 'pointer';
  } else {
    (document.getElementById('info') as HTMLElement).innerHTML = '&nbsp;';
    (map.getTarget() as HTMLElement).style.cursor = '';
  }
};

map.on('pointermove', evt => {
  if (evt.dragging) {
    return;
  }
  const pixel = map.getEventPixel(evt.originalEvent);
  displayFeatureInfo(pixel);
});

map.on('click', evt => {
  displayFeatureInfo(evt.pixel);
});
