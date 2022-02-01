import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = "https://localhost:44335/api/roles";

const RoleManager = () => {
  const [usersInRole, setUsersInRole] = useState([]);
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState("");
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      await axios.get(API_URL + "/" + params.id).then((response) => {
        setUsersInRole(response.data);
      });
      await axios.get(API_URL + "/notinrole/" + params.id).then((response) => {
        setUsers(response.data);
      });
    }
    fetchData();
  }, [reload]);

  const TableActionAdd = (props) => {
    const data = { userId: props.userId, roleId: params.id };
    const addUserToRole = async () => {
      await axios.post(API_URL + "/addUser", data).then((response) => {
        if (response.status == 200) {
          setReload(true);
        }
      });
    };
    return <button className="btn btn-success" onClick={addUserToRole}>Add role</button>;
  };
  const TableActionDelete = (props) => {
    const removeUserFromRole = async () => {
      await axios
        .delete(API_URL + "/removeUser", {
          data: { userId: props.userId, roleId: params.id },
        })
        .then((response) => {
          if (response.status == 200) {
            setReload(true);
          }
        });
    };
    return <button className="btn btn-danger" onClick={removeUserFromRole}>Remove role</button>;
  };

  const TableHeader1 = () => {
    return (
      <thead>
        <tr>
          <td>Users in role</td>
          <td>Action</td>
        </tr>
      </thead>
    );
  };
  const TableHeader2 = () => {
    return (
      <thead>
        <tr>
            <td>Users not in role</td>
            <td>Action</td>
        </tr>
      </thead>
    );
  };

  const TableRowRole = () => {
    setReload(false);
    return (
      <tbody>
        {usersInRole.map((user) => {
          const row = (
            <tr key={user.id}>
              <td>{user.userName}</td>
              <td>
                <TableActionDelete userId={user.id} />
              </td>
            </tr>
          );
          return row;
        })}
      </tbody>
    );
  };
  const TableRowNotRole = () => {
    return (
      <tbody>
        {users.map((user) => {
          const row = (
            <tr key={user.id}>
              <td>{user.userName}</td>
              <td>
                <TableActionAdd userId={user.id} />
              </td>
            </tr>
          );
          return row;
        })}
      </tbody>
    );
  };

  return (
    <div>
      <table className="table table-dark table-striped">
        <TableHeader1 />
        <TableRowRole />
        <br />
        <TableHeader2 />
        <TableRowNotRole />
      </table>
    </div>
  );
};

export default RoleManager;
