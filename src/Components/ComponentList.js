import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { getUserRoles, getUserToken } from "../UserData/tokenStorage";

const API_URL = "https://localhost:44335/api/components";

const ComponentList = () => {
  const [componentList, setComponents] = useState([]);
  const [reload, setReload] = useState(false);
  const history = useHistory();
  const dictionary = ["CPU", "GPU", "Memory", "Motherboard"];

  useEffect(() => {
    async function fetchData() {
      await axios.get(API_URL).then((response) => {
        setComponents(response.data);
      });
    }
    fetchData();
  }, [reload]);

  const TableHeader = () => {
    return (
      <thead>
        <tr>
          <td>Component name</td>
          <td>Category</td>
          <td>Action</td>
        </tr>
      </thead>
    );
  };

  const TableRow = () => {
    return (
      <tbody>
        {componentList.map((component) => {
          const row = (
            <tr key={component.id}>
              <td>{component.name}</td>
              <td>{dictionary[component.category]}</td>
              <td>
                <TableAction id={component.id} />
              </td>
            </tr>
          );
          return row;
        })}
      </tbody>
    );
  };

  const TableAction = (props) => {
    const deleteComponent = async () => {
      await axios.delete(API_URL + "/" + props.id).then(() => setReload(true));
    };
    setReload(false);
    return (
      <div className="btn-group">
        <div className="col-5">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => history.push("/component/" + props.id)}
          >
            Details
          </button>
        </div>
        {getUserToken() != null
          ? getUserRoles().includes("Admin") && (
              <Fragment>
                <div className="col-5">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => history.push("/EditComponent/" + props.id)}
                  >
                    Edit
                  </button>
                </div>
                <div className="col-5">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={deleteComponent}
                  >
                    Delete
                  </button>
                </div>
              </Fragment>
            )
          : ""}
      </div>
    );
  };
  return (
    <div>
      <h2 className="text-white mb-4">All components</h2>
      <table className="table table-dark table-striped">
        <TableHeader />
        <TableRow components={componentList} />
      </table>
    </div>
  );
};

export default ComponentList;
