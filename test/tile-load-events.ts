import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import TileJSON from 'ol/source/TileJSON';

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
        const width = ((this.loaded / this.loading) * 100).toFixed(1) + '%';
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

const progress = new Progress(document.getElementById('progress') as HTMLElement);

const source = new TileJSON({
    url: 'https://api.tiles.mapbox.com/v3/mapbox.world-bright.json?secure',
    crossOrigin: 'anonymous',
});

source.on('tileloadstart', () => {
    progress.addLoading();
});

source.on('tileloadend', () => {
    progress.addLoaded();
});
source.on('tileloaderror', () => {
    progress.addLoaded();
});

const map = new Map({
    layers: [new TileLayer({ source })],
    target: 'map',
    view: new View({
        center: [0, 0],
        zoom: 2,
    }),
});
