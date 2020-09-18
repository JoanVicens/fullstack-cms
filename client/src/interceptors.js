import router from './router'
import axios from 'axios'

export default axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status == 401) {
        console.log('sessió caducada redirigint a /');

        localStorage.removeItem('musics')
        localStorage.removeItem('cursos')
        localStorage.removeItem('cursIdSeleccionat')
        localStorage.removeItem('idCursActiu')

        router.push({ name: 'error', params: { msgError: 'Sessió Caducada' } })
    }
    return Promise.reject(error);
});