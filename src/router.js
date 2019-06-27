import Vue from 'vue'
import Router from 'vue-router'

import Todo from './components/views/Todo.vue'
import Login from './components/views/Login.vue'

Vue.use(Router)

export const router = new Router({
    routes: [
        {
            path: '/',
            redirect: {
                name: "login" // change with login
            }
        },
        {
            path: "/login",
            name: "login",
            component: Login
        }, 
        {
            path: "/todo",
            name: "todo",
            component: Todo
        }
    ]
})