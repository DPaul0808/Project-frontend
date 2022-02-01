import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams, useHistory } from "react-router-dom";

const API_URL = "https://localhost:44335/api/";

const RequirementForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const history = useHistory();
  const params = useParams();

  const [valueType, setValueType] = useState(["Text", "Number", "yesOrNo"]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios.get(API_URL + "games").then((response) => {
        setGames(response.data);
      });
    }
    fetchData();
  }, []);

  const saveData = async (data) => {
    if (location.pathname == "/AddRequirement") {
      console.log("Data: ", data);
      await axios.post(API_URL + "features", data).then((response) => {
        console.log(response.status)
        if (response.status == 201) {
          history.push("/games");
        }
      });
    } else {
      console.log("Data: ", data);
      await axios
        .put(API_URL + "features/" + params.id, data)
        .then((response) => {
          console.log(response.status)
          if (response.status == 200) {
            history.push("/games");
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
            {location.pathname == "/AddRequirement"
              ? "Add Requirement"
              : "Edit Requirement"}
          </h3>
          <div className="col-5 my-4">
            <input
              type="text"
              className="form-control"
              {...register("name", { required: true })}
              placeholder="Enter requirement name"
            />
            {errors.title && (
              <span className="text-danger">Requirement name is required</span>
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
              <span className="text-danger">Requirement value is required</span>
            )}
          </div>
          <div className="col-5 mb-4">
            <select
              className="form-select"
              {...register("gameId", { required: true })}
            >
              {games.map((game) => {
                const option = (
                  <option key={game.id} value={game.id}>
                    {game.name}
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

export default RequirementForm;
