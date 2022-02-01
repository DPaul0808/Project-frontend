import React, { Fragment, useReducer, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./Header";
import FeatureForm from "./Forms/FeatureForm";
import ComponentForm from "./Forms/ComponentForm";
import ComponentList from "./ComponentList";
import ComponentDetails from "./ComponentDetails";
import PcForm from "./Forms/PcForm";
import LoginForm from "./Account/LoginForm";
import RegisterForm from "./Account/RegisterForm";
import RolesList from "./RolesList";
import RoleManager from "./RoleManager";
import RoleForm from "./Forms/RoleForm";
import UserProfile from "./Profile";
import HomePage from "./HomePage";
import GameForm from "./Forms/GameForm";
import GameList from "./GameList";
import GameDetail from "./GameDetail";
import RequirementForm from "./Forms/RequirementForm"
import { getUserToken } from "../UserData/tokenStorage";
import GameDetails from "./GameDetail";

export const UserContext = React.createContext();

const PageRouter = () => {
  function reducer(user, action) {
    switch (action.type) {
      case "login":
        return { isLoggedIn: true };
      case "logout":
        return { isLoggedIn: false };
      case "status":
        return user;
      default:
        throw new Error();
    }
  }

  const [user, dispatch] = useReducer(reducer, {
    isLoggedIn: getUserToken() != null ? true : false,
  });

  return (
    <Router>
      <UserContext.Provider value={dispatch}>
        <Header userStatus={user} />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/News" component={News} />
            <Route path="/Hardware" component={Hardware} />
            <Route path="/component/:id" component={ComponentData} />
            <Route path="/AddComponents" component={AddEditComponents} />
            <Route path="/EditComponent/:id" component={AddEditComponents} />
            <Route path="/CreatePc" component={AddEditPc} />
            <Route path="/editPc/:id" component={AddEditPc} />
            <Route path="/profile" component={Profile} />
            <Route path="/AddFeature" component={AddEditFeature} />
            <Route path="/editFeature/:id" component={AddEditFeature} />
            <Route path="/AddRequirement" component={AddEditRequirement}/>
            <Route path="/editRequirement/:id" component={AddEditRequirement}/>
            <Route path="/Roles" component={Roles} />
            <Route path="/addRole" component={AddEditRole} />
            <Route path="/editRole/:id" component={AddEditRole} />
            <Route path="/role/:id" component={ManageRole} />
            <Route path="/Games" component={AllGames} />
            <Route path="/AddGame" component={AddEditGame} />
            <Route path="/Game/:id" component={GameData} />
            <Route path="/Login" component={Login} />
            <Route path="/Register" component={Register} />
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
};

const Welcome = () => {
  return <HomePage />;
};
const News = () => {
  return <p>Here you will have the latest news based on pc gaming</p>;
};
const Hardware = () => {
  return <ComponentList />;
};
const AddEditPc = () => {
  return <PcForm />;
};
const AddEditComponents = () => {
  return <ComponentForm />;
};
const AddEditFeature = () => {
  return <FeatureForm />;
};
const ComponentData = () => {
  return <ComponentDetails />;
};
const Login = () => {
  return <LoginForm />;
};
const Register = () => {
  return <RegisterForm />;
};
const Roles = () => {
  return <RolesList />;
};
const AddEditRole = () => {
  return <RoleForm />;
};
const ManageRole = () => {
  return <RoleManager />;
};
const Profile = () => {
  return <UserProfile />;
};
const AddEditGame = () => {
  return <GameForm />;
};
const AllGames = () => {
  return <GameList />;
};
const GameData = () => {
  return <GameDetail />;
};
const AddEditRequirement =()=>{
  return <RequirementForm/>
}

export default PageRouter;
