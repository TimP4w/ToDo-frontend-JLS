import axios from 'axios';
import { store } from '../store/store'
import { router } from '../router'
import moment from "moment"

export const api = axios.create({
    //baseURL: "https://todo-backend.jls.digital/api/v1",
    baseURL: "http://127.0.0.1:3000/api/v1",
    timeout: 10000,
})

let isRefreshing = false;

export const requestInterceptor = function() {
    api.interceptors.request.use((config) => {

        var token = store.getters.authToken;
        var refreshToken = store.getters.refreshToken;
        var expiry = store.getters.tokenExpiry;
        var expInMin = moment().diff(expiry) / 1000 / 60;
         if (token && expInMin > -59.8 && !isRefreshing) { //Todo cambia
            isRefreshing = true;
            config.headers.refresh = refreshToken;
        } 
 
        if(token) {
            config.headers.Authorization = "Bearer " + token;
        }
        return config;

    }, function(e) {
        return Promise.reject(e);
    });
}

export const responseInterceptor = function() {
    api.interceptors.response.use(response => {
        if(response.headers['set-authorization'] && response.headers['set-refresh']) {
            let newTokens = {
                token: response.headers['set-authorization'],
                refreshToken: response.headers['set-refresh'],
                expiry: moment().add(1, 'hours')
            }
            store.commit("SET_TOKENS", newTokens);
        }
        // Check if set auth and refresh token header is set -> save new values
         store.commit("QUIT_ERROR");
        return response;
      }, function (e) {
        if (e.response) {
            if(e.response.status === 401) {
                store.commit("LOGOUT");
                store.commit("THROW_ERROR", "Unauthorized");
            } else if(e.response.status === 500 && !store.getters.authToken) {
                router.replace({ name: "LoginView"});
            } else {
                store.commit("THROW_ERROR", "Something went wrong...");
            }
        } else {
            store.commit("THROW_ERROR", "Something went wrong...");
        }
        return Promise.reject(e);
      });
}
