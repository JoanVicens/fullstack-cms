import router from './router'
import axios from 'axios'
import store from './store'

export default axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    let message = response.message || response.data.message
    let action = response.action || response.data.action
    
    switch(action) {
        case 'LOGIN':
            store.commit('setAction', '/entrar');
            break;
        default:
            store.commit('setAction', action)
    }

    if (message) {    
        switch(response.status) {
            case 500:
                store.commit('saveMessage', {
                    message: message,
                    class: 'error',
                    action
                })
                break;
            default:
                store.commit('saveMessage', {
                    message: message,
                    class: 'succes',
                    action
                })
        }
    }

    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error.response) {

        if (error.response.status == 401) {
            console.error('sessió caducada. Redirigint....');
    
            localStorage.clear()
    
            store.commit('saveMessage', {
                message: 'Sessió caducada',
                class: 'error'
            })
    
            router.push({ path: '/' })
        } else if(error.response.data.message) { // El error te un missatge
            store.commit('saveMessage', {
                message: error.response.data.message,
                class: 'error'
            })
        } 
    } else {
        store.commit('saveMessage', { // El Error no te cap missatge
            message: 'oupsi, algo ha anat malament',
            class: 'error'
        })
    }

    return Promise.reject(error);
});
