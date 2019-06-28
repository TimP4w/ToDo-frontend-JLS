import Vue from 'vue'
import Vuex from 'vuex'
import { fetchTasks, postTask, updateTask, deleteTask } from '../resources/todo.resource'
import { login } from '../resources/auth.resource'

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
            localStorage.setItem("token", token);
        },
        LOGOUT(state) {
            state.authToken = "";
            state.authenticated = false;
            localStorage.setItem("token", "");
        },
        PUSH_API_ERROR(state, e) {
            state.apiError = e;
        }
    },

    getters: {
        allTasks(state)  {
            return state.tasksList;
        },
        tasksDone(state) {
            return state.tasksList.filter(task => task.done === true);
        },
        tasksTodo(state) {
            return state.tasksList.filter(task => task.done !== true);
        },
        task: (state) => (id) => {
            return state.tasksList.find(task => task.id === id);
        },
        tasksDoneCount(state) {
            return state.tasksList.filter(task => task.done === true).length;
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
        postNewTask(context, BaseTask) {
            let data = {
                "title": BaseTask.description,
                "date": BaseTask.date
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
        deleteTask(context, BaseTask) {
            return deleteTask(BaseTask.id).then(response => {
                if(response.status === 201) {
                    context.commit("DELETE_TASK", BaseTask);
                }
            });
        },
        doLogin(context, credentials) {
            return login(credentials).then(response => {
                context.commit("LOGIN", response.data.token);
            });
        }
    },
})
