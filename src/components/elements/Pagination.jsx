import { useState, useEffect } from "react";
import nextPage from "../../assets/next-page.svg";

const Pagination = ({
  radius,
  pageLength,
  pageNumber,
  activeGenre,
  setPageNumber,
  handleClick,
}) => {
  const [activePage, setActivePage] = useState(1);

  // Create Array of Number for Pages
  const pagesArr = [...Array(pageLength)].map((_, i) => i + 1);
  const pages =
    pageLength <= 4
      ? pagesArr
      : pageNumber > 4
      ? pageArrMaker(pageNumber)
      : [1, 2, 3, 4];

  function pageArrMaker(n) {
    const pagesArr = [];
    for (let i = n - 3; i <= n; i++) {
      if (i > 0) {
        pagesArr.push(i);
      }
    }
    return pagesArr;
  }

  // Set Active Page to First Page
  useEffect(() => {
    setActivePage(1);
  }, [pageLength, activeGenre]);

  return (
    <nav className="flex">
      <ul className="relative flex justify-center">
        {/* Previous Page */}
        <img
          src={nextPage}
          alt="next page"
          className={`${
            pageLength < 2 || pageNumber === 1
              ? "hidden"
              : "absolute left-[-50px] md:left-[-60px] rotate-180"
          }`}
          onClick={() => {
            const prevPageNumber = pageNumber > 1 ? pageNumber - 1 : pageNumber;
            setActivePage(prevPageNumber);
            setPageNumber(pageNumber - 1);
            handleClick(pageNumber - 1);
          }}
        />

        {/* Pages */}
        {pages.map((page) => (
          <div
            key={page}
            type="button"
            className={`rounded-${radius} px-[15px] py-[8px] me-2 md:me-5 ${
              page === activePage
                ? "bg-blue text-white shadow-xl"
                : "bg-light-grey text-dark-grey"
            }`}
            onClick={() => {
              setActivePage(page);
              setPageNumber(page);
              handleClick(page);
            }}
          >
            {page}
          </div>
        ))}

        {/* Next Page */}
        <img
          src={nextPage}
          alt="next page"
          className={`${
            pageLength < 2 || pageNumber === pageLength
              ? "hidden"
              : "absolute right-[-40px]"
          }`}
          onClick={() => {
            const nextPageNumber =
              pageNumber < pageLength ? pageNumber + 1 : pageNumber;
            setActivePage(nextPageNumber);
            setPageNumber(pageNumber + 1);
            handleClick(pageNumber + 1);
          }}
        />
      </ul>
    </nav>
  );
};

export default Pagination;
