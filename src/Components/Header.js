import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./PageRouter";
import { getUserRoles, getUserToken } from "../UserData/tokenStorage";
import { Fragment } from "react/cjs/react.production.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Header = (props) => {
  const dispatch = useContext(UserContext);
  const history = useHistory();

  const SignOut = () => {
    dispatch({ type: "logout" });
    history.push("/");
    window.sessionStorage.clear();
  };

  return (
    <nav className="navbar navbar-expand-md bg-dark mb-4 border-bottom border-3 border-success">
      <Link className="nav-link text-white border-end border-success" to="/">
        Computer Wars
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/News">
              News
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/Hardware">
              Hardware
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/Games">
              Games
            </Link>
          </li>
          {getUserToken() != null
            ? getUserRoles().includes("Admin") && (
                <Fragment>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/AddComponents">
                      Add components
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/AddGame">
                      Add Game
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/AddFeature">
                      Add Feature
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/AddRequirement">
                      Add Requirement
                    </Link>
                  </li>
                </Fragment>
              )
            : ""}
          {getUserToken() != null
            ? getUserRoles().includes("High Tier Admin") && (
                <li className="nav-item">
                  <Link className="nav-link text-white mr-3" to="/Roles">
                    Roles
                  </Link>
                </li>
              )
            : ""}
        </ul>
      </div>
      <ul className="navbar-nav">
        {!props.userStatus.isLoggedIn ? (
          <Fragment>
            <li className="nav-item pe-2 border-end border-success">
              <Link className="nav-link btn btn-success text-white" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link
                className="nav-link btn btn-success text-white"
                to="/register"
              >
                Register
              </Link>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li className="nav-item pe-2 border-end border-success">
              <Link className="nav-item btn btn-success" to="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item nav-item px-2">
              <button className="nav-item btn btn-success" onClick={SignOut}>
                Sign out
              </button>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Header;
