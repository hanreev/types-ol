import Map from 'ol/Map';
import View from 'ol/View';
import GeometryType from 'ol/geom/GeometryType';
import { Draw, Modify, Select, Snap } from 'ol/interaction';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

const raster = new TileLayer({
    source: new OSM(),
});

const vector = new VectorLayer({
    source: new VectorSource(),
    style: new Style({
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
            color: '#ffcc33',
            width: 2,
        }),
        image: new CircleStyle({
            radius: 7,
            fill: new Fill({
                color: '#ffcc33',
            }),
        }),
    }),
});

const map = new Map({
    layers: [raster, vector],
    target: 'map',
    view: new View({
        center: [-11000000, 4600000],
        zoom: 4,
    }),
});

class ExampleModifyClass {
    select = new Select();

    modify = new Modify({
        features: this.select.getFeatures(),
    });

    constructor() {
        map.addInteraction(this.select);
        map.addInteraction(this.modify);

        this.setEvents();
    }

    setEvents() {
        const selectedFeatures = this.select.getFeatures();

        this.select.on('change:active', () => {
            selectedFeatures.forEach(each => {
                selectedFeatures.remove(each);
            });
        });
    }
    setActive(active: boolean) {
        this.select.setActive(active);
        this.modify.setActive(active);
    }
}
const ExampleModify = new ExampleModifyClass();

const optionsForm = document.getElementById('options-form') as HTMLFormElement;

class ExampleDrawClass {
    Point = new Draw({
        source: vector.getSource()!,
        type: GeometryType.POINT,
    });

    LineString = new Draw({
        source: vector.getSource()!,
        type: GeometryType.LINE_STRING,
    });

    Polygon = new Draw({
        source: vector.getSource()!,
        type: GeometryType.POLYGON,
    });

    Circle = new Draw({
        source: vector.getSource()!,
        type: GeometryType.CIRCLE,
    });

    activeType: 'Point' | 'LineString' | 'Polygon' | 'Circle' | null = null;

    constructor() {
        map.addInteraction(this.Point);
        this.Point.setActive(false);
        map.addInteraction(this.LineString);
        this.LineString.setActive(false);
        map.addInteraction(this.Polygon);
        this.Polygon.setActive(false);
        map.addInteraction(this.Circle);
        this.Circle.setActive(false);
    }

    getActive() {
        return this.activeType ? this[this.activeType].getActive() : false;
    }

    setActive(active: boolean) {
        const type = (optionsForm.elements['draw-type' as any] as HTMLInputElement).value as
            | 'Point'
            | 'LineString'
            | 'Polygon'
            | 'Circle';
        if (active) {
            if (this.activeType) this[this.activeType].setActive(false);
            this[type].setActive(true);
            this.activeType = type;
        } else {
            if (this.activeType) this[this.activeType].setActive(false);
            this.activeType = null;
        }
    }
}
const ExampleDraw = new ExampleDrawClass();

optionsForm.onchange = e => {
    const type = (e.target as HTMLInputElement).getAttribute('name');
    const value = (e.target as HTMLInputElement).value;
    if (type === 'draw-type') {
        if (ExampleDraw.getActive()) ExampleDraw.setActive(true);
    } else if (type === 'interaction') {
        if (value === 'modify') {
            ExampleDraw.setActive(false);
            ExampleModify.setActive(true);
        } else if (value === 'draw') {
            ExampleDraw.setActive(true);
            ExampleModify.setActive(false);
        }
    }
};

ExampleDraw.setActive(true);
ExampleModify.setActive(false);

// The snap interaction must be added after the Modify and Draw interactions
// in order for its map browser event handlers to be fired first. Its handlers
// are responsible of doing the snapping.
const snap = new Snap({
    source: vector.getSource()!,
});
map.addInteraction(snap);
