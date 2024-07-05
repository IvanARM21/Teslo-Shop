
// [1,2,3,4,5,"...",50];
export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
    // If the number total of pages is seven or minus
    // Let's show all pages without ellipses

    if(totalPages <= 7) {
        return Array.from({length: totalPages}, (_, i) => i + 1);
    }

    // If the current page is within the first 3 pages
    // Show first three pages, ellipses, last two pages
    if(currentPage <= 3) {
        return [1,2,3, '...', totalPages -1, totalPages];
    }

    // If the current page is within the last 3 pages 
    // Show first two pages, ellipses, last three pages
    if(currentPage >= totalPages - 2) {
        return [1,2, '...', totalPages -2, totalPages -1, totalPages];
    }

    // If the current page is in the center of the pagination
    // Show the first page, ellipses, current page and neighbor
    return [
        1,
        '...',
        currentPage-1,
        currentPage,
        currentPage+1,
        '...',
        totalPages
    ]
}