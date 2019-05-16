import { ColorLike } from '../colorlike';
import AtlasManager from './AtlasManager';
import Fill from './Fill';
import ImageStyle from './Image';
import Stroke from './Stroke';

export interface Options {
    fill?: Fill;
    points: number;
    radius?: number;
    radius1?: number;
    radius2?: number;
    angle?: number;
    stroke?: Stroke;
    rotation?: number;
    rotateWithView?: boolean;
    atlasManager?: AtlasManager;
}
export default class RegularShape extends ImageStyle {
    constructor(options: Options);
    protected atlasManager_: AtlasManager;
    protected radius_: number;
    protected render_(atlasManager: AtlasManager): void;
    getChecksum(): string;
    getFill(): Fill;
    clone(): RegularShape;
    clone(): ImageStyle;
    getRadius(): number;
    getRadius2(): number;
    getStroke(): Stroke;
    getAngle(): number;
    getPoints(): number;
}
export interface RenderOptions {
    strokeStyle?: ColorLike;
    strokeWidth: number;
    size: number;
    lineCap: string;
    lineDash: number[];
    lineDashOffset: number;
    lineJoin: string;
    miterLimit: number;
}
