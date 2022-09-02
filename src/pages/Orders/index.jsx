import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import all_orders from "../../constants/orders";
import { calculateRange, sliceData } from "../../utils/table-pagination";

import "../styles.css";
import DoneIcon from "../../assets/icons/done.svg";
import CancelIcon from "../../assets/icons/cancel.svg";
import axios from "axios";
import { Icon } from "@iconify/react";
import id from "date-fns/esm/locale/id/index.js";
function Orders() {
  const [list2, setnamelist] = React.useState([{}]);
  const url =
    "https://pkdservers.com/LeaveTracker/api/LeaveRequests/GetMyLeaves";

  React.useEffect(() => {
    const Token = localStorage.getItem("token");
    console.log(Token);

    const getdata = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: "Bearer" + " " + Token,
          },
        });
        console.log(JSON.stringify(response.data));
        setnamelist(response.data);
        console.log(list2);
      } catch (error) {
        console.log(error);
      }
    };
    getdata();
  }, []);

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState(list2);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);

  const handleDelete = async (Id, e) => {
    const Token = localStorage.getItem("token");
    console.log(Token);
    try {
      const response = await axios.get(
        "https://pkdservers.com/LeaveTracker/api/LeaveRequests/DeleteLeaveRequest?ID=" +
          " " +
          Id,
        {
          headers: {
            Authorization: "Bearer" + " " + Token,
          },
        }
      );
      // console.log(JSON.stringify(response.data));
      // setnamelist(response.data);
      // console.log(list2);
    } catch (error) {
      console.log(error);
    }

    const getdata = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: "Bearer" + " " + Token,
          },
        });
        console.log(JSON.stringify(response.data));
        setnamelist(response.data);
        console.log(list2);
      } catch (error) {
        console.log(error);
      }
    };
    getdata();
    setShow(false);
  };
  useEffect(() => {
    setPagination(calculateRange(all_orders, 5));
    setOrders(sliceData(all_orders, page, 5));
  }, []);

  // Search
  // const __handleSearch = (event) => {
  //   setSearch(event.target.value);
  //   if (event.target.value !== "") {
  //     let search_results = orders.filter(
  //       (item) =>
  //         item.first_name.toLowerCase().includes(search.toLowerCase()) ||
  //         item.last_name.toLowerCase().includes(search.toLowerCase()) ||
  //         item.product.toLowerCase().includes(search.toLowerCase())
  //     );
  //     setOrders(search_results);
  //   } else {
  //     __handleChangePage(1);
  //   }
  // };

  // Change Page
  const __handleChangePage = (new_page) => {
    setPage(new_page);
    setOrders(sliceData(all_orders, new_page, 5));
  };

  return (
    <>
      <div className="dashboard-content">
        <div className="dashboard-content-container">
          <div className="dashboard-content-header">
            <h2>My Leaves</h2>
          </div>

          <table>
            <thead>
              <th>ID</th>
              <th>Name</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Days</th>
              <th>Status</th>
            </thead>

            {orders.length !== 0 ? (
              <tbody>
                {list2.map((order, index) => (
                  <tr key={index}>
                    <td>
                      <span>{order.ID}</span>
                    </td>
                    <td>
                      <span>{order.name}</span>
                    </td>
                    <td>
                      <div>
                        <span>{order.from}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <span>{order.to}</span>
                      </div>
                    </td>
                    <td>
                      <span>{order.reason}</span>
                    </td>
                    <td>
                      <span>{order.days}</span>
                    </td>
                    <td>
                      {" "}
                      <div>
                        {order.Status === "Accepted" ? (
                          <img
                            src={DoneIcon}
                            alt="paid-icon"
                            className="dashboard-content-icon"
                          />
                        ) : order.Status === "Rejected" ? (
                          <img
                            src={CancelIcon}
                            alt="canceled-icon"
                            className="dashboard-content-icon"
                          />
                        ) : order.Status === "Applied" ? (
                          <>
                            <Icon
                              onClick={handleShow}
                              className="dashboard-content-icon  pointer"
                              icon="fluent:delete-dismiss-24-filled"
                            />
                            <Modal show={show} onHide={handleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>Delete</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                Are you Sure you want to delete the record
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={handleClose}
                                >
                                  Close
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={(e) => handleDelete(order.ID, e)}
                                >
                                  Delete
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </>
                        ) : null}
                        <span>{order.Status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : null}
          </table>
        </div>
      </div>
    </>
  );
}

export default Orders;
