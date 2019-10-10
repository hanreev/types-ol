import Feature, { FeatureLike } from '../Feature';
import Geometry from '../geom/Geometry';
import Projection from '../proj/Projection';
import FeatureFormat, { ReadOptions, WriteOptions } from './Feature';

export default class XMLFeature extends FeatureFormat {
    constructor();
    protected readFeaturesFromDocument(doc: Document, opt_options?: ReadOptions): Feature<GeomType>[];
    protected readFeaturesFromNode(node: Node, opt_options?: ReadOptions): Feature<GeomType>[];
    protected readGeometryFromDocument(doc: Document, opt_options?: ReadOptions): Geometry;
    protected readGeometryFromNode(node: Node, opt_options?: ReadOptions): Geometry;
    protected readProjectionFromDocument(doc: Document): Projection;
    protected readProjectionFromNode(node: Node): Projection;
    protected writeFeatureNode(feature: Feature<GeomType>, opt_options?: WriteOptions): Node;
    readFeature(source: Document | Node | object | string, opt_options?: ReadOptions): Feature<GeomType>;
    readFeature(source: Document | Node | object | string, opt_options?: ReadOptions): FeatureLike;
    readFeatureFromDocument(doc: Document, opt_options?: ReadOptions): Feature<GeomType>;
    readFeatureFromNode(node: Node, opt_options?: ReadOptions): Feature<GeomType>;
    readFeatures(source: Document | Node | object | string, opt_options?: ReadOptions): Feature<GeomType>[];
    readFeatures(source: Document | Node | ArrayBuffer | object | string, opt_options?: ReadOptions): FeatureLike[];
    readProjection(source: Document | Node | object | string): Projection;
    writeFeatures(features: Feature<GeomType>[], opt_options?: WriteOptions): string;
    writeFeaturesNode(features: Feature<GeomType>[], opt_options?: WriteOptions): Node;
    writeGeometryNode(geometry: Geometry, opt_options?: WriteOptions): Node;
}
