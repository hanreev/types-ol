import { MapEvent } from 'ol';
import { getBottomLeft, getTopRight } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import { toLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import View from 'ol/View';


const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

function display(id: string, value: number) {
  (document.getElementById(id) as HTMLInputElement).value = value.toFixed(2);
}

function wrapLon(value: number) {
  const worlds = Math.floor((value + 180) / 360);
  return value - (worlds * 360);
}

function onMoveEnd(evt: MapEvent) {
  // tslint:disable-next-line: no-shadowed-variable
  const map = evt.map;
  const extent = map.getView().calculateExtent(map.getSize());
  const bottomLeft = toLonLat(getBottomLeft(extent));
  const topRight = toLonLat(getTopRight(extent));
  display('left', wrapLon(bottomLeft[0]));
  display('bottom', bottomLeft[1]);
  display('right', wrapLon(topRight[0]));
  display('top', topRight[1]);
}

map.on('moveend', onMoveEnd);
