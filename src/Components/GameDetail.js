import React, { useState, useEffect, Fragment } from "react";
import { useParams, useHistory } from "react-router";
import {
  getUserToken,
  getUserRoles,
  getDecodedToken,
} from "../UserData/tokenStorage";
import axios from "axios";

const API_URL = "https://localhost:44335/api/";

const GameDetails = () => {
  const [game, setGame] = useState({
    id: 0,
    name: "",
    description: "",
    features: [
      {
        id: 0,
        name: "",
        value: "",
        valueType: "",
      },
    ],
  });
  const [pcFeatures, setFeatures] = useState([]);
  const [reload, setReload] = useState(false);
  const history = useHistory();
  const params = useParams();

  const ReqCheck = () => {
    let canItRun = false;
    game.features.map((req) => {
      pcFeatures.map((feature) => {
        if (req.name == feature.name) {
          if (req.value <= feature.value) {
            canItRun = true;
          } else {
            canItRun = false;
          }
        }
      });
    });
    return canItRun;
  };

  useEffect(() => {
    async function fetchData() {
      await axios.get(API_URL + "games/" + params.id).then((response) => {
        console.log(response.data);
        setGame(response.data);
        console.log(game.features);
      });
      if (getUserToken != null) {
        const decodedToken = getDecodedToken();
        await axios
          .get(API_URL + "computers/components/" + decodedToken["Computer:"])
          .then((response) => {
            const computerFeatures = [];
            response.data.map((component) => {
              component.features.map((feature) => {
                computerFeatures.push(feature);
              });
            });
            setFeatures(computerFeatures);
          });
      }
    }
    fetchData();
  }, [reload]);

  const TableAction = (props) => {
    const deleteComponent = async () => {
      await axios.delete(API_URL + "features/" + props.id).then(() => setReload(true));
    };
    setReload(false);
    return (
      <div className="btn-group">
        <Fragment>
          <div className="col-5">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => history.push("/editRequirement/" + props.id)}
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
    <Fragment>
      {getUserToken() != null && (
        <div>
          {ReqCheck() ? (
            <div className="alert alert-success" role="alert">
              Your PC can run this game!
            </div>
          ) : (
            <div className="alert alert-danger" role="alert">
              Your PC can't run this game!
            </div>
          )}
        </div>
      )}
      <div className="card border-0">
        <div className="card-header bg-success text-white">Game details</div>
        <div className="card-body bg-secondary text-white">
          <p className="card-text">Name: {game.name}</p>
          <p className="card-text">Description : {game.description}</p>
          <table className="table table-dark table-striped border border-dark">
            <thead>
              <tr>
                <td>Requirements</td>
                <td>Value</td>
                {getUserToken() != null && <td>Actions</td>}
              </tr>
            </thead>
            <tbody>
              {game.features.map((feature) => {
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
    </Fragment>
  );
};

export default GameDetails;
