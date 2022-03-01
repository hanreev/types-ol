import Map from 'ol/Map';
import View from 'ol/View';
import { Extent } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import Zoomify from 'ol/source/Zoomify';

const imgWidth = 9911;
const imgHeight = 6100;

const zoomifyUrl = 'http://vips.vtech.fr/cgi-bin/iipsrv.fcgi?zoomify=/mnt/MD1/AD00/plan_CHU-4HD-01/FOND.TIF/';
const iipUrl =
    'http://vips.vtech.fr/cgi-bin/iipsrv.fcgi?FIF=/mnt/MD1/AD00/plan_CHU-4HD-01/FOND.TIF' + '&JTL={z},{tileIndex}';

const layer = new TileLayer({
    source: new Zoomify({
        url: zoomifyUrl,
        size: [imgWidth, imgHeight],
        crossOrigin: 'anonymous',
    }),
});

const extent: Extent = [0, -imgHeight, imgWidth, 0];

const map = new Map({
    layers: [layer],
    target: 'map',
    view: new View({
        // adjust zoom levels to those provided by the source
        resolutions: layer.getSource()?.getTileGrid()?.getResolutions(),
        // constrain the center: center cannot be set outside this extent
        extent,
    }),
});
map.getView().fit(extent);

const control = document.getElementById('zoomifyProtocol') as HTMLElement;
control.addEventListener('change', event => {
    const value = (event.currentTarget as HTMLInputElement).value;
    if (value === 'iip')
        layer.setSource(
            new Zoomify({
                url: iipUrl,
                size: [imgWidth, imgHeight],
                crossOrigin: 'anonymous',
            }),
        );
    else if (value === 'zoomify')
        layer.setSource(
            new Zoomify({
                url: zoomifyUrl,
                size: [imgWidth, imgHeight],
                crossOrigin: 'anonymous',
            }),
        );
});
