import { Extent } from 'ol/extent';
import VectorContext from 'ol/render/VectorContext';
import { SerializableInstructions } from 'ol/render/canvas';
import BuilderType from 'ol/render/canvas/BuilderType';

export default class BuilderGroup {
    constructor(tolerance: number, maxExtent: Extent, resolution: number, pixelRatio: number);
    finish(): { [key: string]: { [key in BuilderType]: SerializableInstructions } };
    getBuilder(zIndex: number | undefined, builderType: BuilderType): VectorContext;
}
