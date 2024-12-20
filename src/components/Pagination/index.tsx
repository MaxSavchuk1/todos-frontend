import clsx from "clsx";
import { memo } from "react";
import styles from "./styles.module.css";

type Props = {
  offset: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
};

function Pagination({
  offset,
  total,
  pageSize,
  onPageChange,
  className = "",
}: Props) {
  const currentPage = Math.floor(offset / pageSize) + 1;
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages === 1) return null;

  const getPageNumbers = () => {
    const totalNumbers = Math.min(pageSize, totalPages);
    const currentPageIndex = currentPage - 1;

    let startPage = Math.max(
      0,
      currentPageIndex - Math.floor(totalNumbers / 2)
    );
    let endPage = Math.min(totalPages - 1, startPage + totalNumbers - 1);

    startPage = Math.max(0, endPage - totalNumbers + 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i + 1
    );
  };

  const handlePageChange = (page: number) => {
    const newOffset = (page - 1) * pageSize;
    onPageChange(newOffset);
  };

  return (
    <div className={clsx(styles.paginationContainer, className)}>
      <button
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={clsx(
          styles.baseButton,
          styles.commonButtonColor,
          styles.disabledButton
        )}
      >
        Previous
      </button>

      {currentPage > Math.floor(pageSize / 2) + 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className={clsx(styles.baseButton, styles.commonButtonColor)}
          >
            1
          </button>
          {currentPage > Math.floor(pageSize / 2) + 2 && (
            <span className="px-3 py-1">...</span>
          )}
        </>
      )}

      {getPageNumbers().map((number) => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={clsx(
            styles.baseButton,
            currentPage === number
              ? styles.activeButtonColor
              : styles.commonButtonColor
          )}
        >
          {number}
        </button>
      ))}

      {currentPage < totalPages - Math.floor(pageSize / 2) && (
        <>
          {currentPage < totalPages - Math.floor(pageSize / 2) - 1 && (
            <span className="px-3 py-1">...</span>
          )}
          <button
            onClick={() => handlePageChange(totalPages)}
            className={clsx(styles.baseButton, styles.commonButtonColor)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={clsx(
          styles.baseButton,
          styles.commonButtonColor,
          styles.disabledButton
        )}
      >
        Next
      </button>
    </div>
  );
}

export default memo(Pagination);
