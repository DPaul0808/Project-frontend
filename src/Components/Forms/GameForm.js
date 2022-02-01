import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

const API_URL = "https://localhost:44335/api/games";

const GameForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [gameName, setGameName] = useState("");

  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      await axios.get(API_URL + "/" + params.id).then((response) => {
        console.log(response.data.name);
        setGameName(response.data.name);
      });
    }
    if (location.pathname != "/AddGame") {
      fetchData();
    }
  }, []);

  const saveData = async (data) => {
    console.log("Data: ", data);
    if (location.pathname == "/AddGame") {
      await axios.post(API_URL, data).then((response) => {
        if (response.status == 201) {
          history.push("/Games");
        }
      });
    } else {
      await axios.put(API_URL + "/" + params.id, data).then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          history.push("/Games");
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
            {location.pathname == "/AddGames" ? "New game" : "Edit game"}
          </h3>
          <div className="col-4 my-4">
            <input
              type="text"
              className="form-control"
              {...register("Name", { required: true })}
              placeholder="Enter game name"
              defaultValue={location.pathname == "/AddGames" ? "" : gameName}
            />
            {errors.title && (
              <span className="text-danger">Game name is required</span>
            )}
          </div>
          <div className="col-6 mb-2">
            <textarea
              className="form-control"
              {...register("Description", { required: true })}
              placeholder="Enter description"
              rows="5"
              defaultValue={location.pathname == "/AddGame" ? "" : gameName}
            />
            {errors.title && (
              <span className="text-danger">Descriiption is required</span>
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

export default GameForm;
