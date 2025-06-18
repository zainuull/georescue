import { formatNumber } from '@/core/services/convert';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';

const PaginationMui = ({ pageNow, totalData, perPage, setPage }) => {
  const totalPage = Math.ceil(totalData / perPage);

  // Function to change the current page
  const changeCurrentPage = (id) => {
    setPage(id);
  };

  const handleBack = () => {
    if (pageNow > 1) {
      setPage(pageNow - 1);
    }
  };

  const handleNext = () => {
    if (pageNow < totalPage) {
      setPage(pageNow + 1);
    }
  };

  // Determine the range of pages to display
  const visiblePages = 5;
  let startPage = Math.max(1, pageNow - Math.floor(visiblePages / 2));
  let endPage = Math.min(totalPage, startPage + visiblePages - 1);

  if (endPage - startPage + 1 < visiblePages) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  return (
    <div className="d-flex gap-2 align-items-center mb-2 mt-1 justify-content-between text-white">
      <span className="fw-bold ms-2">Total Data: {formatNumber(totalData)}</span>
      <div className="d-flex align-items-center position-relative">
        {/* First Page Button */}
        {pageNow > 1 && (
          <span
            onClick={() => setPage(1)}
            className="p-2 cursor-pointer text-sm border border-secondary border-opacity-10 text-gray-600">
            <MdOutlineKeyboardDoubleArrowLeft size={16} />
          </span>
        )}

        {/* Previous Page Button */}
        {pageNow > 1 && (
          <span
            onClick={handleBack}
            className="p-2 cursor-pointer text-sm border border-secondary text-white border-opacity-10 text-gray-600">
            <MdKeyboardArrowLeft size={16} />
          </span>
        )}

        {/* Page Numbers */}
        {pages.map((page) => (
          <span
            key={page}
            onClick={() => changeCurrentPage(page)}
            className={`text-center cursor-pointer text-sm border text-white-50 ${
              page === pageNow 
                ? 'border-secondary border-opacity-25'
                : 'border-secondary border-opacity-10'
            }`}
            style={{
              padding: '.52rem .56rem',
              minWidth: '2.1rem',
              color : '#000',
            }}>
            {page}
          </span>
        ))}

        {/* Next Page Button */}
        {pageNow < totalPage && (
          <span
            onClick={handleNext}
            className={`p-2 cursor-pointer text-sm border border-secondary text-white ${
           'border-opacity-10'
            } text-gray-600`}>
            <MdKeyboardArrowRight size={16} />
          </span>
        )}

        {/* Last Page Button */}
        {pageNow < totalPage && (
          <span
            onClick={() => setPage(totalPage)}
            className={`p-2 cursor-pointer text-sm border border-secondary text-white ${
           'border-opacity-10'
            } text-gray-600`}>
            <MdOutlineKeyboardDoubleArrowRight size={16} />
          </span>
        )}
      </div>
    </div>
  );
};

export default PaginationMui;
