import Feature from 'ol/Feature';
import { Extent } from 'ol/extent';
import Circle from 'ol/geom/Circle';
import Geometry from 'ol/geom/Geometry';
import GeometryCollection from 'ol/geom/GeometryCollection';
import LineString from 'ol/geom/LineString';
import MultiLineString from 'ol/geom/MultiLineString';
import MultiPoint from 'ol/geom/MultiPoint';
import MultiPolygon from 'ol/geom/MultiPolygon';
import Point from 'ol/geom/Point';
import Polygon from 'ol/geom/Polygon';
import { TransformFunction } from 'ol/proj';
import RenderFeature from 'ol/render/Feature';
import VectorContext from 'ol/render/VectorContext';
import Fill from 'ol/style/Fill';
import ImageStyle from 'ol/style/Image';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import { Transform } from 'ol/transform';

export default class CanvasImmediateRenderer extends VectorContext {
    constructor(
        context: CanvasRenderingContext2D,
        pixelRatio: number,
        extent: Extent,
        transform: Transform,
        viewRotation: number,
        opt_squaredTolerance?: number,
        opt_userTransform?: TransformFunction,
    );
    /**
     * Render a circle geometry into the canvas.  Rendering is immediate and uses
     * the current fill and stroke styles.
     */
    drawCircle(geometry: Circle): void;
    /**
     * Render a feature into the canvas.  Note that any zIndex on the provided
     * style will be ignored - features are rendered immediately in the order that
     * this method is called.  If you need zIndex support, you should be using an
     * {@link module:ol/layer/Vector~VectorLayer} instead.
     */
    drawFeature(feature: Feature<Geometry>, style: Style): void;
    /**
     * Render a geometry into the canvas.  Call
     * {@link module:ol/render/canvas/Immediate#setStyle} first to set the rendering style.
     */
    drawGeometry(geometry: Geometry | RenderFeature): void;
    /**
     * Render a GeometryCollection to the canvas.  Rendering is immediate and
     * uses the current styles appropriate for each geometry in the collection.
     */
    drawGeometryCollection(geometry: GeometryCollection): void;
    /**
     * Render a LineString into the canvas.  Rendering is immediate and uses
     * the current style.
     */
    drawLineString(geometry: LineString | RenderFeature): void;
    /**
     * Render a MultiLineString geometry into the canvas.  Rendering is immediate
     * and uses the current style.
     */
    drawMultiLineString(geometry: MultiLineString | RenderFeature): void;
    /**
     * Render a MultiPoint geometry  into the canvas.  Rendering is immediate and
     * uses the current style.
     */
    drawMultiPoint(geometry: MultiPoint | RenderFeature): void;
    /**
     * Render MultiPolygon geometry into the canvas.  Rendering is immediate and
     * uses the current style.
     */
    drawMultiPolygon(geometry: MultiPolygon): void;
    /**
     * Render a Point geometry into the canvas.  Rendering is immediate and uses
     * the current style.
     */
    drawPoint(geometry: Point | RenderFeature): void;
    /**
     * Render a Polygon geometry into the canvas.  Rendering is immediate and uses
     * the current style.
     */
    drawPolygon(geometry: Polygon | RenderFeature): void;
    /**
     * Set the fill and stroke style for subsequent draw operations.  To clear
     * either fill or stroke styles, pass null for the appropriate parameter.
     */
    setFillStrokeStyle(fillStyle: Fill, strokeStyle: Stroke): void;
    /**
     * Set the image style for subsequent draw operations.  Pass null to remove
     * the image style.
     */
    setImageStyle(imageStyle: ImageStyle): void;
    /**
     * Set the rendering style.  Note that since this is an immediate rendering API,
     * any zIndex on the provided style will be ignored.
     */
    setStyle(style: Style): void;
    /**
     * Set the text style for subsequent draw operations.  Pass null to
     * remove the text style.
     */
    setTextStyle(textStyle: Text): void;
    setTransform(transform: Transform): void;
}
