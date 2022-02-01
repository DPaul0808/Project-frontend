import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams, useHistory } from "react-router-dom";

const API_URL = "https://localhost:44335/api/";

const FeatureForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [components, setComponents] = useState([]);

  const location = useLocation();
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      await axios.get(API_URL + "components").then((response) => {
        setComponents(response.data);
      });
    }
    fetchData();
  }, []);

  const saveData = async (data) => {
    if (location.pathname == "/AddFeature") {
      console.log("Data: ", data);
      await axios.post(API_URL + "features", data).then((response) => {
        console.log(response.status);
        if (response.status == 201) {
          history.push("/Hardware");
        }
      });
    } else {
      console.log("Data: ", data);
      await axios
        .put(API_URL + "features/" + params.id, data)
        .then((response) => {
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
          <h3 className="text-white mt-2">
            {
              (location.pathname == "/AddFeature"
                ? "Add Feature"
                : "Edit feature")
            }
          </h3>
          <div className="col-5 my-4">
            <input
              type="text"
              className="form-control"
              {...register("name", { required: true })}
              placeholder="Enter feature name"
            />
            {errors.title && (
              <span className="text-danger">Feature name is required</span>
            )}
          </div>
          <div className="col-5 mb-4">
            <input
              type="text"
              className="form-control"
              {...register("value", { required: true })}
              placeholder="Enter value"
            />
            {errors.title && (
              <span className="text-danger">Feature value is required</span>
            )}
          </div>
          <div className="col-5 mb-4">
            <select
              className="form-select"
              {...register("componentId", { required: true })}
            >
              {components.map((component) => {
                const option = (
                  <option key={component.id} value={component.id}>
                    {component.name}
                  </option>
                );
                return option;
              })}
            </select>
          </div>

          <button type="submit" className="btn btn-dark mb-3">
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default FeatureForm;
