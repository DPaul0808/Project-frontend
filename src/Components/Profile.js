import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getDecodedToken } from "../UserData/tokenStorage";
import { Fragment } from "react/cjs/react.production.min";
import axios from "axios";

const API_URL = "https://localhost:44335/api/";

const UserProfile = () => {
  const history = useHistory();
  const userToken = getDecodedToken();
  const [computer, setComputer] = useState({
    id: 0,
    name: "",
    components: [
      {
        computerId: 0,
        componentId: 0,
      },
    ],
  });
  const [components, setComponents] = useState([]);
  const dictionary = ["CPU", "GPU", "Memory", "Motherboard"];

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(API_URL + "computers/" + userToken["Computer:"])
        .then((response) => {
          setComputer(response.data);
          console.log(computer);
        });
      await axios
        .get(API_URL + "computers/components/" + userToken["Computer:"])
        .then((response) => {
          setComponents(response.data);
          components.sort(function (a, b) {
            return a.category - b.category;
          });
          console.log(components);
        });
    }
    fetchData();
  }, []);

  return (
    <Fragment>
      <p className="text-white">{userToken["sub"]}</p>
      <div>
        {userToken["Computer:"] == null ? (
          <Link to="/createPc">Add your Pc</Link>
        ) : (
          <Fragment>
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <td>Your PC: {computer.name}</td>
                </tr>
              </thead>
              <tbody>
                {components.map((component) => {
                  const row = (
                    <tr key={component.id}>
                      <td>{dictionary[component.category]}</td>
                      <td>{component.name}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() =>
                            history.push("/component/" + component.id)
                          }
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                  return row;
                })}
              </tbody>
            </table>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => history.push("/editPc/" + computer.id)}
            >
              Edit
            </button>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default UserProfile;
