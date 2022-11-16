import Tile, { LoadFunction, Options } from './Tile';
import TileState from './TileState';
import { TileCoord } from './tilecoord';

export default class ImageTile extends Tile {
    constructor(
        tileCoord: TileCoord,
        state: TileState,
        src: string,
        crossOrigin: string,
        tileLoadFunction: LoadFunction,
        options?: Options,
    );
    /**
     * Get the HTML image element for this tile (may be a Canvas, Image, or Video).
     */
    getImage(): HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
    /**
     * Load the image or retry if loading previously failed.
     * Loading is taken care of by the tile queue, and calling this method is
     * only needed for preloading or for reloading in case of an error.
     * To retry loading tiles on failed requests, use a custom tileLoadFunction
     * that checks for error status codes and reloads only when the status code is
     * 408, 429, 500, 502, 503 and 504, and only when not too many retries have been
     * made already:
     * <code>const retryCodes = [408, 429, 500, 502, 503, 504];
     * const retries = {};
     * source.setTileLoadFunction((tile, src) => {
     *   const image = tile.getImage();
     *   fetch(src)
     *     .then((response) => {
     *       if (retryCodes.includes(response.status)) {
     *         retries[src] = (retries[src] || 0) + 1;
     *         if (retries[src] <= 3) {
     *           setTimeout(() => tile.load(), retries[src] * 1000);
     *         }
     *         return Promise.reject();
     *       }
     *       return response.blob();
     *     })
     *     .then((blob) => {
     *       const imageUrl = URL.createObjectURL(blob);
     *       image.src = imageUrl;
     *       setTimeout(() => URL.revokeObjectURL(imageUrl), 5000);
     *     })
     *     .catch(() => tile.setState(3)); // error
     * });</code>
     */
    load(): void;
    /**
     * Sets an HTML image element for this tile (may be a Canvas or preloaded Image).
     */
    setImage(element: HTMLCanvasElement | HTMLImageElement): void;
}
