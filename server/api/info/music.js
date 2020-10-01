const express = require('express');
const { logging } = require('googleapis/build/src/apis/logging');
const router = express.Router();

const musicController = require('../controllers/musicController');
const mailer = require('../mailing')

router.put('/:id', async (req, res) => { // Changes to a music document done by an administrator
    const requester = await musicController.getMusicBySession(req.session.session_id);
    const music = await musicController.getMusicById(req.params.id);

    let result = null;

    if (!musicController.userHasPermision(requester, music)) {
        res.status(401).json({ message: 'No tens permís per a realitzar aquesta acció'})
    }

    switch (req.body.action) {
        case 'CHANGE_TYPE':
            result = musicController.changeType(music, req.body.code);
            break;
        case 'ACTIVATE_ACOUNT':
            result = musicController.changeAcountState(music, true);
            break;
        case 'DISABLE_ACOUNT':
            result = musicController.changeAcountState(music, false);
            break;
    }

    if(result == undefined) {
        res.status(400).json({ message: "Acció no defenida"})
    }
    else if(result instanceof Error) {
        res.status(500).json({ message: result.message })
    } else {
        res.status(201).json(result)
    }
})

router.get('/resendemail/:id', async (req, res) => { // Resend confirmation email to a user
    const requester = await musicController.getMusicBySession(req.session.session_id);

    if (!musicController.userHasPermision(requester)) {
        res.status(401).json({ message: 'No tens permís per a realitzar aquesta acció' })
    }

    const music = await musicController.getMusicById(req.params.id);
    const response = await mailer.enviarCorreuConfirmacio(music.email, music.secret_token)

    if(response) {
        res.status(200).json({ message: "S'ha reenviat el correu de confirmació"})
    }
})



router.put('/music/desactivar/:id', (req, res) => {
    const id = req.params.id

    if (!id) res.status(400).json({ message: 'falta el id' })

    Music.findOneAndUpdate(
        { '_id': id },
        { compte_actiu: false },
        { new: true }
    )
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })


})

router.put('/music/activar/:id', (req, res) => {
    const id = req.params.id

    if (!id) res.status(400).json({ message: 'falta el id' })

    Music.findOneAndUpdate(
        { '_id': id },
        { compte_actiu: true },
        { new: true }
    )
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })


})

router.put('/music/tipo', (req, res) => {

    if (req.body.tipusAnterior === 3 && req.body.tipus === 0) {
        Music.find({})
            .then(musics => {
                let numAdmins = 0
                musics.forEach(music => {
                    if (music.tipo_compte === 3)
                        numAdmins++
                });

                if (numAdmins === 1) {
                    res.status(300).json({
                        message: 'no pots realitzar aquesta acció'
                    })
                    return
                }

            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    console.log(req.body);

    Music.findOneAndUpdate(
        { '_id': req.body.id },
        { 'tipo_compte': req.body.tipus }
    )
        .then(res.status(200).send())
        .catch(err => {
            res.status(500).json(err)
        })
})

router.put('/music', async (req, res) => { // Creates a new musician
    const music = req.body

    if (music.llista_correu) {
        newsletter.afegirALaLlista(music.mailjet_id);
    } else {
        newsletter.llevarDeLaLlista(music.mailjet_id)
    }

    Music.findOneAndUpdate(
        { '_id': music._id },
        {
            nom: music.nom,
            cognoms: music.cognoms,
            dni: music.dni,
            al: music.al,
            email: music.email,
            telefon: music.telefon,
            corda: music.corda,
            data_naixement: music.data_naixement,
            sexe: music.sexe,
            pais: music.pais,
            llista_correu: music.llista_correu
        },
        { new: true }
    )
        .then(music => {
            res.status(201).json(music)
        })
        .catch(err => {
            res.status(500).json(err)
        })

})

router.get('/llistat', async (req, res) => {
    const list = await musicController.listAllMusicians();

    if(list) {
        res.status(200).json({ list })
    } else {
        res.status(500).json({ message: 'No funciona'})
    }
})

router.get('/musics/:ids', (req, res) => {
    let musicsIds = req.params.ids;

    musicsIds = musicsIds.split(',')
    musicsIds.map(id => { return mongoose.Types.ObjectId(id) })

    Music.find({
        '_id': { $in: musicsIds }
    })
        .then(musics => {
            res.status(200).json({ musics })
        })
        .catch(err => {
            console.log(err);
        })
})

router.delete('/music/:id', (req, res) => {
    const id = req.params.id

    if (!id) res.status(400).json({ message: 'falta el id' })

    Music.findById(id)
        .then(music => {
            newsletter.eliminarContacte(music.mailjet_id)
        })

    Music.deleteOne({ '_id': id })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })

})

module.exports = router;