export const createPageAdapter = (resultPage) => {
  return {
    page: resultPage.page,
    totalPages: resultPage.total_pages,
    totalResults: resultPage.total_results,
  };
};
