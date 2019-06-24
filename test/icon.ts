import Feature, { FeatureLike } from 'ol/Feature';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import OverlayPositioning from 'ol/OverlayPositioning';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import SimpleGeometry from 'ol/geom/SimpleGeometry';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import TileJSON from 'ol/source/TileJSON';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';

declare var $: any;

const iconFeature = new Feature({
  geometry: new Point([0, 0]),
  name: 'Null Island',
  population: 4000,
  rainfall: 500
});

const iconStyle = new Style({
  image: new Icon(({
    anchor: [0.5, 46],
    anchorXUnits: IconAnchorUnits.FRACTION,
    anchorYUnits: IconAnchorUnits.PIXELS,
    src: 'data/icon.png'
  }))
});

iconFeature.setStyle(iconStyle);

const vectorSource = new VectorSource({
  features: [iconFeature]
});

const vectorLayer = new VectorLayer({
  source: vectorSource
});

const rasterLayer = new TileLayer({
  source: new TileJSON({
    url: 'https://api.tiles.mapbox.com/v3/mapbox.geography-class.json?secure',
    crossOrigin: ''
  })
});

const map = new Map({
  layers: [rasterLayer, vectorLayer],
  target: document.getElementById('map') as HTMLElement,
  view: new View({
    center: [0, 0],
    zoom: 3
  })
});

const element = document.getElementById('popup') as HTMLElement;

const popup = new Overlay({
  element,
  positioning: OverlayPositioning.BOTTOM_CENTER,
  stopEvent: false,
  offset: [0, -50]
});
map.addOverlay(popup);

// display popup on click
map.on('click', evt => {
  const feature = map.forEachFeatureAtPixel(evt.pixel,
    (f: FeatureLike) => {
      return f;
    });
  if (feature) {
    const coordinates = (feature.getGeometry() as SimpleGeometry).getCoordinates();
    popup.setPosition(coordinates);
    $(element).popover({
      placement: 'top',
      html: true,
      content: feature.get('name')
    });
    $(element).popover('show');
  } else {
    $(element).popover('destroy');
  }
});

// change mouse cursor when over marker
map.on('pointermove', e => {
  if (e.dragging) {
    $(element).popover('destroy');
    return;
  }
  const pixel = map.getEventPixel(e.originalEvent);
  const hit = map.hasFeatureAtPixel(pixel);
  (map.getTarget() as HTMLElement).style.cursor = hit ? 'pointer' : '';
});
