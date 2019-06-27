import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';
import axios from 'axios';
import * as api from '../api.js';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        nextId: 0,
        tasksList: [],
        isError: false,
        errorMessage: "",
        authToken: "",
        authenticated: false,
        apiError: Object,
    },
    
    mutations: {
        ADD_TASK(state, task) {
            state.tasksList.push(task);
        },
        SET_TASKS(state, tasks) {
            state.tasksList = tasks;
        },
        DELETE_TASK(state, task) {
            let index = state.tasksList.indexOf(task);
            Vue.delete(state.tasksList, index);
        },
        UPDATE_TASK(state, data) {
            let index =  state.tasksList.indexOf(data.oldTask);
            Vue.set(state.tasksList, index, data.newTask);
        },
        THROW_ERROR(state, msg) {
            state.isError = true;
            state.errorMessage = msg;
        },
        QUIT_ERROR(state) {
            state.isError = false;
        },
        LOGIN(state, token) {
            state.authToken = token;
            state.authenticated = true;
        },
        LOGOUT(state) {
            state.authToken = "";
            state.authenticated = false;
            localStorage.setItem('token', "");
        },
        PUSH_API_ERROR(state, e) {
            state.apiError = e;
        }
    },


    getters: {
        allTasks(state) {
            return state.tasksList;
        },
        tasksDone(state) {
            return state.tasksList.filter(function(task) {
                return task.done === true
              });
        },
        tasksTodo(state) {
            return state.tasksList.filter(function(task) {
                return task.done !== true
              });
        },
        task: (state) => (id) => {   
            return state.tasksList.find(task => task.id === id);
        },
        tasksDoneCount(state) {
            return state.tasksList.filter(function(task) {
                return task.done === true
              }).length;
        },
        tasksCount(state) {
            return state.tasksList.length;
        }, 
        isError(state) {
            return state.isError;
        },
        errorMessage(state) {
            return state.errorMessage;
        },
        authToken(state) {
            return state.authToken;
        },
        isAuthenticated(state) {
            return state.authenticated;
        }
    },



    actions: {
        postNewTask(context, task) {
            return new Promise((resolve, reject) => {
                let data = {
                        "title": task.description,
                        "date": task.date
                }
                axios.post("https://todo-backend.jls.digital/api/v1/todo", data, api.config(this.state.authToken))
                .then(response => {
                    context.commit("ADD_TASK", response.data);
                    context.commit("QUIT_ERROR");
                    resolve(response);
                })
                .catch(e => {
                    context.commit("PUSH_API_ERROR", e.response.status);
                    reject(e);
                });
            })

        },
        getTasks(context) {
            return new Promise((resolve, reject) => {
                axios.get("https://todo-backend.jls.digital/api/v1/todo", api.config(this.state.authToken))
                .then(response => {
                    context.commit("SET_TASKS", response.data);
                    context.commit("QUIT_ERROR");

                    resolve(response);
                })
                .catch(e => {
                    context.commit("PUSH_API_ERROR", e.response.status);
                    reject(e);
                })
            });
  
        },
        updateTask(context, data) {
            return new Promise((resolve, reject) => {
                let payload = {
                        "title": data.newTask.description,
                        "date": data.newTask.date,
                        "done": data.newTask.done
                }
                axios.patch("https://todo-backend.jls.digital/api/v1/todo/" + data.oldTask.id, payload, api.config(this.state.authToken))
                .then(response => {
                    context.commit("QUIT_ERROR");
                    resolve(data.newTask);
                })
                .catch(e => {
                    context.commit("PUSH_API_ERROR", e.response.status);
                    reject(e);
                });
            })
        },
        deleteTask(context, task) {
            return new Promise((resolve, reject) => {
                axios.delete("https://todo-backend.jls.digital/api/v1/todo/" + task.id, api.config(this.state.authToken))
                .then(response => {
                    context.commit("DELETE_TASK", task);
                    context.commit("QUIT_ERROR");
                    resolve(task);
                })
                .catch(e => {
                    context.commit("PUSH_API_ERROR", e.response.status);
                    reject(e);
                });
            })
        },
        doLogin(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post("https://todo-backend.jls.digital/api/v1/auth/login", {
                    "username": credentials.username,
                    "password": credentials.password
                })
                .then(response => {
                    context.commit("LOGIN", response.data.token);
                    localStorage.setItem("token", response.data.token);
                    context.commit("QUIT_ERROR");
                    resolve();

                })
                .catch(e => {
                    context.commit("PUSH_API_ERROR", e.response.status);
                    reject(e);
                })
            })
        }
    },
})