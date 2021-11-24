import { BadRequestException } from 'packages/httpException';
import { ConfigKeys, SearchConfig } from './search-config';

export const FilterSign = {
    $eq: '$eq',
    $gt: '$gt',
    $lt: '$lt',
    $in: '$in',
    $s: '$regex'
};

export const SortDirection = {
    '-': -1,
    '+': 1
};

const REGEX_SEARCH_CLEANER = '/[^\\w\\s]/gi';

/**
 * 
 * @param {any} value 
 * @param {() => Error} parseFailSupplier 
 * @returns 
 */
function parseInt(value, parseFailSupplier) {
    if (!value) {
        return value;
    }

    const parsedValue = Number.parseInt(value, 10);

    if (Number.isNaN(parsedValue)) {
        throw parseFailSupplier();
    }

    return parsedValue;
}

function assertReachMax(value, maxKey, reachMaxSupplier) {
    if (SearchConfig.get(maxKey) && value > SearchConfig.get(maxKey)) {
        throw reachMaxSupplier();
    }
}

function toFilter(filter) {
    const parts = filter.split('|');

    return {
        column: parts[0],
        sign: FilterSign[parts[1]],
        value: parts[2]
    };
}

function toSort(sort) {
    const sortSchema = {
        sort: '',
        order: SortDirection['-']
    };
    const signCharacter = sort[0];
    const isDescendingDirection = SortDirection[signCharacter] === SortDirection['-'];

    if (isDescendingDirection) {
        sortSchema.sort = sort.slice(1, sort.length);
        return sortSchema;
    }

    sortSchema.sort = sort;
    sortSchema.order = SortDirection['+'];

    return sortSchema;
}

function parseFilters(filters) {
    const sliceFilters = [];

    if (!filters || filters.length === 0) return sliceFilters;

    if (typeof filters === 'string') {
        sliceFilters.push(toFilter(filters));
        return sliceFilters;
    }

    if (typeof filters === 'object') {
        filters.forEach(filter => sliceFilters.push(toFilter(filter)));
    }

    return sliceFilters;
}

function parseSorts(sorts) {
    const sliceSorts = [];
    if (!sorts || sorts.length === 0) return sliceSorts;

    if (typeof sorts === 'string') {
        sliceSorts.push(toSort(sorts));
    }

    if (typeof sorts === 'object' && sorts.length > 0) {
        sorts.forEach(sort => sliceSorts.push(toSort(sort)));
    }

    return sliceSorts;
}

function parseSearch(search) {
    const schema = {};

    if (!search) return null;

    schema.value = search.replace(
        REGEX_SEARCH_CLEANER,
        ''
    );

    return schema;
}

export class SearchCriteria {
    limit;

    offset;

    page;

    sorts;

    filters;

    search;

    static create(query) {
        const instance = new SearchCriteria();

        instance.limit = parseInt(query.limit, () => new BadRequestException('Limit should be an number'))
            || SearchConfig.get(ConfigKeys.DEFAULT_LIMIT);

        assertReachMax(instance.limit, ConfigKeys.DEFAULT_LIMIT, () => new BadRequestException(`Can not set limit with this value: ${this.limit} because it reachs max value`));

        instance.page = parseInt(query.page, () => new BadRequestException('Page should be an number'))
            || SearchConfig.get(ConfigKeys.DEFAULT_LIMIT);

        assertReachMax(instance.limit, ConfigKeys.DEFAULT_PAGE, () => new BadRequestException(`Can not set page with this value: ${this.page} because it reachs max value`));

        instance.filters = parseFilters(query.filters);

        instance.sorts = parseSorts(query.sorts);

        instance.search = parseSearch(query.search);

        return instance;
    }
}
