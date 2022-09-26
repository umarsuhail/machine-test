import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "./apiHelper";
import "./App.css";
import Table from "./components/Table";

function App() {
  const [data, setData] = useState([]);
  const [page, setpage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modalStatus, setModalStatus] = useState({
    task: "update",
    selectedModal: {},
    open: false,
  });
  const fetchData = () => {
    axios
      .get(`${apiUrl}/users?page=${page}&per_page=${count}`)
      .then((response) => {
        setData(response.data.data);
        setTotalPages(response.data.total_pages);
      });
  };
  const count = 10;
  useEffect(() => {
    fetchData();
  }, [page]);

  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        accessor: "last_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Action",
        accessor: "",
        Cell: (props) => {
          return (
            <button
              className="btn btn-primary"
              onClick={(e) => handleUpdate(e, props)}
            >
              Update
            </button>
          );
        },
      },
    ],
    []
  );

  const handleUpdate = (e, props) => {
    e.preventDefault();
    setModalStatus((modalStatus) => ({
      task: "update",
      selectedModal: props.row.original,
      open: !modalStatus.openModal,
    }));
  };
  const nextPage = () => {
    if (totalPages > page) setpage(page + 1);
  };
  const previousPage = () => {
    if (page > 1) setpage(page - 1);
  };
  const handleClose = () => {
    setModalStatus({
      task: "Update",
      selectedModal: "",
      open: false,
    });
  };
  const handleSubmit = (data, type) => {
    console.log(modalStatus);
    const method = type === "update" ? "put" : "post";
    axios({
      method: method,
      url: `${apiUrl}/users${
        `/` + method === "put" ? modalStatus.selectedModal.id : ""
      }`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        setModalStatus({
          task: "Update",
          selectedModal: "",
          open: false,
        });
        fetchData();
        console.log(response);
      })
      .catch(function (response) {
        alert("Error!");
      });
  };
  const handleCreate = (e) => {
    e.preventDefault();
    setModalStatus({
      task: "create",
      selectedModal: {},
      open: true,
    });
  };
  return (
    <div className="App">
      <button className="btn" onClick={(e) => handleCreate(e)}>
        Create User
      </button>

      {data.length && (
        <Table
          pageIndex={page}
          columns={columns}
          data={data}
          pageSize={totalPages}
          nextPage={nextPage}
          previousPage={previousPage}
          openModal={modalStatus}
          handleCloseModal={handleClose}
          handleData={handleSubmit}
        />
      )}
    </div>
  );
}

export default App;
