/**
 * @description
 * paginate function that outputs,
 * * What are the pages to display per view.
 * * what are items to display for given current page.
 * @param {*} totalItems
 * @param {number} [currentPage=1]
 * @param {number} [itemsPerPage=10]
 * @param {number} [pagesPerView=10]
 * @return {object}
 */
export default function paginate(
  totalItems,
  currentPage = 1,
  itemsPerPage = 10,
  pagesPerView = 10
) {
  // calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // calculate start and end page numbers
  let startPageNumber, endPageNumber;
  if (totalPages <= pagesPerView) {
    startPageNumber = 1;
    endPageNumber = totalPages;
  } else {
    startPageNumber = currentPage - Math.floor(pagesPerView / 2);
    if (startPageNumber < 1) {
      startPageNumber = 1;
    }
    endPageNumber = startPageNumber + pagesPerView - 1;
    if (endPageNumber > totalPages) {
      endPageNumber = totalPages;
      startPageNumber = endPageNumber - pagesPerView + 1;
    }
  }
  // calculate start and end index of items of the current page
  const startItemIndex = (currentPage - 1) * itemsPerPage;
  const endItemIndex = Math.min(
    startItemIndex + itemsPerPage - 1,
    totalItems - 1
  );
  // fill page numbers in pages Array
  const pages = [];
  for (let i = startPageNumber; i <= endPageNumber; i++) {
    pages.push(i);
  }
  // fill items in pages Array
  const items = [];
  for (let i = startItemIndex; i <= endItemIndex; i++) {
    items.push(i);
  }
  return {
    totalPages,
    startPageNumber,
    endPageNumber,
    startItemIndex,
    endItemIndex,
    currentPage,
    pages,
    items,
  };
}
