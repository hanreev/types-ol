declare module 'ol/proj/transforms' {

  import Projection from 'ol/proj/Projection';
  import { TransformFunction } from 'ol/proj';

  export function add(source: Projection, destination: Projection, transformFn: TransformFunction): void;

  export function clear(): void;

  export function get(sourceCode: string, destinationCode: string): TransformFunction;

  export function remove(source: Projection, destination: Projection): TransformFunction;

}
