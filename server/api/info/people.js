const {google} = require('googleapis');

const credencials_people = require("../config/credencials_people")

exports.afegirContacte = (informaicoContacte) => {

  credencials_people.authorize(async (aut) => {
    try {
      const people = google.people({
        version: 'v1',
        auth: aut,
      });

      const {data: newContact} = await people.people.createContact({
       requestBody: {
         emailAddresses: [{value: 'john@doe.com'}],
         names: [
           {
             displayName: 'John Doe',
             familyName: 'Doe',
             givenName: 'John',
           },
         ],
       },
     });
     console.log('\n\nCreated Contact:', newContact);
   } catch (err) {
     console.error(err);
   }

  })

}
