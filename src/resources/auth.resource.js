import { api } from './api.config'


export const login = function(credentials) {
    return api.post("/auth/login", {
        "username": credentials.username,
        "password": credentials.password
    })
}