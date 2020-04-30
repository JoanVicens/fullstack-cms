const PDFDocument = require('pdfkit');
const blobStream  = require('blob-stream');
var moment = require('moment');
moment.locale('ca');
const fs = require('fs');

let PERIODE = ''

exports.setPeriode = (periode) => {
  PERIODE = periode
}

exports.generarCertificat = (music) => {
  const dia = moment().format("DD MMMM YYYY")


  try {
    // create a document and pipe to a blob
    var doc = new PDFDocument();
    var stream = doc.pipe(fs.createWriteStream(`./server/docs/${music._id}.pdf`));


    doc.image('./server/assets/images/banda_uji.png', 60, 20, {fit: [50, 35]})

    doc.fillColor('#A2C037')
    doc.font('Helvetica').fontSize(10).text('Associació Cultural Banda UJI', 100, 29, {
      width: 100
    })

    doc.font('Helvetica')
    doc.fillColor('#000')
    doc.fontSize(12)
    doc.lineGap(4)
    doc.moveDown(4);
    const textPrincipal = 'Per la present l’Associació Cultural Banda UJI amb CIF XXXXXXXXXX, i en el seu nom, el representant legal, En XXXXXX ZZZZZZZ WWWWWWW: ' +
      `que en ${music.nom} ${music.cognoms} - amb DNI ${music.dni}, ha assistit tocant el/la ${music.instrument},` +
      `des de ${PERIODE} als diferents assajos de l’activitat denominada Banda UJI, la qual està reconeguda amb 1.5 crèdits.`


    doc.text(textPrincipal, 60)

    doc.moveDown(1);

    doc.text('Així mateix i perquè conste als efectes oportuns.')

    doc.moveDown(1);
    doc.text('Signa')

    let col1LeftPos = 60;
    let colTop = 280;
    let colWidth = 160;
    let col2LeftPos = colWidth + col1LeftPos + 110;

    doc.moveDown(14);
    doc.text(`A Castelló de la Plana en data de ${dia}`)

    // end and display the document in the iframe to the right
    doc.end();
  } catch (e) {
    console.log(e);
  }
}
