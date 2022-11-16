export interface MetersPerUnitLookup {
    radians: number;
    degrees: number;
    ft: number;
    m: number;
    'us-ft': number;
}
/**
 * Projection units.
 */
export type Units = 'radians' | 'degrees' | 'ft' | 'm' | 'pixels' | 'tile-pixels' | 'us-ft';
/**
 * Meters per unit lookup table.
 */
export const METERS_PER_UNIT: MetersPerUnitLookup;
export function fromCode(code: number): Units;
