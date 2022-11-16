import Feature from '../Feature';
import Geometry from '../geom/Geometry';
import Projection from '../proj/Projection';
import FeatureFormat, { ReadOptions, Type, WriteOptions } from './Feature';

export default abstract class XMLFeature extends FeatureFormat {
    constructor();
    protected readFeaturesFromDocument(doc: Document, options?: ReadOptions): Feature<Geometry>[];
    protected abstract readFeaturesFromNode(node: Element, options?: ReadOptions): Feature<Geometry>[];
    protected readGeometryFromDocument(doc: Document, options?: ReadOptions): Geometry;
    protected readGeometryFromNode(node: Element, options?: ReadOptions): Geometry;
    protected readProjectionFromDocument(doc: Document): Projection;
    protected readProjectionFromNode(node: Element): Projection;
    protected writeFeatureNode(feature: Feature<Geometry>, options?: WriteOptions): Node;
    getType(): Type;
    /**
     * Read a single feature.
     */
    readFeature(source: Document | Element | object | string, options?: ReadOptions): Feature<Geometry>;
    readFeatureFromDocument(doc: Document, options?: ReadOptions): Feature<Geometry>;
    readFeatureFromNode(node: Element, options?: ReadOptions): Feature<Geometry>;
    /**
     * Read all features from a feature collection.
     */
    readFeatures(source: Document | Element | object | string, options?: ReadOptions): Feature<Geometry>[];
    /**
     * Read a single geometry from a source.
     */
    readGeometry(source: Document | Element | object | string, options?: ReadOptions): Geometry;
    /**
     * Read the projection from the source.
     */
    readProjection(source: Document | Element | object | string): Projection;
    /**
     * Encode a feature as string.
     */
    writeFeature(feature: Feature<Geometry>, options?: WriteOptions): string;
    /**
     * Encode an array of features as string.
     */
    writeFeatures(features: Feature<Geometry>[], options?: WriteOptions): string;
    writeFeaturesNode(features: Feature<Geometry>[], options?: WriteOptions): Node;
    /**
     * Encode a geometry as string.
     */
    writeGeometry(geometry: Geometry, options?: WriteOptions): string;
    writeGeometryNode(geometry: Geometry, options?: WriteOptions): Node;
}
