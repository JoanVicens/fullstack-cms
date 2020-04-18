
function musicLogged(to, from, next) {
  if(localStorage.token) {
    next('/principal');
  } else {
    next();
  }
}

export default {
  musicLogged
}
