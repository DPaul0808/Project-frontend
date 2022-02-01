//@ts-ignore
import jwt_decode from "jwt-decode";

const userToken = "jwt_token";

const roleLink = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

const idLink = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"

export const getUserToken = () => {
  return window.sessionStorage.getItem(userToken);
};

export const setUserToken = (string) => {
  window.sessionStorage.setItem(userToken, string);
  return userToken;
};

export const getUserRoles = () => {
  var decodedToken = jwt_decode(getUserToken());
  console.log(decodedToken[roleLink]);
  return decodedToken[roleLink];
};

export const getUserId = () =>{
  var decodedToken = jwt_decode(getUserToken());
  console.log(decodedToken[idLink]);
  return decodedToken[idLink];
}

export const getDecodedToken = () => {
  var decodedToken = jwt_decode(getUserToken());
  console.log(decodedToken);
  return decodedToken;
};
