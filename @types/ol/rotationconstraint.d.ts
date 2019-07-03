export type Type = (p0: number, p1?: boolean) => number;
export function createSnapToN(n: number): Type;
export function createSnapToZero(opt_tolerance?: number): Type;
export function disable(rotation: number): number;
export function none(rotation: number): number;
