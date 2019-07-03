import { Options } from '../source/IIIF';

export interface IiifProfile {
    formats?: string[];
    qualities?: string[];
    supports?: string[];
    maxArea?: number;
    maxHeight?: number;
    maxWidth?: number;
}
export interface ImageInformationResponse1_0 {
    identifier: string;
    width: number;
    height: number;
    scale_factors?: number[];
    tile_width?: number;
    tile_height?: number;
    formats?: string[];
    profile?: string;
}
export interface ImageInformationResponse1_1 {
    '@id': string;
    '@context': string;
    width: number;
    height: number;
    scale_factors?: number[];
    tile_width?: number;
    tile_height?: number;
    formats?: string[];
    profile?: string;
}
export interface ImageInformationResponse2 {
    '@id': string;
    '@context': string;
    width: number;
    height: number;
    profile: (string | IiifProfile)[];
    sizes?: { [key: string]: number }[];
    tiles?: TileInfo[];
}
export interface ImageInformationResponse3 {
    id: string;
    '@context': string;
    width: number;
    height: number;
    profile: string;
    sizes?: { [key: string]: number }[];
    tiles?: TileInfo[];
    maxArea?: number;
    maxHeight?: number;
    maxWidth?: number;
    extraQualities?: string[];
    extraFormats?: string[];
    extraFeatures?: string[];
}
export interface PreferredOptions {
    format?: string;
    quality?: string;
}
export interface SupportedFeatures {
    supports?: string[];
    formats?: string[];
    qualities?: string[];
}
export interface TileInfo {
    scaleFactors: number[];
    width: number;
    height?: number;
}
export enum Versions {
    VERSION1 = 'version1',
    VERSION2 = 'version2',
    VERSION3 = 'version3',
}
export default class IIIFInfo {
    constructor(
        imageInfo:
            | string
            | ImageInformationResponse1_0
            | ImageInformationResponse1_1
            | ImageInformationResponse2
            | ImageInformationResponse3
    );
    getComplianceLevelEntryFromProfile(version: Versions): string;
    getComplianceLevelFromProfile(version: Versions): string;
    getComplianceLevelSupportedFeatures(): SupportedFeatures;
    getImageApiVersion(): Versions;
    getTileSourceOptions(opt_preferredOptions: PreferredOptions): Options;
    setImageInfo(
        imageInfo:
            | string
            | ImageInformationResponse1_0
            | ImageInformationResponse1_1
            | ImageInformationResponse2
            | ImageInformationResponse3
    ): void;
}
