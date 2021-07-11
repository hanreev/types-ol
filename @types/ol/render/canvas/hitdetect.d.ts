import { FeatureLike } from 'ol/Feature';
import { Extent } from 'ol/extent';
import { Pixel } from 'ol/pixel';
import { Size } from 'ol/size';
import { StyleFunction } from 'ol/style/Style';
import { Transform } from 'ol/transform';

export function createHitDetectionImageData(
    size: Size,
    transforms: Transform[],
    features: FeatureLike[],
    styleFunction: StyleFunction | undefined,
    extent: Extent,
    resolution: number,
    rotation: number,
): ImageData;
export function hitDetect(pixel: Pixel, features: FeatureLike[], imageData: ImageData): FeatureLike[];
