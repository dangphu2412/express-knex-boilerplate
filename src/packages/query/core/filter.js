import { BadRequestException } from 'packages/httpException';

export const FilterSign = {
    $eq: '=',
    $gt: '>',
    $lt: '<',
    $in: 'in'
};

function assertFilter(filter) {
    if (filter.length !== 3) {
        throw new BadRequestException('Filter format is not valid');
    }

    if (!FilterSign[filter[1]]) {
        throw new BadRequestException('Sign in filter is not valid');
    }
}

function toFilter(filter) {
    const parts = filter.split('|');

    assertFilter(parts);

    return {
        column: parts[0],
        sign: FilterSign[parts[1]],
        value: parts[2]
    };
}

export function parseFilters(filters) {
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
