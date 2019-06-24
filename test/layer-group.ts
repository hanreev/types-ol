import Map from 'ol/Map';
import View from 'ol/View';
import { Group as LayerGroup, Tile as TileLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import TileJSON from 'ol/source/TileJSON';

declare var $: any;

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    }), new LayerGroup({
      layers: [
        new TileLayer({
          source: new TileJSON({
            url: 'https://api.tiles.mapbox.com/v3/mapbox.20110804-hoa-foodinsecurity-3month.json?secure',
            crossOrigin: 'anonymous'
          })
        }),
        new TileLayer({
          source: new TileJSON({
            url: 'https://api.tiles.mapbox.com/v3/mapbox.world-borders-light.json?secure',
            crossOrigin: 'anonymous'
          })
        })
      ]
    })
  ],
  target: 'map',
  view: new View({
    center: fromLonLat([37.40570, 8.81566]),
    zoom: 4
  })
});

function bindInputs(layerid: any, layer: any) {
  const visibilityInput = $(layerid + ' input.visible');
  visibilityInput.on('change', () => {
    layer.setVisible(visibilityInput.checked);
  });
  visibilityInput.prop('checked', layer.getVisible());

  const opacityInput = $(layerid + ' input.opacity');
  opacityInput.on('input change', () => {
    layer.setOpacity(parseFloat(opacityInput.value));
  });
  opacityInput.val(String(layer.getOpacity()));
}
map.getLayers().forEach((layer: any, i: any) => {
  bindInputs('#layer' + i, layer);
  if (layer instanceof LayerGroup) {
    layer.getLayers().forEach((sublayer: any, j: any) => {
      bindInputs('#layer' + i + j, sublayer);
    });
  }
});
