import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

const API_URL = "https://localhost:44335/api/components";

const ComponentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [category, setCategory] = useState([
    "CPU",
    "GPU",
    "Memory",
    "Motherboard",
    "Other",
  ]);

  const [componentName, setComponentName] = useState("");

  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      await axios.get(API_URL + "/" + params.id).then((response) => {
        console.log(response.data.name);
        setComponentName(response.data.name);
      });
    }
    if (location.pathname != "/AddComponents") {
      fetchData();
    }
  }, []);

  const saveData = async (data) => {
    console.log("Data: ", data);
    if (location.pathname == "/AddComponents") {
      await axios.post(API_URL, data).then((response) => {
        if (response.status == 201) {
          history.push("/Hardware");
        }
      });
    } else {
      await axios.put(API_URL + "/" + params.id, data).then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          history.push("/Hardware");
        }
      });
    }
  };
  return (
    <Fragment>
      <div className="mx-5">
        <form
          className="form-control bg-secondary border-0"
          onSubmit={handleSubmit(saveData)}
        >
          <h3 className="text-white mt-2">New component</h3>
          <div className="col-4 my-4">
            <input
              type="text"
              className="form-control"
              {...register("Name", { required: true })}
              placeholder="Enter component name"
              defaultValue={
                location.pathname == "/AddComponents" ? "" : componentName
              }
            />
            {errors.title && (
              <span className="text-danger">Component name is required</span>
            )}
          </div>
          <div className="col-4 mb-2">
            <select
              className="form-select"
              {...register("Category", { required: true })}
            >
              <option value="" disabled selected>
                Enter component category
              </option>
              {category.map((category) => {
                const option = <option key={category.id}>{category}</option>;

                return option;
              })}
            </select>
            {errors.title && (
              <span className="text-danger">Category is required</span>
            )}
          </div>
          <button type="submit" className="btn btn-dark my-3">
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default ComponentForm;
