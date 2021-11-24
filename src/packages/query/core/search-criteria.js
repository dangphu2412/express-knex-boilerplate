import { BadRequestException } from 'packages/httpException';
import { ConfigKeys, SearchConfig } from './search-config';

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

        return instance;
    }
}
