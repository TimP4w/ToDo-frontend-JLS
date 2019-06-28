import axios from 'axios';
import { store } from '../store/store'

export const api = axios.create({
    baseURL: "https://todo-backend.jls.digital/api/v1",
    timeout: 1000,
})

export const requestInterceptor = function() {
    api.interceptors.request.use(function(config) {
        let token = store.getters.authToken;
        if(token) {
            config.headers.Authorization = "Bearer " + token;
        }
        return config;

    }, function(e) {
        return Promise.reject(e);
    });
}

export const responseInterceptor = function() {
    api.interceptors.response.use(function (response) {
         store.commit("QUIT_ERROR");
        return response;
      }, function (e) {
        if(e.response.status === 401) {
            store.commit("LOGOUT");
            store.commit("THROW_ERROR", "Unauthorized");
        } else {
            store.commit("THROW_ERROR", "Something went wrong...");
        }
        return Promise.reject(e);
      });
}
