import React, { Fragment, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useForm } from "react-hook-form";

//@ts-ignore
import jwt_decode from "jwt-decode";

import { setUserToken, getUserToken } from "../../UserData/tokenStorage";
import { UserContext } from "../PageRouter";

const API_URL = "https://localhost:44335/api/Jwt";

const LoginForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useContext(UserContext);
  const history = useHistory();

  const saveData = async (data) => {
    await axios.post(API_URL + "/login", data).then((response) => {
      if (response.status == 200) {
        console.log(jwt_decode(response.data));
        setUserToken(response.data);
        dispatch({ type: "login" });
        history.push("/");
      }
    });
  };

  return (
    <Fragment>
      <div className="text-center mx-5">
        <form
          className="form-control bg-secondary border-0"
          onSubmit={handleSubmit(saveData)}
        >
        <h3 className="text-white mt-2">Login</h3>
          <div className="my-4 mx-5">
            <div className="mb-2 mx-5">
              <input
                type="text"
                className="form-control"
                {...register("userName", { required: true })}
                placeholder="Enter user name"
              />
              {errors.title && (
                <span className="text-danger">Username is required</span>
              )}
            </div>
            <div className="mx-5">
              <input
                type="password"
                className="form-control"
                {...register("password", { required: true })}
                placeholder="Enter password"
              />
              {errors.title && (
                <span className="text-danger">Password is required</span>
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-dark mb-2">
            Submit
          </button>
          <br />
          <button
            type="submit"
            className="btn btn-dark mb-2"
            onClick={() => history.push("/register")}
          >
            Don't have an account? Click here!
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default LoginForm;
