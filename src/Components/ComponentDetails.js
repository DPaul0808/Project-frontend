import React, {Fragment, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import axios from "axios";
import {
  getUserToken,
  getUserRoles,
  getDecodedToken,
} from "../UserData/tokenStorage";

const API_URL = "https://localhost:44335/api/components";

const ComponentDetails = () => {
  const [component, setComponent] = useState({
    id: 0,
    name: "",
    category: "",
    features: [
      {
        id: 0,
        name: "",
        value: "",
        componentId: 0,
        component: "",
      },
    ],
  });
  const [reload, setReload] = useState(false);

  const history = useHistory();
  const params = useParams();
  const dictionary = ["CPU", "GPU", "Memory", "Motherboard"];

  useEffect(() => {
    async function fetchData() {
      await axios.get(API_URL + "/" + params.id).then((response) => {
        console.log(response.data);
        setComponent(response.data);
      });
    }
    fetchData();
  }, [reload]);

  const TableAction = (props) => {
    const deleteComponent = async () => {
      await axios
        .delete(API_URL + "features/" + props.id)
        .then(() => setReload(true));
    };
    setReload(false);
    return (
      <div className="btn-group">
        <Fragment>
          <div className="col-5">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => history.push("/editFeature/" + props.id)}
            >
              Edit
            </button>
          </div>
          <div className="col-5">
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteComponent}
            >
              Delete
            </button>
          </div>
        </Fragment>
      </div>
    );
  };

  return (
    <div className="card border-0">
      <div className="card-header bg-success text-white">Component Details</div>
      <div className="card-body bg-secondary text-white">
        <p className="card-text">Name: {component.name}</p>
        <p className="card-text">Category : {dictionary[component.category]}</p>
        <table className="table table-dark table-striped border border-dark">
          <thead>
            <tr>
              <td>Feature</td>
              <td>Value</td>
              {getUserToken() != null && <td>Actions</td>}
            </tr>
          </thead>
          <tbody>
            {component.features.map((feature) => {
              const row = (
                <tr key={feature.id}>
                  <td>{feature.name}</td>
                  <td>{feature.value}</td>
                  {getUserToken() != null
                      ? getUserRoles().includes("Admin") && (
                          <td>
                            <TableAction id={feature.id} />
                          </td>
                        )
                      : ""}
                </tr>
              );
              return row;
            })}
          </tbody>
        </table>
      </div>
      <div className="card-footer bg-success">
        <button className="btn btn-dark" onClick={() => history.goBack()}>
          Back
        </button>
      </div>
    </div>
  );
};

export default ComponentDetails;
