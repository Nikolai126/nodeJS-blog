exports.newPagination = function (pagination, options) {
    if (!pagination) {
        return '';
    }

    let limit = 6;
    let queryParams = '';
    let page = pagination.page;
    let paginationClass = 'paginat';

    if (options.hash.limit) {
        limit = +options.hash.limit;
    }
    if (options.hash.leftText) {
        leftText = options.hash.leftText;
    }
    if (options.hash.rightText) {
        rightText = options.hash.rightText;
    }
    if (options.hash.paginationClass) {
        paginationClass = options.hash.paginationClass;
    }
    let pageCount = Math.ceil(pagination.totalRows / pagination.limit);

    //queryParams
    if(pagination.queryParams){
        queryParams = '&';
        for (let key in pagination.queryParams) {
            if (pagination.queryParams.hasOwnProperty(key) && key !== 'page') {
                queryParams += key+"="+pagination.queryParams[key]+"&";
            }
        }
        let lastQuery = queryParams.substring(queryParams.length-1);
        if(lastQuery === "&"){
            queryParams = queryParams.substring(0,queryParams.length-1);
        }
    }

    let template = '<div class="' + paginationClass + '">';

    let i = 0;
    let leftCount = Math.ceil(limit / 2) - 1;
    let rightCount = limit - leftCount - 1;
    if (page + rightCount > pageCount) {
        leftCount = limit - (pageCount - page) - 1;
    }
    if (page - leftCount < 1) {
        leftCount = page - 1;
    }
    let start = page - leftCount;
    while (i < limit && i < pageCount) {
        n = start;
        if (i < page) {
            template = template + '<a class="page-true" href="?page=' + n + queryParams + '">' + n + '</a>';
        } else {
            template = template + '<a class="page" href="?page=' + n + queryParams + '">' + n + '</a>';
        }
        start++;
        i++;
    }

    template = template + '</div>';
    return template;
};