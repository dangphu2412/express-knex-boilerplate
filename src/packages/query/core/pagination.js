import { SearchConfig } from './search-config';

/**
 *
 * @param {any} value
 * @param {() => Error} parseFailSupplier
 * @returns
 */
export function parseInt(value, parseFailSupplier) {
    if (!value) {
        return value;
    }

    const parsedValue = Number.parseInt(value, 10);

    if (Number.isNaN(parsedValue)) {
        throw parseFailSupplier();
    }

    return parsedValue;
}

export function assertReachMax(value, maxKey, reachMaxSupplier) {
    if (SearchConfig.get(maxKey) && value > SearchConfig.get(maxKey)) {
        throw reachMaxSupplier();
    }
}
