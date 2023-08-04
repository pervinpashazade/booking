import axios from 'axios';
import { apiUrl, config } from "./config";
import { store } from './store/store';
import { logout } from './store/action';
// import toast from 'toasted-notes';
import React from "react";

axios.interceptors.request.use(
  config => {
    const access_token = localStorage.getItem("access_token");
    // if (access_token && config.url.indexOf('auth') === -1) {
    if (access_token) {
      config.headers['Authorization'] = 'Bearer ' + access_token;
      // config.headers['Content-Type'] = 'application/json'
    }
    return config;
  }, error => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  }, error => {
    // console.log('interceptor', error.response);

    if (!error.response) {
      // alert("Serverlə əlaqə qurmaq mümkün olmadı.")
      return Promise.reject(error)
    }

    // if (error.response.status === 405) {
    //   return Promise.reject(error);
    // }
    // else if (error.response.status === 400) {
    //   toast.notify(({ onClose }) => (
    //     <div className="alert alert-danger m-3">
    //       <h5>Xəta baş verdi!</h5>
    //       <p className="mb-0">
    //         {
    //           error.response.data.message ? error.response.data.message : '.'
    //         }
    //       </p>
    //     </div>), { position: "top-right", duration: 3500 });
    //   return Promise.reject(error)
    // } else if (error.response.status === 403) {
    //   toast.notify(({ onClose }) => (
    //     <div className="alert alert-danger m-3">
    //       <h5>İcazəniz yoxdur!</h5>
    //       <p className="mb-0">
    //         {
    //           error.response.data.errors &&
    //           Object.values(error.response.data.errors).map((item, index) =>
    //             <p key={index} className="m-0">{item.join('\n')}</p>
    //           )
    //         }
    //       </p>
    //     </div>), { position: "top-right", duration: 3500 });
    //   return Promise.reject(error)
    // }
    // else if (error.response.status !== 400 && error.response.status !== 401) {
    //   toast.notify(({ onClose }) => (
    //     <div className="alert alert-danger m-3">
    //       <h5>Xəta baş verdi!</h5>
    //       <p className="mb-0">
    //         {
    //           error.response.data.errors &&
    //           Object.values(error.response.data.errors).map((item, index) =>
    //             <p key={index} className="m-0">{item.join('\n')}</p>
    //           )
    //         }
    //       </p>
    //     </div>), { position: "top-right", duration: 3500 });
    //   return Promise.reject(error)
    // }

    return new Promise((resolve, reject) => {

      console.log("test func");

      const originalRequest = error.config;

      if (error.response.status === 401) {
        // debugger
        const { dispatch } = store;
        const access_token = localStorage.getItem("access_token")
        if (access_token) {
          axios.post(apiUrl + "user/auth/refresh").then(res => {
            console.log(res.data.data);
          }).catch(err => {
            console.log("interceptor refresh token error");
            dispatch(logout())
            return Promise.reject(error)
          })
        } else {
          dispatch(logout())
        }

        // return Promise.reject(error)
        return reject(error)

        // toast.notify(({ onClose }) => (
        //   <div className="alert alert-danger m-3">
        //     <h5>Xəta baş verdi!</h5>
        //     <p className="mb-0">
        //       Email və ya şifrə səhvdir.
        //       <br />
        //       Sistemə yenidən daxil olmalısınız.
        //     </p>
        //   </div>), { position: "top-right", duration: 3500 });
        // dispatch(logout());
      }



      // if (error.response.status === 401 &&
      //   error.response.data.status === "fail" &&
      //   error.response.config.url.indexOf('/auth/refresh') !== -1) {
      //   const { dispatch } = store;
      //   dispatch(logout());
      // }

      // if (error.response.status === 401 && !originalRequest._retry &&
      //   error.response.config.url.indexOf('/auth/refresh') === -1) {
      //   originalRequest._retry = true;
      //   let response = axios.post(config.apiURL + 'auth/refresh', {
      //     refreshToken: refreshToken,
      //   }).then(res => {
      //     localStorage.setItem('token', res.data.data.accessToken);
      //     localStorage.setItem('refreshToken', res.data.data.refreshToken);
      //     return axios(originalRequest);
      //   });

      //   resolve(response);
      // }
      // console.log("errorrrrrrrrr",error)
      // return Promise.reject(error)
      return reject(error)
      // return error
    });
  },
);