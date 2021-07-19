# Admin-UI

Frontend for Admin Dashboard

## Tech Stack

React (Built with create-react-app), Module CSS

## Demo

https://twentyonedot-adminui.netlify.app/

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

The Server will starts on `port:3000` by default.

```bash
    http://localhost:3000
```

## Screenshots

1. ![App Screenshot](https://i.postimg.cc/qvb7vjD9/Clean-Shot-2021-07-19-at-15-30-42-2x.png)

2. ![App Screenshot](https://i.postimg.cc/G2jVbSqD/Clean-Shot-2021-07-19-at-15-32-57-2x.png)

## Features

- Edit single or multiple fields.
- Delete single, mulitple or all users in a page.
- Pagination with extra controls
- Search feature.

## Optimizations

- Debouncing technique to improve the **search** feature

## Appendix

```javascript
function paginate(
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
```
