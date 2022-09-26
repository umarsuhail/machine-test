import { usePagination, useTable } from "react-table";
import Modal from "./Modal";
import "./table.css";

const Table = ({
  columns,
  data,
  pageSize,
  pageIndex,
  nextPage,
  previousPage,
  openModal,
  handleCloseModal,
  handleData,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    gotoPage,
    pageCount,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );
  const handleSubmit = (e, type, data) => {
    e.preventDefault();
    handleData(data, type);
  };
  const { open, task } = openModal;
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()}>Previous</button>{" "}
        <button onClick={() => nextPage()}>Next</button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex} of {pageSize}
          </strong>{" "}
        </span>
      </div>
      <Modal
        handleClose={handleCloseModal}
        isOpen={open}
        task={task}
        handleSubmit={handleSubmit}
      ></Modal>
    </>
  );
};
export default Table;
