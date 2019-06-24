import Map from 'ol/Map';
import View from 'ol/View';
import { altKeyOnly, click, pointerMove } from 'ol/events/condition';
import GeoJSON from 'ol/format/GeoJSON';
import Select from 'ol/interaction/Select';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';

const raster = new TileLayer({
  source: new OSM()
});

const vector = new VectorLayer({
  source: new VectorSource({
    url: 'data/geojson/countries.geojson',
    format: new GeoJSON()
  })
});

const map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

let select: Select | null = null; // ref to currently selected interaction

// select interaction working on "singleclick"
const selectSingleClick = new Select();

// select interaction working on "click"
const selectClick = new Select({
  condition: click
});

// select interaction working on "pointermove"
const selectPointerMove = new Select({
  condition: pointerMove
});

const selectAltClick = new Select({
  condition: (mapBrowserEvent) => {
    return click(mapBrowserEvent) && altKeyOnly(mapBrowserEvent);
  }
});

const selectElement = document.getElementById('type') as HTMLSelectElement;

const changeInteraction = () => {
  if (select !== null) {
    map.removeInteraction(select);
  }
  const value = selectElement.value;
  switch (value) {
    case 'singleclick':
      select = selectSingleClick;
      break;

    case 'click':
      select = selectClick;
      break;

    case 'pointermove':
      select = selectPointerMove;
      break;

    case 'altclick':
      select = selectAltClick;
      break;

    default:
      select = null;
      break;
  }

  if (select !== null) {
    map.addInteraction(select);
    select.on('select', (e) => {
      (document.getElementById('status') as HTMLElement).innerHTML = '&nbsp;' +
        e.target.getFeatures().getLength() +
        ' selected features (last operation selected ' + e.selected.length +
        ' and deselected ' + e.deselected.length + ' features)';
    });
  }
};

selectElement.onchange = changeInteraction;
changeInteraction();
