const REGEX_SEARCH_CLEANER = /\W+/g;

export function parseSearch(search) {
    return !search
        ? ''
        : search.replace(
            REGEX_SEARCH_CLEANER,
            ''
        );
}
