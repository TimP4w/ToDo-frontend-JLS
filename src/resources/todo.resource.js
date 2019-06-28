import { api } from './api.config'


//Export const instead of functions -> more efficient and fast.
export const fetchTasks = function() {
    return api.get("/todo");
}

export const postTask = function(data) {
    return api.post("/todo", data);
}

export const updateTask = function(id, task) {
    return api.patch("/todo/" + id, task);
}

export const deleteTask = function(id) {
    return api.delete("/todo/" + id);
}




