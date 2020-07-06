import * as types from "./actionTypes";
import { API_URL } from "../../app.json";
import axios from "axios";

export function login_Success(user) {
  return {
    type: types.LOGIN_SUCCESS,
    value: "ddddd",
  };
}

export function login_Fail(user) {
  return {
    type: types.LOGIN_FAIL,
    value: "ddddd",
  };
}

export function createUser(formData) {
  return function (dispatch) {
    dispatch({ type: "LOGIN_POST_LOADING", payload: true });
    axios({
      method: "post",
      url: `${API_URL}/myapi/clients/signup`,
      data: formData,
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    })
      .then(function (response) {
        dispatch({ type: "LOGIN_SUCCESS", payload: "helloworld" });

        if (response.status === 200) {
          alert(JSON.stringify(response.data));
          // dispatch({ type: "POST_REQUEST_SUCCESS" })
          // dispatch({
          //   type: "CREATE_CLIENT_SUCCESS",
          //   payload: response.data.data,
          // });
          // history.push("/clients");
        } else {
          // dispatch({
          //   type: "CATCH_ERROR",
          //   payload: response.data.data.message,
          // });
        }
        // // console.log(response)
      })
      .catch(function (error) {
        // dispatch({ type: "CATCH_ERROR", payload: error.message });
        // console.log(error);
        // alert(`${API_URL}/myapi/clients/signup`);
        // alert(JSON.stringify(error.message));
      })
      .finally(() => {
        dispatch({ type: "LOGIN_POST_LOADING", payload: false });
        // dispatch({ type: "LOGIN_SUCCESS", payload: "helloworld" });
        // alert("rffff");
      });
  };
}
