import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const API_URL = "https://localhost:44335/api/roles";

const RolesList = () => {
  const [roles, setRoles] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      await axios.get(API_URL).then((response) => {
        setRoles(response.data);
      });
    }
    fetchData();
  }, []);

  const TableHeader = () => {
    return (
      <thead>
        <tr>
          <td>Roles</td>
          <td>Actions</td>
        </tr>
      </thead>
    );
  };

  const TableActions = (props) => {
    const deleteRole = async () => {
      await axios.delete(API_URL + "/" + props.id);
    };
    return (
      <div className="btn-group">
        <div className="col-5">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => history.push("/role/" + props.id)}
            >
            Manage
          </button>
        </div>
        <div className="col-5">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => history.push("/EditRole/" + props.id)}
            >
            Edit
          </button>
        </div>
        <div className="col-5">
          <button type="button" className="btn btn-danger" onClick={deleteRole}>
            Delete
          </button>
        </div>
      </div>
    );
  };

  const TableRow = () => {
    return (
      <tbody>
        {roles.map((role) => {
          const row = (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>
                <TableActions roleName={role.name} id={role.id} />
              </td>
            </tr>
          );
          return row;
        })}
      </tbody>
    );
  };

  return (
    <table className="table table-dark table-striped">
      <TableHeader />
      <TableRow />
      <button
        className="btn btn-secondary mt-2"
        onClick={() => history.push("/addRole")}
      >
        AddRole
      </button>
    </table>
  );
};

export default RolesList;
