import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { getDecodedToken, getUserId, getUserToken } from "../../UserData/tokenStorage";
import { useLocation, useParams, useHistory } from "react-router-dom";

const API_URL = "https://localhost:44335/api/";

const PcForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [components, setComponents] = useState([]);
  const [pcName, setPcName] = useState("")
  const history = useHistory()
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      await axios.get(API_URL + "components").then((response) => {
        if(response.status == 200){
          setComponents(response.data);
          history.push("/profile")}
        })
    };
    async function fetchEditData(){
      await axios.get(API_URL + "computers/" + params.id).then((response)=>{
        if(response.status == 200){
          setPcName(response.data.name)
          history.push("/profile")
        }
      })
    }
    fetchData();
    if(location.pathname != "/CreatePc"){
      fetchEditData()
    }
  }, []);

  const saveData = async (data) => {
    if(location.pathname =="/CreatePc"){
      console.log("Data: ", data);
      await axios.post(API_URL + "computers", data);
    }
    else{
      console.log("Data: ", data);
      await axios.put(API_URL + "computers/" + params.id, data);
    }
  };

  return (
    <Fragment>
      <div className="mx-5">
        <form
          className="form-control bg-secondary  border-0"
          onSubmit={handleSubmit(saveData)}
        >
          <h3 className="text-white mt-2">{location.pathname == "/CreatePc" ? "Create your pc" : "Edit your pc"}</h3>
          <div className="col-4 my-4 mx">
            <input
              type="text"
              className="form-control"
              {...register("name", { required: true })}
              placeholder="Enter PC name"
              defaultValue={
                location.pathname == "/CreatePc" ? "" : pcName
              }
            />
            {errors.title && (
              <span className="text-danger">Computer name is required</span>
            )}
            <input
              type="hidden"
              defaultValue={getUserId()}
              {...register("userId")}
            />
          </div>
          <div className="row my-2">
            <div className="col-4">
              <select
                className="form-select"
                {...register("CpuId", { required: true })}
              >
                <option value="" disabled selected>
                  Enter CPU
                </option>
                {components.map((component) => {
                  if (component.category == 0) {
                    const option = (
                      <option key={component.id} value={component.id}>
                        {component.name}
                      </option>
                    );
                    return option;
                  }
                })}
              </select>
            </div>
            <div className="col-4">
              <select
                className="form-select"
                {...register("GpuId", { required: true })}
              >
                <option value="" disabled selected>
                  Enter GPU
                </option>
                {components.map((component) => {
                  if (component.category == 1) {
                    const option = (
                      <option key={component.id} value={component.id}>
                        {component.name}
                      </option>
                    );
                    return option;
                  }
                })}
              </select>
            </div>
          </div>
          <div className="row my-2">
            <div className="col-4">
              <select
                className="form-select"
                {...register("MemoryId", { required: true })}
              >
                <option value="" disabled selected>
                  Enter Memory
                </option>
                {components.map((component) => {
                  if (component.category == 2) {
                    const option = (
                      <option key={component.id} value={component.id}>
                        {component.name}
                      </option>
                    );
                    return option;
                  }
                })}
              </select>
            </div>
            <div className="col-4">
              <select
                className="form-select"
                {...register("MotherboardId", { required: true })}
              >
                <option value="" disabled selected>
                  Enter Motherboard
                </option>
                {components.map((component) => {
                  if (component.category == 3) {
                    const option = (
                      <option key={component.id} value={component.id}>
                        {component.name}
                      </option>
                    );
                    return option;
                  }
                })}
              </select>
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

export default PcForm;
