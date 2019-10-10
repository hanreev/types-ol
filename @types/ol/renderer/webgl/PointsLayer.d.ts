import { EventsKey } from '../../events';
import BaseEvent from '../../events/Event';
import Feature from '../../Feature';
import Geometry from '../../geom/Geometry';
import Layer from '../../layer/Layer';
import { FrameState } from '../../PluggableMap';
import { UniformValue } from '../../webgl/Helper';
import WebGLLayerRenderer, { PostProcessesOptions } from './Layer';

export interface CustomAttribute {
    name: string;
    callback: (p0: Feature<Geometry>) => number;
}
export interface Options {
    attributes?: CustomAttribute[];
    vertexShader: string;
    fragmentShader: string;
    hitVertexShader?: string;
    hitFragmentShader?: string;
    uniforms?: { [key: string]: UniformValue };
    postProcesses?: PostProcessesOptions[];
}
export default class WebGLPointsLayerRenderer extends WebGLLayerRenderer<LayerType> {
    constructor(layer: Layer<SourceType>, options: Options);
    renderHitDetection(frameState: FrameState): void;
    on(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => any): void;
    on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'change', listener: (evt: BaseEvent) => void): void;
    on(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'error', listener: (evt: BaseEvent) => void): void;
}
