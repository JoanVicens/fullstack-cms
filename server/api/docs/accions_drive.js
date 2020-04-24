const {google} = require('googleapis');
const credencials = require("../config/credencials_drive")

exports.guardarDocument = (fileName, doc) => {

  credencials.authorize((fileName, doc) => {
    const drive = google.drive({version: 'v3', auth});
    var fileMetadata = {
            'name': 'ImageTest.jpeg'
    };
    var media = {
            mimeType: 'image/jpeg',
            //PATH OF THE FILE FROM YOUR COMPUTER
            body: fs.createReadStream('C:/Users/JWcer/Desktop/illus.jpg')
    };
    drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }, function (err, file) {
      if (err) {
          // Handle error
          console.error(err);
      } else {
          console.log('File Id: ', file.data.id);
      }
    });
  })

}
