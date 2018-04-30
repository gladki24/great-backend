"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createBrandQuery(brand) {
    return `SELECT * FROM product WHERE brand = "${brand}"`;
}
exports.createBrandQuery = createBrandQuery;
function createCategoryQuery(category) {
    return `SELECT * FROM product WHERE category = "${category}" LIMIT 10`;
}
exports.createCategoryQuery = createCategoryQuery;
//# sourceMappingURL=util.js.map