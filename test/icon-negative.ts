import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import Select from 'ol/interaction/Select';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Stamen from 'ol/source/Stamen';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';

function createStyle(src: string, img: HTMLImageElement | HTMLCanvasElement) {
  return new Style({
    image: new Icon(({
      anchor: [0.5, 0.96],
      crossOrigin: 'anonymous',
      src,
      img,
      imgSize: img ? [img.width, img.height] : undefined
    }))
  });
}

const iconFeature = new Feature(new Point([0, 0]));
iconFeature.set('style', createStyle('data/icon.png', undefined as any));

const map = new Map({
  layers: [
    new TileLayer({
      source: new Stamen({ layer: 'watercolor' })
    }),
    new VectorLayer({
      style: feature => {
        return feature.get('style');
      },
      source: new VectorSource({ features: [iconFeature] })
    })
  ],
  target: document.getElementById('map') as HTMLElement,
  view: new View({
    center: [0, 0],
    zoom: 3
  })
});

const selectStyle: { [key: string]: Style } = {};
const select = new Select({
  style: (feature: any) => {
    const image = feature.get('style').getImage().getImage();
    if (!selectStyle[image.src]) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, image.width, image.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0, ii = data.length; i < ii; i = i + (i % 4 === 2 ? 2 : 1)) {
        data[i] = 255 - data[i];
      }
      context.putImageData(imageData, 0, 0);
      selectStyle[image.src] = createStyle(undefined as any, canvas);
    }
    return selectStyle[image.src];
  }
});
map.addInteraction(select);

map.on('pointermove', evt => {
  map.getTargetElement().style.cursor =
    map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
});
