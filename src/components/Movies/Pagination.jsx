import { useState, useEffect } from "react";
import nextPage from "../../assets/next-page.svg";

const Pagination = ({ pageNumber, radius, pageLength, onClick }) => {
  const pagesArr = [...Array(pageLength)].map((_, i) => i + 1);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setActivePage(1);
  }, [pageNumber]);

  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <nav className="w-[327px] md:w-full md:mt-6">
      <ul className=" flex justify-center">
        {pagesArr.map((page) => (
          <div
            key={page}
            type="button"
            className={`rounded-${radius} px-[15px] py-[8px] me-5 ${
              page === activePage
                ? "bg-blue text-white shadow-xl"
                : "bg-light-grey text-dark-grey"
            }`}
            onClick={() => {
              handlePageClick(page);
              onClick(page);
            }}
          >
            {page}
          </div>
        ))}
        <img
          src={nextPage}
          alt="next page"
          className={`${pageLength < 2 ? "hidden" : "flex"}`}
          onClick={() => {
            const nextPageNumber =
              pageLength >= pageNumber ? pageNumber + 1 : pageNumber;
            handlePageClick(nextPageNumber);
            onClick(pageNumber + 1);
          }}
        />
      </ul>
    </nav>
  );
};

export default Pagination;
