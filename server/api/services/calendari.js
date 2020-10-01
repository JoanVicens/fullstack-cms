const {google} = require('googleapis');

const credencials_calendari = require("../config/credencials_calendari")
const CALENDARI_ID = process.env.ID_CALENDARI

exports.guardarEvent = (actuacio, id) => {
  // Info google event

  const event = {
    'summary': actuacio.titol,
    'location': actuacio.lloc,
    'description': actuacio.descripcio,
    'id': id
  };

  if(actuacio.data && actuacio.hora_inici && actuacio.hora_fi) {
    event.start = {
      dateTime: (actuacio.data.toString()).split('T')[0] + 'T' + actuacio.hora_inici,
      timeZone: 'Europe/Madrid'
    }

    event.end = {
      dateTime: (actuacio.data.toString()).split('T')[0] + 'T' + actuacio.hora_fi,
      timeZone: 'Europe/Madrid'
    }
  } else if (actuacio.data) {
    event.start = {
      date: (actuacio.data.toString()).split('T')[0],
      timeZone: 'Europe/Madrid'
    }

    event.end = {
      date: (actuacio.data.toString()).split('T')[0],
      timeZone: 'Europe/Madrid'
    }
  }

  credencials_calendari.authorize((auth) => {
    try {
      const calendar = google.calendar({version: 'v3', auth});
      calendar.events.insert({
        auth: auth,
        calendarId: CALENDARI_ID,
        resource: event,
      }, function(err, event) {
        if (err) {
          console.log('There was an error contacting the Calendar service: ' + err);
          return;
        }
        console.log('Event creat correctament');
      });
    } catch (err) {
      console.log('catched err:', err);
    }
  }, actuacio);

}

exports.modificarEvent = (actuacio) => {

  const event = {
    'summary': actuacio.titol,
    'location': actuacio.lloc,
    'description': actuacio.descripcio
  };

  if(actuacio.data && actuacio.hora_inici && actuacio.hora_fi) {
    event.start = {
      dateTime: actuacio.data.split('T')[0] + 'T' + actuacio.hora_inici,
      timeZone: 'Europe/Madrid'
    }

    event.end = {
      dateTime: actuacio.data.split('T')[0] + 'T' + actuacio.hora_fi,
      timeZone: 'Europe/Madrid'
    }
  } else if (actuacio.data) {
    event.start = {
      date: actuacio.data.split('T')[0],
      timeZone: 'Europe/Madrid'
    }

    event.end = {
      date: actuacio.data.split('T')[0],
      timeZone: 'Europe/Madrid'
    }
  }

  credencials_calendari.authorize((auth) => {
    try {
      const calendar = google.calendar({version: 'v3', auth});
      calendar.events.update({
        auth: auth,
        calendarId: CALENDARI_ID,
        eventId: actuacio._id,
        resource: event
      }, function(err, event) {
        if (err) {
          console.log('There was an error contacting the Calendar service: ' + err);
          return;
        }
        console.log('Event creat correctament');
      });
    } catch (err) {
      console.log('catched err:', err);
    }
  }, actuacio);

}

exports.eliminarEvent = (id) => {
  console.log('id a eliminar', typeof id);
  credencials_calendari.authorize((auth) => {
    try {
      const calendar = google.calendar({version: 'v3', auth});
      calendar.events.delete({
        'auth': auth,
        'calendarId': CALENDARI_ID,
        'eventId': id
      }, function(err, event) {
        if (err) {
          console.log('There was an error contacting the Calendar service: ' + err);
          return;
        }
        console.log('Event eliminat');
      });
    } catch (err) {
      console.log('catched err:', err);
    }
  })
}
