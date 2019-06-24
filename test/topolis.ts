import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import MousePosition from 'ol/control/MousePosition';
import { LineString, Point, Polygon } from 'ol/geom';
import GeometryType from 'ol/geom/GeometryType';
import SimpleGeometry from 'ol/geom/SimpleGeometry';
import { Draw, Snap } from 'ol/interaction';
import { DrawEvent } from 'ol/interaction/Draw';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';

declare var topolis: any;
declare var toastr: any;

const raster = new TileLayer({
  source: new OSM()
});

const nodes = new VectorSource({ wrapX: false });
const nodesLayer = new VectorLayer({
  source: nodes,
  style: f => {
    const style = new Style({
      image: new CircleStyle({
        radius: 8,
        fill: new Fill({ color: 'rgba(255, 0, 0, 0.2)' }),
        stroke: new Stroke({ color: 'red', width: 1 })
      }),
      text: new Text({
        text: f.get('node').id.toString(),
        fill: new Fill({ color: 'red' }),
        stroke: new Stroke({
          color: 'white',
          width: 3
        })
      })
    });
    return [style];
  }
});

const edges = new VectorSource({ wrapX: false });
const edgesLayer = new VectorLayer({
  source: edges,
  style: f => {
    const style = new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 1
      }),
      text: new Text({
        text: f.get('edge').id.toString(),
        fill: new Fill({ color: 'blue' }),
        stroke: new Stroke({
          color: 'white',
          width: 2
        })
      })
    });
    return [style];
  }
});

const faces = new VectorSource({ wrapX: false });
const facesLayer = new VectorLayer({
  source: faces,
  style: f => {
    const style = new Style({
      stroke: new Stroke({
        color: 'black',
        width: 1
      }),
      fill: new Fill({
        color: 'rgba(0, 255, 0, 0.2)'
      }),
      text: new Text({
        font: 'bold 12px sans-serif',
        text: f.get('face').id.toString(),
        fill: new Fill({ color: 'green' }),
        stroke: new Stroke({
          color: 'white',
          width: 2
        })
      })
    });
    return [style];
  }
});

const map = new Map({
  layers: [raster, facesLayer, edgesLayer, nodesLayer],
  target: 'map',
  view: new View({
    center: [-11000000, 4600000],
    zoom: 16
  })
});

const topo = topolis.createTopology();

topo.on('addnode', nodeToFeature);
topo.on('removenode', (e: any) => {
  removeElementFeature(nodes, e);
});
topo.on('addedge', edgeToFeature);
topo.on('modedge', (e: any) => {
  const feature = edges.getFeatureById(e.id);
  feature.setGeometry(new LineString(e.coordinates));
});
topo.on('removeedge', (e: any) => {
  removeElementFeature(edges, e);
});
topo.on('addface', faceToFeature);
topo.on('removeface', (e: any) => {
  removeElementFeature(faces, e);
});

function removeElementFeature(source: VectorSource, element: any) {
  const feature = source.getFeatureById(element.id);
  source.removeFeature(feature);
}

function nodeToFeature(node: any) {
  const feature = new Feature({
    geometry: new Point(node.coordinate),
    node: node
  });
  feature.setId(node.id);
  nodes.addFeature(feature);
}

function edgeToFeature(edge: any) {
  const feature = new Feature({
    geometry: new LineString(edge.coordinates),
    edge: edge
  });
  feature.setId(edge.id);
  edges.addFeature(feature);
}

function faceToFeature(face: any) {
  const coordinates = topo.getFaceGeometry(face);
  const feature = new Feature({
    geometry: new Polygon(coordinates),
    face: face
  });
  feature.setId(face.id);
  faces.addFeature(feature);
}

function createNode(topo_: any, coord: any) {
  let node: any;
  const existingEdge = topo_.getEdgeByPoint(coord, 5)[0];
  if (existingEdge) {
    node = topo_.modEdgeSplit(existingEdge, coord);
  } else {
    node = topo_.addIsoNode(coord);
  }
  return node;
}

function onDrawend(e: DrawEvent) {
  const edgeGeom = (e.feature.getGeometry() as SimpleGeometry).getCoordinates();
  const startCoord = edgeGeom[0];
  const endCoord = edgeGeom[edgeGeom.length - 1];
  let start: any, end: any;
  try {
    start = topo.getNodeByPoint(startCoord);
    end = topo.getNodeByPoint(endCoord);
    const edgesAtStart = topo.getEdgeByPoint(startCoord, 5);
    const edgesAtEnd = topo.getEdgeByPoint(endCoord, 5);
    const crossing = topo.getEdgesByLine(edgeGeom);
    if (crossing.length === 1 && !start && !end && edgesAtStart.length === 0 && edgesAtEnd.length === 0) {
      topo.remEdgeNewFace(crossing[0]);
      start = crossing[0].start;
      if (start.face) {
        topo.removeIsoNode(start);
      }
      end = crossing[0].end;
      if (end.face) {
        topo.removeIsoNode(end);
      }
      return;
    }
    if (!start) {
      start = createNode(topo, startCoord);
      edgeGeom[0] = start.coordinate;
    }
    if (!end) {
      end = createNode(topo, endCoord);
      edgeGeom[edgeGeom.length - 1] = end.coordinate;
    }
    topo.addEdgeNewFaces(start, end, edgeGeom);
  } catch (e) {
    toastr.warning(e.toString());
  }
}

const draw = new Draw({
  type: GeometryType.LINE_STRING
});
draw.on('drawend', onDrawend);
map.addInteraction(draw);
const snap = new Snap({
  source: edges
});
map.addInteraction(snap);
map.addControl(new MousePosition());
