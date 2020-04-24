const express = require('express');
const certificats = require('./certificats');

// const drive = require("../info/accions_drive");

const router = express.Router();

router.post('/certificats', (req, res) => {

    const musics = req.body.infoMusics;
    const periode = req.body.opcions.periode
    const cosCorreu = req.body.opcions.correu.cos

    certificats.setPeriode(periode)

    if(musics) {
      musics.forEach(music => {
        certificats.generarCertificat(music)
      });
    }


  // certificats.generarCertificat()

  res.status(200).json({message: 'ja esta bé'})

  // drive.guardarDocument()
})


module.exports = router;
