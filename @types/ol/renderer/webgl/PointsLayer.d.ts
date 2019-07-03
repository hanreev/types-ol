import { EventsKey } from '../../events';
import Event from '../../events/Event';
import Feature from '../../Feature';
import VectorLayer from '../../layer/Vector';
import { UniformValue } from '../../webgl/Helper';
import WebGLLayerRenderer, { PostProcessesOptions } from './Layer';

export interface Options {
    sizeCallback?: (p0: Feature) => number;
    coordCallback?: (p0: Feature, p1: number) => number;
    texCoordCallback?: (p0: Feature, p1: number) => number;
    colorCallback?: (p0: Feature, p1?: number[]) => number[];
    opacityCallback?: (p0: Feature) => number;
    rotateWithViewCallback?: (p0: Feature) => boolean;
    texture?: HTMLCanvasElement | HTMLImageElement | ImageData;
    vertexShader?: string;
    fragmentShader?: string;
    uniforms?: { [key: string]: UniformValue };
    postProcesses?: PostProcessesOptions[];
}
export default class WebGLPointsLayerRenderer extends WebGLLayerRenderer {
    constructor(vectorLayer: VectorLayer, opt_options?: Options);
    on(type: string | string[], listener: (p0: any) => void): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => void): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => void): void;
    on(type: 'change', listener: (evt: Event) => void): EventsKey;
    once(type: 'change', listener: (evt: Event) => void): EventsKey;
    un(type: 'change', listener: (evt: Event) => void): void;
    on(type: 'error', listener: (evt: Event) => void): EventsKey;
    once(type: 'error', listener: (evt: Event) => void): EventsKey;
    un(type: 'error', listener: (evt: Event) => void): void;
}
