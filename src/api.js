import axios from 'axios';
import { store } from './store/store'


export function requestInterceptor() {
    axios.interceptors.request.use(function(config) {
        let token = store.getters.authToken;
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    
    }, function(e) {
        return Promise.reject(e);
    });
}

export function responseInterceptor() {
    axios.interceptors.response.use(function (response) {
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

export function fetchTasks() {
    return axios.get("https://todo-backend.jls.digital/api/v1/todo");
}

export function postTask(data) {
    return axios.post("https://todo-backend.jls.digital/api/v1/todo", data);
}

export function updateTask(id, task) {
    return axios.patch("https://todo-backend.jls.digital/api/v1/todo/" + id, task);
}

export function deleteTask(id) {
    return axios.delete("https://todo-backend.jls.digital/api/v1/todo/" + id);

}

export function login(credentials) {
    return axios.post("https://todo-backend.jls.digital/api/v1/auth/login", {
        "username": credentials.username,
        "password": credentials.password
    })
}


