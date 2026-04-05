import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  setPage: (page: number) => void;
  page: number;
}

export default function Pagination({
  totalPages,
  setPage,
  page,
}: PaginationProps) {
  return (
    <div>
        <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
            nextLabel="→"
            previousLabel="←"
            />
    </div>
    
  );
}
