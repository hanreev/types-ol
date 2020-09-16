import Map from 'ol/Map';
import View from 'ol/View';
import { Extent, getCenter, getWidth } from 'ol/extent';
import { Image as ImageLayer, Tile as TileLayer } from 'ol/layer';
import { fromLonLat, toLonLat } from 'ol/proj';
import Projection from 'ol/proj/Projection';
import { ImageCanvas as ImageCanvasSource, Stamen } from 'ol/source';

declare let d3: any;
declare let topojson: any;

const map = new Map({
    layers: [
        new TileLayer({
            source: new Stamen({
                layer: 'watercolor',
            }),
        }),
    ],
    target: 'map',
    view: new View({
        center: fromLonLat([-97, 38]),
        zoom: 4,
    }),
});

d3.json('data/topojson/us.json', (error: any, us: any) => {
    const features = topojson.feature(us, us.objects.counties);

    const canvasFunction = (
        extent: Extent,
        resolution: number,
        pixelRatio: number,
        size: number[],
        projection: Projection,
    ): HTMLCanvasElement => {
        const canvasWidth = size[0];
        const canvasHeight = size[1];

        const canvas = d3.select(document.createElement('canvas'));
        canvas.attr('width', canvasWidth).attr('height', canvasHeight);

        const context = canvas.node().getContext('2d');

        const d3Projection = d3.geoMercator().scale(1).translate([0, 0]);
        let d3Path = d3.geoPath().projection(d3Projection);

        const pixelBounds = d3Path.bounds(features);
        const pixelBoundsWidth = pixelBounds[1][0] - pixelBounds[0][0];
        const pixelBoundsHeight = pixelBounds[1][1] - pixelBounds[0][1];

        const geoBounds = d3.geoBounds(features);
        const geoBoundsLeftBottom = fromLonLat(geoBounds[0], projection);
        const geoBoundsRightTop = fromLonLat(geoBounds[1], projection);
        let geoBoundsWidth = geoBoundsRightTop[0] - geoBoundsLeftBottom[0];
        if (geoBoundsWidth < 0) geoBoundsWidth += getWidth(projection.getExtent());

        const geoBoundsHeight = geoBoundsRightTop[1] - geoBoundsLeftBottom[1];

        const widthResolution = geoBoundsWidth / pixelBoundsWidth;
        const heightResolution = geoBoundsHeight / pixelBoundsHeight;
        const r = Math.max(widthResolution, heightResolution);
        const scale = r / (resolution / pixelRatio);

        const center = toLonLat(getCenter(extent), projection);
        d3Projection
            .scale(scale)
            .center(center)
            .translate([canvasWidth / 2, canvasHeight / 2]);
        d3Path = d3Path.projection(d3Projection).context(context);
        d3Path(features);
        context.stroke();

        return canvas.node();
    };

    const layer = new ImageLayer({
        source: new ImageCanvasSource({
            canvasFunction,
            projection: 'EPSG:3857',
        }),
    });
    map.addLayer(layer);
});
