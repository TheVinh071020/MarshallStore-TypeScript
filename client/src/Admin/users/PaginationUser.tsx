import React from "react";

interface IProps {
  total: number;
  pageNumber: number;
  pageIndex: number;
  setPageIndex: (pageIndex: number) => void;
  setPageNumber: (pageNumber: number) => void;
}
const PaginationUser = ({
  total,
  pageNumber,
  pageIndex,
  setPageIndex,
  setPageNumber,
}: IProps) => {
  const totalPages = Math.ceil(total / pageNumber);

  const goToPage = (page: number) => {
    setPageIndex(page);
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  return (
    <div className="mt-4">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              aria-label="Previous"
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          {pageNumbers.map((page) => (
            <li key={page} className="page-item">
              <button
                className={`page-link ${page === pageIndex ? "active" : ""}`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            </li>
          ))}

          <li className="page-item">
            <a
              className="page-link"
              href="#"
              aria-label="Next"
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationUser;
