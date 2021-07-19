import React, { useEffect } from "react";
import styles from "./Paginate.module.css";
import {
  IoChevronBack as PrevIcon,
  IoChevronForward as NextIcon,
} from "react-icons/io5";
import {
  BiFirstPage as StartIcon,
  BiLastPage as EndIcon,
} from "react-icons/bi";

export default function Paginate(props) {
  const [paginateProps, setPaginateProps] = React.useState({});

  /*
   *  Fetches paginateProps using `Paginate` function and
   *  updates the state of paginateProps, when component mounts.
   */
  useEffect(() => {
    const { totalItems } = props;
    const data = paginate(totalItems);
    props.onPageChange(data.startItemIndex, data.endItemIndex);
    setPaginateProps(data);
  }, []);

  /**
   * @description calls the paginate function and updates the paginateProps state and
   * calls the onPageChange function with the new paginateProps state.
   * @param {string} source source of the page change.
   */
  const onPageChangeHandler = (source) => {
    let { totalPages, currentPage } = paginateProps;
    switch (source) {
      case "END":
        currentPage = totalPages;
        break;
      case "START":
        currentPage = 1;
        break;
      case "NEXT":
        currentPage += 1;
        break;
      case "PREV":
        currentPage -= 1;
        break;
      default:
        currentPage = source;
    }
    const data = paginate(props.totalItems, currentPage, 10);
    props.onPageChange(data.startItemIndex, data.endItemIndex);
    setPaginateProps(data);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "2rem auto",
        }}
      >
        <div style={{ display: "flex" }}>
          <button
            className={styles.controlBtn}
            onClick={() => onPageChangeHandler("START")}
            disabled={paginateProps.currentPage === 1}
          >
            <StartIcon />
          </button>
          <button
            className={styles.controlBtn}
            onClick={() => onPageChangeHandler("PREV")}
            disabled={paginateProps.currentPage === 1}
          >
            <PrevIcon />
          </button>
        </div>
        {paginateProps.pages?.map((val) => (
          <button
            className={styles.pageBtn}
            key={val}
            onClick={() =>
              paginateProps.currentPage !== val && onPageChangeHandler(val)
            }
            disabled={paginateProps.currentPage === val}
            style={
              paginateProps.currentPage === val
                ? { backgroundColor: "#2196f3", color: "white" }
                : { backgroundColor: "#fff", color: "#2196f3" }
            }
          >
            {val}
          </button>
        ))}
        <div style={{ display: "flex" }}>
          <button
            className={styles.controlBtn}
            onClick={() => onPageChangeHandler("NEXT")}
            disabled={paginateProps.currentPage === paginateProps.endPageNumber}
          >
            <NextIcon />
          </button>
          <button
            className={styles.controlBtn}
            onClick={() => onPageChangeHandler("END")}
            disabled={paginateProps.currentPage === paginateProps.totalPages}
          >
            <EndIcon />
          </button>
        </div>
      </div>
    </>
  );
}

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
const paginate = (
  totalItems,
  currentPage = 1,
  itemsPerPage = 10,
  pagesPerView = 10
) => {
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
};
