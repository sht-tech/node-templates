// utils/queryBuilder.js

module.exports = (queryParams) => {
    const query = {};
    const options = { limit: 20 }; // To hold additional query options like sort, limit, skip
    http://localhost:8000/api/auth/users?filter_email="shamir@yopmail.com&startWith_name=shaik"
    Object.keys(queryParams).forEach(key => {
        if (key.startsWith('filter_')) {
            const field = key.replace('filter_', '');
            query[field] = queryParams[key];
        }

        if (key.startsWith('gt_')) {
            const field = key.replace('gt_', '');
            query[field] = { ...query[field], $gt: queryParams[key] };
        }

        if (key.startsWith('lt_')) {
            const field = key.replace('lt_', '');
            query[field] = { ...query[field], $lt: queryParams[key] };
        }

        if (key.startsWith('startWith_')) {
            const field = key.replace('startWith_', '');
            query[field] = { $regex: new RegExp('^' + queryParams[key], 'i') }; // Case-insensitive regex
        }

        if (key.startsWith('regex_')) {
            const field = key.replace('regex_', '');
            query[field] = { $regex: new RegExp(queryParams[key]) };
        }

        if (key.startsWith('sort_')) {
            const field = key.replace('sort_', '');
            options.sort = { ...options.sort, [field]: queryParams[key].toLowerCase() === 'asc' ? 1 : -1 };
        }

        if (key === 'limit') {
            options.limit = parseInt(queryParams[key], 10);
        }

        if (key === 'skip') {
            options.skip = parseInt(queryParams[key], 10);
        }
    });

    return { query, options };
};
