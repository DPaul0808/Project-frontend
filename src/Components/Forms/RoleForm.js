import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const API_URL = "https://localhost:44335/api/roles";

const RoleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const history = useHistory();
  const params = useParams();

  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    async function fetchData() {
      await axios.get(API_URL + "/" + params.id).then((response) => {
        console.log(response.data);
        setRoleName(response.data.name);
      });
    }
    if (location.pathname != "/addRole") {
      fetchData();
    }
  }, []);

  const saveData = async (data) => {
    if (location.pathname == "/addRole") {
      await axios.post(API_URL, data).then((response) => {
        if (response.status == 200) {
          history.push("/roles");
        }
      });
    } else {
      await axios.put(API_URL + "/" + params.id, data).then((response) => {
        if (response.status == 200) {
          history.push("/roles");
        }
      });
    }
  };
  return (
    <Fragment>
      <form
        className="form-control bg-secondary"
        onSubmit={handleSubmit(saveData)}
      >
        <input
          type="text"
          className="form-control"
          {...register("Name", { required: true })}
          placeholder="Enter role name"
          defaultValue={location.pathname == "/addRole" ? "" : roleName}
        />
        {errors.title && (
          <span className="text-danger">Role name is required</span>
        )}
        <button type="submit" className="btn btn-succes">
          Submit
        </button>
      </form>
    </Fragment>
  );
};

export default RoleForm;
