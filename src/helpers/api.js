import axios from 'axios';
import { store } from '../store/store'

let api = axios.create({
    baseURL: "https://todo-backend.jls.digital/api/v1",
    timeout: 1000,
})

export function requestInterceptor() {
    api.interceptors.request.use(function(config) {
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

export function fetchTasks() {
    return api.get("/todo");
}

export function postTask(data) {
    return api.post("/todo", data);
}

export function updateTask(id, task) {
    return api.patch("/todo/" + id, task);
}

export function deleteTask(id) {
    return api.delete("/todo/" + id);

}

export function login(credentials) {
    return api.post("/auth/login", {
        "username": credentials.username,
        "password": credentials.password
    })
}


