export function createBrandQuery(brand: string): string {
    return `SELECT * FROM product WHERE brand = "${brand}"`;
}

export function createCategoryQuery(category: number): string {
    return `SELECT * FROM product WHERE category = "${category}" LIMIT 10`;
}
