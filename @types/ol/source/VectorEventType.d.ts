export type VectorSourceEventTypes =
    | 'addfeature'
    | 'clear'
    | 'removefeature'
    | 'featuresloadstart'
    | 'featuresloadend'
    | 'featuresloaderror';
declare enum VectorEventType {
    ADDFEATURE = 'addfeature',
    CHANGEFEATURE = 'changefeature',
    CLEAR = 'clear',
    REMOVEFEATURE = 'removefeature',
    FEATURESLOADSTART = 'featuresloadstart',
    FEATURESLOADEND = 'featuresloadend',
    FEATURESLOADERROR = 'featuresloaderror',
}

export default VectorEventType;
