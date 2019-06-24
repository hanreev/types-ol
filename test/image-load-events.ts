import Map from 'ol/Map';
import View from 'ol/View';
import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';

class Progress {

  el: HTMLElement;
  loading = 0;
  loaded = 0;

  constructor(el: HTMLElement) {
    this.el = el;
  }

  addLoading() {
    if (this.loading === 0) {
      this.show();
    }
    ++this.loading;
    this.update();
  }

  addLoaded() {
    setTimeout(() => {
      ++this.loaded;
      this.update();
    }, 100);
  }

  update() {
    const width = (this.loaded / this.loading * 100).toFixed(1) + '%';
    this.el.style.width = width;
    if (this.loading === this.loaded) {
      this.loading = 0;
      this.loaded = 0;
      setTimeout(() => {
        this.hide();
      }, 500);
    }
  }

  show() {
    this.el.style.visibility = 'visible';
  }

  hide() {
    if (this.loading === this.loaded) {
      this.el.style.visibility = 'hidden';
      this.el.style.width = '0';
    }
  }

}

const progress = new Progress(document.getElementById('progress'));

const source = new ImageWMS({
  url: 'https://ahocevar.com/geoserver/wms',
  params: { 'LAYERS': 'topp:states' },
  serverType: 'geoserver'
});

source.on('imageloadstart', () => {
  progress.addLoading();
});

source.on('imageloadend', () => {
  progress.addLoaded();
});
source.on('imageloaderror', () => {
  progress.addLoaded();
});

const map = new Map({
  layers: [
    new ImageLayer({ source: source })
  ],
  target: 'map',
  view: new View({
    center: [-10997148, 4569099],
    zoom: 4
  })
});
