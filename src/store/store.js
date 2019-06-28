import Vue from 'vue'
import Vuex from 'vuex'
import {fetchTasks, postTask, updateTask, deleteTask, login} from '../helpers/api';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        tasksList: [],
        isError: false,
        errorMessage: "",
        authToken: "",
        authenticated: false,
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
            let data = {
                "title": task.description,
                "date": task.date
            }
            return postTask(data).then(response => {
                context.commit("ADD_TASK", response.data);
            })
        },
        getTasks(context) {
            return fetchTasks().then(response => {
                context.commit("SET_TASKS", response.data);
            });
        },
        updateTask(context, data) {
            let payload = {
                    "title": data.newTask.description,
                    "date": data.newTask.date,
                    "done": data.newTask.done
            }
            return updateTask(data.oldTask.id, payload);
        },
        deleteTask(context, task) {
            return deleteTask(task.id).then(response => {
                if(response.status === 201) {
                    context.commit("DELETE_TASK", task);
                }                
            });
        },
        doLogin(context, credentials) {
            return login(credentials).then(response => {
                context.commit("LOGIN", response.data.token);
                localStorage.setItem("token", response.data.token);
            });
        }
    },
})