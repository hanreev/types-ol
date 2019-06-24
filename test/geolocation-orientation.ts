import Geolocation from 'ol/Geolocation';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import OverlayPositioning from 'ol/OverlayPositioning';
import View from 'ol/View';
import GeometryLayout from 'ol/geom/GeometryLayout';
import LineString from 'ol/geom/LineString';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';

// creating the view
const view = new View({
  center: fromLonLat([5.8713, 45.6452]),
  zoom: 19
});

// creating the map
const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  target: 'map',
  view: view
});

// Geolocation marker
const markerEl = document.getElementById('geolocation_marker') as HTMLImageElement;
const marker = new Overlay({
  positioning: OverlayPositioning.CENTER_CENTER,
  element: markerEl,
  stopEvent: false
});
map.addOverlay(marker);

// LineString to store the different geolocation positions. This LineString
// is time aware.
// The Z dimension is actually used to store the rotation (heading).
const positions = new LineString([], GeometryLayout.XYZM);

// Geolocation Control
const geolocation = new Geolocation({
  projection: view.getProjection(),
  trackingOptions: {
    maximumAge: 10000,
    enableHighAccuracy: true,
    timeout: 600000
  }
});

let deltaMean = 500; // the geolocation sampling period mean in ms

// Listen to position changes
geolocation.on('change', () => {
  const position = geolocation.getPosition();
  const accuracy = geolocation.getAccuracy();
  const heading = geolocation.getHeading() || 0;
  const speed = geolocation.getSpeed() || 0;
  const m = Date.now();

  addPosition(position, heading, m, speed);

  const coords = positions.getCoordinates();
  const len = coords.length;
  if (len >= 2) {
    deltaMean = (coords[len - 1][3] - coords[0][3]) / (len - 1);
  }

  const html = [
    'Position: ' + position[0].toFixed(2) + ', ' + position[1].toFixed(2),
    'Accuracy: ' + accuracy,
    'Heading: ' + Math.round(radToDeg(heading)) + '&deg;',
    'Speed: ' + (speed * 3.6).toFixed(1) + ' km/h',
    'Delta: ' + Math.round(deltaMean) + 'ms'
  ].join('<br />');
  document.getElementById('info').innerHTML = html;
});

geolocation.on('error', () => {
  alert('geolocation error');
  // FIXME we should remove the coordinates in positions
});

// convert radians to degrees
function radToDeg(rad: number) {
  return rad * 360 / (Math.PI * 2);
}
// convert degrees to radians
function degToRad(deg: number) {
  return deg * Math.PI * 2 / 360;
}
// modulo for negative values
function mod(n: number) {
  return ((n % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);
}

function addPosition(position: number[], heading: number, m: number, speed: number) {
  const x = position[0];
  const y = position[1];
  const fCoords = positions.getCoordinates();
  const previous = fCoords[fCoords.length - 1];
  const prevHeading = previous && previous[2];
  if (prevHeading) {
    let headingDiff = heading - mod(prevHeading);

    // force the rotation change to be less than 180°
    if (Math.abs(headingDiff) > Math.PI) {
      const sign = (headingDiff >= 0) ? 1 : -1;
      headingDiff = -sign * (2 * Math.PI - Math.abs(headingDiff));
    }
    heading = prevHeading + headingDiff;
  }
  positions.appendCoordinate([x, y, heading, m]);

  // only keep the 20 last coordinates
  positions.setCoordinates(positions.getCoordinates().slice(-20));

  // FIXME use speed instead
  if (heading && speed) {
    markerEl.src = 'data/geolocation_marker_heading.png';
  } else {
    markerEl.src = 'data/geolocation_marker.png';
  }
}

// recenters the view by putting the given coordinates at 3/4 from the top or
// the screen
function getCenterWithHeading(position: number[], rotation: number, resolution: number) {
  const size = map.getSize();
  const height = size[1];

  return [
    position[0] - Math.sin(rotation) * height * resolution * 1 / 4,
    position[1] + Math.cos(rotation) * height * resolution * 1 / 4
  ];
}

let previousM = 0;
function updateView() {
  // use sampling period to get a smooth transition
  let m = Date.now() - deltaMean * 1.5;
  m = Math.max(m, previousM);
  previousM = m;
  // interpolate position along positions LineString
  const c = positions.getCoordinateAtM(m, true);
  if (c) {
    view.setCenter(getCenterWithHeading(c, -c[2], view.getResolution()));
    view.setRotation(-c[2]);
    marker.setPosition(c);
  }
}

// geolocate device
const geolocateBtn = document.getElementById('geolocate') as HTMLButtonElement;
geolocateBtn.addEventListener('click', () => {
  geolocation.setTracking(true); // Start position tracking

  map.on('postcompose', updateView);
  map.render();

  disableButtons();
}, false);

// simulate device move
let simulationData: any;
const client = new XMLHttpRequest();
client.open('GET', 'data/geolocation-orientation.json');



client.onload = () => {
  simulationData = JSON.parse(client.responseText).data;
};
client.send();

const simulateBtn = document.getElementById('simulate') as HTMLButtonElement;
simulateBtn.addEventListener('click', () => {
  const coordinates = simulationData;

  const first = coordinates.shift();
  simulatePositionChange(first);

  let prevDate = first.timestamp;
  function geolocate() {
    const position = coordinates.shift();
    if (!position) {
      return;
    }
    const newDate = position.timestamp;
    simulatePositionChange(position);
    window.setTimeout(() => {
      prevDate = newDate;
      geolocate();
    }, (newDate - prevDate) / 0.5);
  }
  geolocate();

  map.on('postcompose', updateView);
  map.render();

  disableButtons();
}, false);

function simulatePositionChange(position: any) {
  const coords = position.coords;
  geolocation.set('accuracy', coords.accuracy);
  geolocation.set('heading', degToRad(coords.heading));
  const projectedPosition = fromLonLat([coords.longitude, coords.latitude]);
  geolocation.set('position', projectedPosition);
  geolocation.set('speed', coords.speed);
  geolocation.changed();
}

function disableButtons() {
  geolocateBtn.disabled = true;
  simulateBtn.disabled = true;
}
