import Vue from 'vue'
import Router from 'vue-router'
import TodoView from './components/views/TodoView.vue'
import LoginView from './components/views/LoginView.vue'

Vue.use(Router)

export const router = new Router({
    routes: [
        {
            path: "/",
            redirect: {
                name: "LoginView"
            }
        },
        {
            path: "/login",
            name: "LoginView",
            component: LoginView
        },
        {
            path: "/todo",
            name: "TodoView",
            component: TodoView
        }
    ]
})
