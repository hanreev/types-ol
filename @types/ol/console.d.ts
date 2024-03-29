export type Level = 'info' | 'warn' | 'error' | 'none';
/**
 * Set the logging level.  By default, the level is set to 'info' and all
 * messages will be logged.  Set to 'warn' to only display warnings and errors.
 * Set to 'error' to only display errors.  Set to 'none' to silence all messages.
 */
export function setLevel(l: Level): void;
