import { Control, defaults as defaultControls } from 'ol/control';
import { Options } from 'ol/control/Control';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';


//
// Define rotate to north control.
//


class RotateNorthControl extends Control {

  constructor(opt_options?: Options) {
    const options = opt_options || {};

    const button = document.createElement('button');
    button.innerHTML = 'N';

    const element = document.createElement('div');
    element.className = 'rotate-north ol-unselectable ol-control';
    element.appendChild(button);

    super({
      element: element,
      target: options.target
    });

    button.addEventListener('click', this.handleRotateNorth.bind(this), false);
  }

  handleRotateNorth() {
    this.getMap().getView().setRotation(0);
  }

}


//
// Create map, giving it a rotate to north control.
//


const map = new Map({
  controls: defaultControls().extend([
    new RotateNorthControl()
  ]),
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 3,
    rotation: 1
  })
});
