
import store from './store/store';

export function config(token) {
    let config = {
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }
    return config;
}
