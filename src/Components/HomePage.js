import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const API_URL = "https://localhost:44335/api/";

const HomePage = () => {
  const [components, setComponents] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios.get(API_URL + "components").then((response) => {
        setComponents(response.data);
      });
      await axios.get(API_URL + "games").then((response) => {
        setGames(response.data);
      });
    }
    fetchData();
  }, []);

  return (
    <Fragment>
      <h2 className="text-white">Welcome</h2>
      <div className="mt-5">
        <div className="row">
          <div className="col">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <td>Last components added</td>
                </tr>
              </thead>
              <tbody>
                {components.map((component) => {
                  const row = (
                    <tr key={component.id}>
                      <td>
                        <Link
                          className="text-white"
                          to={(location) => ({
                            ...location,
                            pathname: "/component/" + component.id,
                          })}
                        >
                          {component.name}
                        </Link>
                      </td>
                    </tr>
                  );
                  return row;
                })}
              </tbody>
            </table>
          </div>
          <div className="col">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <td>Last games added</td>
                </tr>
              </thead>
              <tbody>
                {games.map((game) => {
                  const row = (
                    <tr key={game.id}>
                      <td>
                        <Link
                          className="text-white"
                          to={(location) => ({
                            ...location,
                            pathname: "/game/" + game.id,
                          })}
                        >
                          {game.name}
                        </Link>
                      </td>
                    </tr>
                  );
                  return row;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
