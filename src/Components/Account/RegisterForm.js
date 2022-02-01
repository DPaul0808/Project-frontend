import React, { Fragment } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useForm } from "react-hook-form";

const API_URL = "https://localhost:44335/api/Jwt/register";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  const saveData = async (data) => {
    await axios.post(API_URL, data).then((response) => {
      if (response.status == 200) {
        history.push("/login");
      }
    });
  };

  return (
    <Fragment>
      <div className="text-center">
        <form
          className="form-control bg-secondary border-0"
          onSubmit={handleSubmit(saveData)}
        >
          <h3 className="text-white mt-2">Register</h3>
          <div className="row mt-4 my-2">
            <div className="col mx-3">
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
            <div className="col mx-3">
              <input
                type="text"
                className="form-control"
                {...register("email", { required: true })}
                placeholder="Enter email"
              />
              {errors.title && (
                <span className="text-danger">Email is required</span>
              )}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col mx-3">
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
            <div className="col mx-3">
              <input
                type="password"
                className="form-control"
                {...register("confirmPassword", { required: true })}
                placeholder="Confirm password"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-dark my-3">
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default RegisterForm;
