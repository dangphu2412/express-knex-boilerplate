export const SortDirection = {
    '-': 'DESC',
    '+': 'ASC'
};

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

export function parseSorts(sorts) {
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
