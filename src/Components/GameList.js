import React, { useState, useEffect,Fragment } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { getUserRoles, getUserToken } from "../UserData/tokenStorage";

const API_URL = "https://localhost:44335/api/games";

const GameList = () => {
  const [gamesList, setGames] = useState([]);
  const [reload, setReload] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      await axios.get(API_URL).then((response) => {
        setGames(response.data);
      });
    }
    fetchData();
  }, [reload]);

  const TableHeader = () => {
    return (
      <thead>
        <tr>
          <td>Game name</td>
          <td>Action</td>
        </tr>
      </thead>
    );
  };

  const TableRow = () => {
    return (
      <tbody>
        {gamesList.map((game) => {
          const row = (
            <tr key={game.id}>
              <td>{game.name}</td>
              <td>
                <TableAction id={game.id} />
              </td>
            </tr>
          );
          return row;
        })}
      </tbody>
    );
  };

  const TableAction = (props) => {
    const deleteComponent = async () => {
      await axios.delete(API_URL + "/" + props.id).then(() => setReload(true));
    };
    setReload(false);
    return (
      <div className="btn-group">
        <div className="col-5">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => history.push("/game/" + props.id)}
          >
            Details
          </button>
        </div>
        {getUserToken() != null
          ? getUserRoles().includes("Admin") && (
              <Fragment>
                <div className="col-5">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => history.push("/EditGame/" + props.id)}
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
            )
          : ""}
      </div>
    );
  };
  return (
    <div>
    <h2 className="text-white mb-4">All games</h2>
      <table className="table table-dark table-striped">
        <TableHeader />
        <TableRow />
      </table>
    </div>
  );
};

export default GameList;
