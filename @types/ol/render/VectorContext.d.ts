import Feature from 'ol/Feature';
import { FeatureLike } from 'ol/Feature';
import Circle from 'ol/geom/Circle';
import Geometry from 'ol/geom/Geometry';
import GeometryCollection from 'ol/geom/GeometryCollection';
import LineString from 'ol/geom/LineString';
import MultiLineString from 'ol/geom/MultiLineString';
import MultiPoint from 'ol/geom/MultiPoint';
import MultiPolygon from 'ol/geom/MultiPolygon';
import Point from 'ol/geom/Point';
import Polygon from 'ol/geom/Polygon';
import SimpleGeometry from 'ol/geom/SimpleGeometry';
import RenderFeature from 'ol/render/Feature';
import { DeclutterImageWithText } from 'ol/render/canvas';
import Fill from 'ol/style/Fill';
import ImageStyle from 'ol/style/Image';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';

export default class VectorContext {
    constructor();
    drawCircle(circleGeometry: Circle, feature: Feature<Geometry>): void;
    /**
     * Render a geometry with a custom renderer.
     */
    drawCustom(geometry: SimpleGeometry, feature: FeatureLike, renderer: () => void): void;
    drawFeature(feature: Feature<Geometry>, style: Style): void;
    /**
     * Render a geometry.
     */
    drawGeometry(geometry: Geometry): void;
    drawGeometryCollection(geometryCollectionGeometry: GeometryCollection, feature: Feature<Geometry>): void;
    drawLineString(lineStringGeometry: LineString | RenderFeature, feature: FeatureLike): void;
    drawMultiLineString(multiLineStringGeometry: MultiLineString | RenderFeature, feature: FeatureLike): void;
    drawMultiPoint(multiPointGeometry: MultiPoint | RenderFeature, feature: FeatureLike): void;
    drawMultiPolygon(multiPolygonGeometry: MultiPolygon, feature: FeatureLike): void;
    drawPoint(pointGeometry: Point | RenderFeature, feature: FeatureLike): void;
    drawPolygon(polygonGeometry: Polygon | RenderFeature, feature: FeatureLike): void;
    drawText(geometry: SimpleGeometry | RenderFeature, feature: FeatureLike): void;
    setFillStrokeStyle(fillStyle: Fill, strokeStyle: Stroke): void;
    setImageStyle(imageStyle: ImageStyle, opt_declutterImageWithText?: DeclutterImageWithText): void;
    /**
     * Set the rendering style.
     */
    setStyle(style: Style): void;
    setTextStyle(textStyle: Text, opt_declutterImageWithText?: DeclutterImageWithText): void;
}
