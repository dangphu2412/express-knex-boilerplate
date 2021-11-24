import { SearchConfig } from 'packages/query/core/search-config';

export function configSearch() {
    SearchConfig.config({
        maxLimit: 100,
        defaultLimit: 20,
        defaultPage: 0
    });
}
