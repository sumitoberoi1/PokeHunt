import React from "react";

const Pagination = props => {
  const { page, prevButtonTapped, nextButtonTapped, numberOfPages } = props;
  return (
    <div className="container">
      <ul className="pagination mt-5 justify-content-center">
        {page !== 0 && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={prevButtonTapped}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>
        )}
        <li className="page-item">
          <span className="page-link">{`${page} of ${numberOfPages}`}</span>
        </li>
        <li className="page-item">
          {page < numberOfPages && (
            <button
              className="page-link"
              onClick={nextButtonTapped}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
