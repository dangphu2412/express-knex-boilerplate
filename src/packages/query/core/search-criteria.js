import { BadRequestException } from 'packages/httpException';
import { ArrayUtils } from 'packages/utils/array.util';
import { parseFilters } from './filter';
import { assertReachMax, parseInt } from './pagination';
import { parseSearch } from './search';
import { ConfigKeys, SearchConfig } from './search-config';
import { parseSorts } from './sort';

export class SearchCriteria {
    limit;

    offset;

    page;

    sorts;

    filters;

    search;

    interceptQuery({ sorts, filters }) {
        if (sorts && ArrayUtils.isPresent(sorts.allowFields) && ArrayUtils.isPresent(this.sorts)) {
            const isNotAccepted = !this.sorts.some(item => sorts.allowFields.includes(item.sort));

            if (isNotAccepted) {
                throw new BadRequestException('Invalid sort field');
            }
        }

        if (filters && ArrayUtils.isPresent(filters.allowFields) && ArrayUtils.isPresent(this.filters)) {
            const isNotAccepted = !this.filters.some(item => filters.allowFields.includes(item.column));

            if (isNotAccepted) {
                throw new BadRequestException('Invalid filter field');
            }
        }
    }

    static create(query) {
        const instance = new SearchCriteria();

        instance.limit = parseInt(query.limit, () => new BadRequestException('Limit should be an number'))
            || SearchConfig.get(ConfigKeys.DEFAULT_LIMIT);

        assertReachMax(instance.limit, ConfigKeys.MAX_LIMIT, () => new BadRequestException(`Can not set limit with this value: ${query.limit} because it reach max value`));

        instance.page = parseInt(query.page, () => new BadRequestException('Page should be an number'))
            || SearchConfig.get(ConfigKeys.DEFAULT_PAGE);

        assertReachMax(instance.page, ConfigKeys.MAX_PAGE, () => new BadRequestException(`Can not set page with this value: ${query.page} because it reach max value`));

        instance.filters = parseFilters(query.filters);

        instance.sorts = parseSorts(query.sorts);

        instance.search = parseSearch(query.search);

        return instance;
    }
}
