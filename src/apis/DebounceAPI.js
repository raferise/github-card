//minimal debouncer created by Riley Ferise
/**
 * Produces a function with a built in delay for debouncing
 * @param {Function} callback - Function to execute
 * @param {Number} delay - (in milliseconds)
 * @returns A function that executes the callback after the delay using the provided args
 */
export function getDebouncer(callback, delay) {
    let timeout = null;
    return (...args) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            callback(...args);
        }, delay);
    }
}